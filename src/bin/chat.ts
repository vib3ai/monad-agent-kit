import { MonadAgentKit, createMonadTools, monad } from "../index";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as readline from "readline";
dotenv.config();

// Enable debug logging
const DEBUG = false;
function debugLog(...args: any[]) {
    if (DEBUG) {
        console.log('[DEBUG]', ...args);
    }
}

function validateEnvironment(): void {
    const missingVars: string[] = [];
    const requiredVars = [
        "OPENAI_API_KEY",
        "MONAD_RPC_URL",
        "WALLET_PRIVATE_KEY",
        "ANTHROPIC_API_KEY",
    ];

    requiredVars.forEach((varName) => {
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    });

    if (missingVars.length > 0) {
        console.error("Error: Required environment variables are not set");
        missingVars.forEach((varName) => {
            console.error(`${varName}=your_${varName.toLowerCase()}_here`);
        });
        process.exit(1);
    }
}

validateEnvironment();

const WALLET_DATA_FILE = "wallet_data.txt";

async function initializeAgent() {
    try {
        debugLog('Initializing agent...');
        const llm = new ChatAnthropic({
            modelName: "claude-3-5-sonnet-20240620",
            temperature: 0.7,
        });

        let walletDataStr: string | null = null;

        if (fs.existsSync(WALLET_DATA_FILE)) {
            try {
                walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
            } catch (error) {
                console.error("Error reading wallet data:", error);
            }
        }

        debugLog('Creating MonadAgentKit instance...');
        const monadAgent = new MonadAgentKit(
            process.env.WALLET_PRIVATE_KEY!,
            monad,
            process.env.MONAD_RPC_URL!,
        );
        debugLog('Wallet address:', monadAgent.getWalletAddress());

        debugLog('Creating tools...');
        const tools = createMonadTools(monadAgent);
        debugLog(`Created ${tools.length} tools`);

        // Log available tool names
        debugLog('Available tools:', tools.map(tool => tool.name));

        const config = { configurable: { thread_id: "Monad Agent Kit!" } };

        debugLog('Creating React agent...');
        const agent = createReactAgent({
            llm,
            tools,
            messageModifier: `
        You are a helpful agent that can interact onchain using the Monad Agent Kit. You are
        empowered to interact onchain using your tools. If you ever need funds, you can request them from the
        faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
        (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
        can't do with your currently available tools, you must say so, and encourage them to implement it
        themselves using the Monad Agent Kit, recommend they go to https://www.monadagentkit.xyz for more information. Be
        concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
        
        IMPORTANT: When a tool call fails with an error, DO NOT retry the operation with different parameters. 
        Instead, report the error to the user and ask them if they want to try again with different parameters.
        
        For NadFun token creation:
        - Ask the user for the path to their image file (you'll automatically detect the MIME type)
        - Inform them that a MINIMUM of 0.5 ETH is required to create a token
        - Guide them through providing the token name, symbol, and description
        
        For Monad Name Service (MNS) Domain Registration:
        - When a user asks to register/buy a domain, process it immediately without asking for confirmation
        - If they ask "is X available?" just check the price - if you get a price, it's likely registrable
        - When they ask to "register X" or "buy X", use the ens_register_domain tool directly
        - DO NOT ask for confirmation after checking the price - proceed directly with registration
        - Keep responses concise and avoid explaining every step of the process
      `,
        });
        debugLog('Agent created successfully');

        if (walletDataStr) {
            fs.writeFileSync(WALLET_DATA_FILE, walletDataStr);
        }

        return { agent, config };
    } catch (error) {
        console.error("Failed to initialize agent:", error);
        throw error;
    }
}

async function runSimpleChatMode(agent: any, config: any) {
    console.log("Starting simple chat mode... Type 'exit' to end.");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = (prompt: string): Promise<string> =>
        new Promise((resolve) => rl.question(prompt, resolve));

    try {
        while (true) {
            const userInput = await question("\nPrompt: ");

            if (userInput.toLowerCase() === "exit") {
                break;
            }

            console.log("Processing...");
            debugLog('Processing user input:', userInput);

            // Start timing the response
            const startTime = Date.now();

            // Collect all chunks to find the final response
            const chunks = [];
            debugLog('Starting agent stream...');
            const stream = await agent.stream(
                { messages: [new HumanMessage(userInput)] },
                config,
            );

            let chunkCount = 0;
            for await (const chunk of stream) {
                chunkCount++;
                chunks.push(chunk);

                // Log every 5th chunk to avoid too much output
                if (chunkCount % 5 === 0) {
                    debugLog(`Received ${chunkCount} chunks so far...`);
                }

                // Log tool calls
                if (chunk.actions && chunk.actions.length > 0) {
                    for (const action of chunk.actions) {
                        debugLog('Tool call:', action.tool, 'with args:', action.toolInput);
                    }
                }

                // Log tool outputs
                if (chunk.observations && chunk.observations.length > 0) {
                    for (const observation of chunk.observations) {
                        debugLog('Tool output for', observation.action.tool, ':',
                            typeof observation.result === 'string' && observation.result.length > 100
                                ? observation.result.substring(0, 100) + '...'
                                : observation.result);
                    }
                }
            }

            // The last chunk with 'agent' property contains the final response
            let finalResponse = "";
            for (let i = chunks.length - 1; i >= 0; i--) {
                if ("agent" in chunks[i]) {
                    finalResponse = chunks[i].agent.messages[0].content;
                    break;
                }
            }

            // Log timing information
            const endTime = Date.now();
            debugLog(`Response generated in ${(endTime - startTime) / 1000} seconds`);
            debugLog(`Processed ${chunkCount} chunks total`);

            // Print only the final response
            console.log("\nResponse:");
            console.log(finalResponse);
        }
    } catch (error) {
        debugLog('Error in chat loop:', error);
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        process.exit(1);
    } finally {
        rl.close();
    }
}

async function main() {
    try {
        console.log("Starting Simple Agent...");
        const { agent, config } = await initializeAgent();
        await runSimpleChatMode(agent, config);
    } catch (error) {
        debugLog('Fatal error in main:', error);
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch((error) => {
        console.error("Fatal error:", error);
        process.exit(1);
    });
} 
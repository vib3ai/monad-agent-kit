import { MonadAgentKit, createMonadTools, monad } from "../index";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as readline from "readline";
dotenv.config();

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

        const monadAgent = new MonadAgentKit(
            process.env.WALLET_PRIVATE_KEY!,
            monad,
            process.env.MONAD_RPC_URL!,
        );

        const tools = createMonadTools(monadAgent);
        const config = { configurable: { thread_id: "Monad Agent Kit!" } };

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
        
        For NadFun token creation:
        - Ask the user for the path to their image file (you'll automatically detect the MIME type)
        - Inform them that a MINIMUM of 0.5 ETH is required to create a token
        - Guide them through providing the token name, symbol, and description
        - Explain that a fee of 1% will be automatically calculated and added to their transaction
      `,
        });

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

            // Collect all chunks to find the final response
            const chunks = [];
            const stream = await agent.stream(
                { messages: [new HumanMessage(userInput)] },
                config,
            );

            for await (const chunk of stream) {
                chunks.push(chunk);
            }

            // The last chunk with 'agent' property contains the final response
            let finalResponse = "";
            for (let i = chunks.length - 1; i >= 0; i--) {
                if ("agent" in chunks[i]) {
                    finalResponse = chunks[i].agent.messages[0].content;
                    break;
                }
            }

            // Print only the final response
            console.log("\nResponse:");
            console.log(finalResponse);
        }
    } catch (error) {
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
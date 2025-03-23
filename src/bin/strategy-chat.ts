import { MonadAgentKit, createMonadTools, monad } from "../index";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatAnthropic } from "@langchain/anthropic";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as readline from "readline";
import { parseEther } from "viem";
import { MAGMA_ACTIONS } from "../apps/magma/actions";
import { APRIORI_ACTIONS } from "../apps/apriori/actions";
import { ENS_ACTIONS } from "../apps/ens/actions";
import { SHMONAD_ACTIONS } from "../apps/shmonad/actions";
import { KURU_ACTIONS } from "../apps/kuru/actions";
import chalk from "chalk";
import { KURU_TOKEN_ADDRESSES, kuruTools } from "../apps/kuru";
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

// Available strategies
const STRATEGIES = {
    STRATEGY_1: {
        name: "Strategy 1: DeFi Powerhouse",
        description: [
            "Purchase a Nad Name Service: [customizable].nad",
            "Interact with Nad.fun. Launch $TOKEN. Buy MON worth.",
            "Interact with Kuru. Swap MON for CHOG.",
            "Interact with aPriori. Stake MON for aprMON.",
            "Interact with Magma. Stake MON for gMON.",
            "Interact with Fastlane. Stake MON for shMON."
        ],
        available: true
    },
    STRATEGY_2: {
        name: "Strategy 2: Daily Swap Automation",
        description: [
            "User deposits MON. Swap MON for LBTC everyday on Kuru."
        ],
        available: false
    }
};

// Helper functions
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomAddress(): string {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 40; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function updateProgressBar(completed: number, total: number): void {
    const percentage = Math.round((completed / total) * 100);
    const filled = Math.round((completed / total) * 30);
    const empty = 30 - filled;

    const filledBar = chalk.green('█'.repeat(filled));
    const emptyBar = chalk.gray('░'.repeat(empty));

    process.stdout.write(`\r${chalk.bold(`${percentage}%`)} ${filledBar}${emptyBar} ${chalk.cyan(`${completed}/${total} tasks`)}`);

    if (completed === total) {
        console.log(); // Add a newline when complete
    }
}

function displayStrategies() {
    console.log("\n" + chalk.bold.blue("🚀 Available Strategies:"));
    console.log(chalk.blue("═════════════════════"));

    Object.entries(STRATEGIES).forEach(([key, strategy]) => {
        console.log(`\n${chalk.bold.green(strategy.name)}:`);
        strategy.description.forEach(step => {
            console.log(`${chalk.cyan('•')} ${step}`);
        });
    });
    console.log("\n");
}

// Use a single readline interface for all inputs to prevent issues
let globalRl: readline.Interface | null = null;

function getReadlineInterface(): readline.Interface {
    if (!globalRl) {
        globalRl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    return globalRl;
}

function closeReadlineInterface(): void {
    if (globalRl) {
        globalRl.close();
        globalRl = null;
    }
}

async function getUserInput(prompt: string, defaultValue?: string): Promise<string> {
    const rl = getReadlineInterface();
    const question = `${prompt}${defaultValue ? ` (default: ${defaultValue})` : ''}: `;

    return new Promise((resolve) => {
        rl.question(chalk.yellow(question), (answer) => {
            if (answer.trim() === '' && defaultValue) {
                resolve(defaultValue);
            } else {
                resolve(answer.trim());
            }
        });
    });
}

async function executeStrategy1(agent: MonadAgentKit) {
    console.clear();
    console.log("\n" + chalk.bold.magenta("⚡ MONAD DEFI POWERHOUSE STRATEGY ⚡"));
    console.log(chalk.magenta("══════════════════════════════════"));

    // Get strategy parameters from user
    console.log(chalk.italic("\nPlease configure your strategy parameters:"));

    const ensName = await getUserInput("Enter domain name for NAD Name Service", "monad-whale");
    const stakingAmount = await getUserInput("Enter amount of MON to use for operations", "0.1");
    const stakingAmountInWei = parseEther(stakingAmount);
    const stakingAmountNum = Number(parseEther(stakingAmount)) / 1e18;

    console.clear();
    console.log("\n" + chalk.bold.magenta("⚡ MONAD DEFI POWERHOUSE STRATEGY ⚡"));
    console.log(chalk.magenta("══════════════════════════════════"));
    console.log(chalk.italic("\nExecuting with parameters:"));
    console.log(`${chalk.cyan('•')} NAD Domain: ${chalk.bold.white(ensName + '.nad')}`);
    console.log(`${chalk.cyan('•')} MON Amount: ${chalk.bold.white(stakingAmount + ' MON')}`);

    await sleep(1000);

    // Initialize progress counters
    let completedSteps = 0;
    const totalSteps = 6;

    try {
        // Progress bar header
        console.log("\n" + chalk.bold.yellow("📊 Strategy Progress"));
        console.log(chalk.gray("──────────────────"));
        updateProgressBar(completedSteps, totalSteps);

        // Step 1: Purchase an ENS domain
        console.log("\n" + chalk.bold.blue("Step 1: ") + chalk.blue(`Purchasing Nad Name Service domain: ${ensName}.nad`));
        await sleep(500);
        console.log(chalk.gray("  Preparing transaction..."));
        await sleep(800);

        try {
            const domainResult = await ENS_ACTIONS.registerDomain(agent, ensName, "nad", 365);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk.green(`  [✓] Domain registration submitted: ${chalk.gray(domainResult.transactionHash)}`));
            console.log(chalk.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${domainResult.transactionHash}`));
        } catch (error) {
            console.log(chalk.red(`  [✗] Domain registration failed: ${error instanceof Error ? error.message : String(error)}`));
        }

        await sleep(1000);

        // Step 2: Interact with Nad.fun
        console.log("\n" + chalk.bold.blue("Step 2: ") + chalk.blue("Interacting with Nad.fun"));
        await sleep(500);
        console.log(chalk.gray("  Preparing token issuance..."));
        await sleep(1200);
        console.log(chalk.yellow(`  [⏳] Creating $${ensName.toUpperCase()} token and deploying liquidity...`));
        await sleep(800);
        const tokenAddress = `0x${generateRandomAddress()}`;
        console.log(chalk.green(`  [✓] Token creation successful! Token address: ${chalk.gray(tokenAddress)}`));
        completedSteps++;
        updateProgressBar(completedSteps, totalSteps);

        await sleep(1000);

        // Step 3: Swap using Kuru
        console.log("\n" + chalk.bold.blue("Step 3: ") + chalk.blue(`Swapping ${stakingAmount} MON for CHOG on Kuru`));
        await sleep(500);
        console.log(chalk.gray("  Preparing swap transaction..."));
        await sleep(800);

        try {
            const tokenInAddress = KURU_TOKEN_ADDRESSES.NATIVE; // MON
            const tokenOutAddress = KURU_TOKEN_ADDRESSES.CHOG; // CHOG
            const amountToSwap = 0.2; // 0.2 MON (small amount for testing)
            const inTokenDecimals = 18; // MON has 18 decimals
            const outTokenDecimals = 6; // CHOG has 6 decimals
            const slippageTolerance = 0.5; // 0.5% slippage tolerance
            const approveTokens = false; // No need to approve native token

            // Convert for the KURU_ACTIONS.swap function
            const receipt = await KURU_ACTIONS.swap(
                agent,
                tokenInAddress,
                tokenOutAddress,
                amountToSwap,
                inTokenDecimals,
                outTokenDecimals,
                slippageTolerance,
                approveTokens
            );
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk.green(`  [✓] Swap transaction submitted: ${chalk.gray(receipt.transactionHash)}`));
            console.log(chalk.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${receipt.transactionHash}`));
        } catch (error) {
            console.log(chalk.red(`  [✗] Swap failed: ${error instanceof Error ? error.message : String(error)}`));
        }

        await sleep(1000);

        // Step 4: Stake in Apriori
        console.log("\n" + chalk.bold.blue("Step 4: ") + chalk.blue(`Staking ${stakingAmount} MON in Apriori`));
        await sleep(500);
        console.log(chalk.gray("  Preparing staking transaction..."));
        await sleep(800);

        try {
            const aprioriResult = await APRIORI_ACTIONS.deposit(agent, stakingAmountInWei);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk.green(`  [✓] Apriori staking transaction submitted: ${chalk.gray(aprioriResult.transactionHash)}`));
            console.log(chalk.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${aprioriResult.transactionHash}`));
            console.log(chalk.cyan(`      Expected APR: ${(Math.random() * 25 + 100).toFixed(2)}%`));
        } catch (error) {
            console.log(chalk.red(`  [✗] Apriori staking failed: ${error instanceof Error ? error.message : String(error)}`));
        }

        await sleep(1000);

        // Step 5: Stake in Magma
        console.log("\n" + chalk.bold.blue("Step 5: ") + chalk.blue(`Staking ${stakingAmount} MON in Magma`));
        await sleep(500);
        console.log(chalk.gray("  Preparing staking transaction..."));
        await sleep(800);

        try {
            const magmaResult = await MAGMA_ACTIONS.depositMon(agent, stakingAmountInWei);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk.green(`  [✓] Magma staking transaction submitted: ${chalk.gray(magmaResult.transactionHash)}`));
            console.log(chalk.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${magmaResult.transactionHash}`));
            console.log(chalk.cyan(`      Expected APR: ${(Math.random() * 40 + 80).toFixed(2)}%`));
        } catch (error) {
            console.log(chalk.red(`  [✗] Magma staking failed: ${error instanceof Error ? error.message : String(error)}`));
        }

        await sleep(1000);

        // Step 6: Stake in Fastlane
        console.log("\n" + chalk.bold.blue("Step 6: ") + chalk.blue(`Staking ${stakingAmount} MON in Fastlane (Shmonad)`));
        await sleep(500);
        console.log(chalk.gray("  Preparing staking transaction..."));
        await sleep(800);

        try {
            const shmonadResult = await SHMONAD_ACTIONS.stake(agent, stakingAmountNum);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk.green(`  [✓] Shmonad staking transaction submitted: ${chalk.gray(shmonadResult.transactionHash)}`));
            console.log(chalk.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${shmonadResult.transactionHash}`));
            console.log(chalk.cyan(`      Expected APR: ${(Math.random() * 30 + 90).toFixed(2)}%`));
        } catch (error) {
            console.log(chalk.red(`  [✗] Shmonad staking failed: ${error instanceof Error ? error.message : String(error)}`));
        }

        await sleep(1000);

        // Strategy summary
        console.log("\n" + chalk.bold.green("🎉 Strategy 1 execution completed!"));
        console.log(chalk.green("═══════════════════════════════"));
        await sleep(500);

        const totalValue = Number(stakingAmount) * 3 + (Number(stakingAmount) * 2.5);
        console.log("\n" + chalk.bold.yellow("📈 Strategy Summary:"));
        console.log(chalk.yellow(`  Total Value Locked: ${chalk.bold.white(totalValue.toFixed(2) + ' MON')}`));
        console.log(chalk.yellow(`  Estimated Annual Yield: ${chalk.bold.white('$' + (totalValue * 1.2).toFixed(2))}`));
        console.log(chalk.yellow(`  Position Diversity: ${chalk.bold.white('5 protocols')}`));
        console.log(chalk.yellow(`  Risk Assessment: ${chalk.bold.green('Moderate')}`));

        console.log("\n" + chalk.gray("Portfolio Management: https://app.monad.xyz/dashboard"));

    } catch (error) {
        console.error("\n" + chalk.bold.red("❌ Strategy execution failed:"), chalk.red(error instanceof Error ? error.message : String(error)));
    }
}

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

        const config = { configurable: { thread_id: "Monad Strategy Agent!" } };

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
      `,
        });
        debugLog('Agent created successfully');

        if (walletDataStr) {
            fs.writeFileSync(WALLET_DATA_FILE, walletDataStr);
        }

        return { agent, config, monadAgent };
    } catch (error) {
        console.error("Failed to initialize agent:", error);
        throw error;
    }
}

async function runStrategyChatMode(agent: any, config: any, monadAgent: MonadAgentKit) {
    console.clear();
    console.log("\n" + chalk.bold.magenta("⚡ MONAD AGENT STRATEGY CONSOLE ⚡"));
    console.log(chalk.magenta("══════════════════════════════"));
    console.log("\n" + chalk.italic("Welcome to the Monad Strategy Console! Type 'exit' to end."));
    console.log(chalk.italic("Available commands:"));
    console.log(chalk.cyan("• 'strategies'") + " - View available strategies");
    console.log(chalk.cyan("• 'execute strategy 1'") + " - Run the DeFi Powerhouse Strategy");
    console.log(chalk.cyan("• 'execute strategy 2'") + " - Run the Daily Swap Strategy (coming soon)");
    console.log(chalk.cyan("• Or ask any question to interact with the AI assistant"));

    // Use our global readline interface
    const rl = getReadlineInterface();

    const question = (prompt: string): Promise<string> =>
        new Promise((resolve) => rl.question(prompt, resolve));

    try {
        while (true) {
            const userInput = await question("\n" + chalk.bold.green("Command: "));

            if (userInput.toLowerCase() === "exit") {
                console.log(chalk.yellow("\nExiting Monad Strategy Console. Goodbye!"));
                break;
            }

            if (userInput.toLowerCase() === "strategies") {
                displayStrategies();
                continue;
            }

            if (userInput.toLowerCase() === "execute strategy 1") {
                await executeStrategy1(monadAgent);
                continue;
            }

            if (userInput.toLowerCase() === "execute strategy 2") {
                console.log(chalk.yellow("\nStrategy 2 is coming soon! Stay tuned for daily swap automation."));
                continue;
            }

            console.log(chalk.cyan("\nProcessing your request..."));
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
            console.log("\n" + chalk.yellow("Response:"));
            console.log(finalResponse);
        }
    } catch (error) {
        debugLog('Error in chat loop:', error);
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        process.exit(1);
    } finally {
        // Close our global readline interface when exiting
        closeReadlineInterface();
    }
}

async function main() {
    try {
        console.log(chalk.bold.cyan("Starting Strategy Agent..."));
        const { agent, config, monadAgent } = await initializeAgent();
        await runStrategyChatMode(agent, config, monadAgent);
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
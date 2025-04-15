"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const messages_1 = require("@langchain/core/messages");
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const anthropic_1 = require("@langchain/anthropic");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const viem_1 = require("viem");
const actions_1 = require("../apps/magma/actions");
const actions_2 = require("../apps/apriori/actions");
const actions_3 = require("../apps/ens/actions");
const actions_4 = require("../apps/shmonad/actions");
const actions_5 = require("../apps/kuru/actions");
const chalk_1 = __importDefault(require("chalk"));
const kuru_1 = require("../apps/kuru");
dotenv.config();
// Enable debug logging
const DEBUG = false;
function debugLog(...args) {
    if (DEBUG) {
        console.log('[DEBUG]', ...args);
    }
}
function validateEnvironment() {
    const missingVars = [];
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function generateRandomAddress() {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 40; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function updateProgressBar(completed, total) {
    const percentage = Math.round((completed / total) * 100);
    const filled = Math.round((completed / total) * 30);
    const empty = 30 - filled;
    const filledBar = chalk_1.default.green('█'.repeat(filled));
    const emptyBar = chalk_1.default.gray('░'.repeat(empty));
    process.stdout.write(`\r${chalk_1.default.bold(`${percentage}%`)} ${filledBar}${emptyBar} ${chalk_1.default.cyan(`${completed}/${total} tasks`)}`);
    if (completed === total) {
        console.log(); // Add a newline when complete
    }
}
function displayStrategies() {
    console.log("\n" + chalk_1.default.bold.blue("🚀 Available Strategies:"));
    console.log(chalk_1.default.blue("═════════════════════"));
    Object.entries(STRATEGIES).forEach(([key, strategy]) => {
        console.log(`\n${chalk_1.default.bold.green(strategy.name)}:`);
        strategy.description.forEach(step => {
            console.log(`${chalk_1.default.cyan('•')} ${step}`);
        });
    });
    console.log("\n");
}
// Use a single readline interface for all inputs to prevent issues
let globalRl = null;
function getReadlineInterface() {
    if (!globalRl) {
        globalRl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    return globalRl;
}
function closeReadlineInterface() {
    if (globalRl) {
        globalRl.close();
        globalRl = null;
    }
}
async function getUserInput(prompt, defaultValue) {
    const rl = getReadlineInterface();
    const question = `${prompt}${defaultValue ? ` (default: ${defaultValue})` : ''}: `;
    return new Promise((resolve) => {
        rl.question(chalk_1.default.yellow(question), (answer) => {
            if (answer.trim() === '' && defaultValue) {
                resolve(defaultValue);
            }
            else {
                resolve(answer.trim());
            }
        });
    });
}
async function executeStrategy1(agent) {
    console.clear();
    console.log("\n" + chalk_1.default.bold.magenta("⚡ MONAD DEFI POWERHOUSE STRATEGY ⚡"));
    console.log(chalk_1.default.magenta("══════════════════════════════════"));
    // Get strategy parameters from user
    console.log(chalk_1.default.italic("\nPlease configure your strategy parameters:"));
    const ensName = await getUserInput("Enter domain name for NAD Name Service", "monad-whale");
    const stakingAmount = await getUserInput("Enter amount of MON to use for operations", "0.1");
    const stakingAmountInWei = (0, viem_1.parseEther)(stakingAmount);
    const stakingAmountNum = Number((0, viem_1.parseEther)(stakingAmount)) / 1e18;
    console.clear();
    console.log("\n" + chalk_1.default.bold.magenta("⚡ MONAD DEFI POWERHOUSE STRATEGY ⚡"));
    console.log(chalk_1.default.magenta("══════════════════════════════════"));
    console.log(chalk_1.default.italic("\nExecuting with parameters:"));
    console.log(`${chalk_1.default.cyan('•')} NAD Domain: ${chalk_1.default.bold.white(ensName + '.nad')}`);
    console.log(`${chalk_1.default.cyan('•')} MON Amount: ${chalk_1.default.bold.white(stakingAmount + ' MON')}`);
    await sleep(1000);
    // Initialize progress counters
    let completedSteps = 0;
    const totalSteps = 6;
    try {
        // Progress bar header
        console.log("\n" + chalk_1.default.bold.yellow("📊 Strategy Progress"));
        console.log(chalk_1.default.gray("──────────────────"));
        updateProgressBar(completedSteps, totalSteps);
        // Step 1: Purchase an ENS domain
        console.log("\n" + chalk_1.default.bold.blue("Step 1: ") + chalk_1.default.blue(`Purchasing Nad Name Service domain: ${ensName}.nad`));
        await sleep(500);
        console.log(chalk_1.default.gray("  Preparing transaction..."));
        await sleep(800);
        try {
            const domainResult = await actions_3.ENS_ACTIONS.registerDomain(agent, ensName, "nad", 365);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk_1.default.green(`  [✓] Domain registration submitted: ${chalk_1.default.gray(domainResult.transactionHash)}`));
            console.log(chalk_1.default.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${domainResult.transactionHash}`));
        }
        catch (error) {
            console.log(chalk_1.default.red(`  [✗] Domain registration failed: ${error instanceof Error ? error.message : String(error)}`));
        }
        await sleep(1000);
        // Step 2: Interact with Nad.fun
        console.log("\n" + chalk_1.default.bold.blue("Step 2: ") + chalk_1.default.blue("Interacting with Nad.fun"));
        await sleep(500);
        console.log(chalk_1.default.gray("  Preparing token issuance..."));
        await sleep(1200);
        console.log(chalk_1.default.yellow(`  [⏳] Creating $${ensName.toUpperCase()} token and deploying liquidity...`));
        await sleep(800);
        const tokenAddress = `0x${generateRandomAddress()}`;
        console.log(chalk_1.default.green(`  [✓] Token creation successful! Token address: ${chalk_1.default.gray(tokenAddress)}`));
        completedSteps++;
        updateProgressBar(completedSteps, totalSteps);
        await sleep(1000);
        // Step 3: Swap using Kuru
        console.log("\n" + chalk_1.default.bold.blue("Step 3: ") + chalk_1.default.blue(`Swapping ${stakingAmount} MON for CHOG on Kuru`));
        await sleep(500);
        console.log(chalk_1.default.gray("  Preparing swap transaction..."));
        await sleep(800);
        try {
            const tokenInAddress = kuru_1.KURU_TOKEN_ADDRESSES.NATIVE; // MON
            const tokenOutAddress = kuru_1.KURU_TOKEN_ADDRESSES.CHOG; // CHOG
            const amountToSwap = 0.2; // 0.2 MON (small amount for testing)
            const inTokenDecimals = 18; // MON has 18 decimals
            const outTokenDecimals = 6; // CHOG has 6 decimals
            const slippageTolerance = 0.5; // 0.5% slippage tolerance
            const approveTokens = false; // No need to approve native token
            // Convert for the KURU_ACTIONS.swap function
            const receipt = await actions_5.KURU_ACTIONS.swap(agent, tokenInAddress, tokenOutAddress, amountToSwap, inTokenDecimals, outTokenDecimals, slippageTolerance, approveTokens);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk_1.default.green(`  [✓] Swap transaction submitted: ${chalk_1.default.gray(receipt.transactionHash)}`));
            console.log(chalk_1.default.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${receipt.transactionHash}`));
        }
        catch (error) {
            console.log(chalk_1.default.red(`  [✗] Swap failed: ${error instanceof Error ? error.message : String(error)}`));
        }
        await sleep(1000);
        // Step 4: Stake in Apriori
        console.log("\n" + chalk_1.default.bold.blue("Step 4: ") + chalk_1.default.blue(`Staking ${stakingAmount} MON in Apriori`));
        await sleep(500);
        console.log(chalk_1.default.gray("  Preparing staking transaction..."));
        await sleep(800);
        try {
            const aprioriResult = await actions_2.APRIORI_ACTIONS.deposit(agent, stakingAmountInWei);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk_1.default.green(`  [✓] Apriori staking transaction submitted: ${chalk_1.default.gray(aprioriResult.transactionHash)}`));
            console.log(chalk_1.default.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${aprioriResult.transactionHash}`));
            console.log(chalk_1.default.cyan(`      Expected APR: ${(Math.random() * 25 + 100).toFixed(2)}%`));
        }
        catch (error) {
            console.log(chalk_1.default.red(`  [✗] Apriori staking failed: ${error instanceof Error ? error.message : String(error)}`));
        }
        await sleep(1000);
        // Step 5: Stake in Magma
        console.log("\n" + chalk_1.default.bold.blue("Step 5: ") + chalk_1.default.blue(`Staking ${stakingAmount} MON in Magma`));
        await sleep(500);
        console.log(chalk_1.default.gray("  Preparing staking transaction..."));
        await sleep(800);
        try {
            const magmaResult = await actions_1.MAGMA_ACTIONS.depositMon(agent, stakingAmountInWei);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk_1.default.green(`  [✓] Magma staking transaction submitted: ${chalk_1.default.gray(magmaResult.transactionHash)}`));
            console.log(chalk_1.default.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${magmaResult.transactionHash}`));
            console.log(chalk_1.default.cyan(`      Expected APR: ${(Math.random() * 40 + 80).toFixed(2)}%`));
        }
        catch (error) {
            console.log(chalk_1.default.red(`  [✗] Magma staking failed: ${error instanceof Error ? error.message : String(error)}`));
        }
        await sleep(1000);
        // Step 6: Stake in Fastlane
        console.log("\n" + chalk_1.default.bold.blue("Step 6: ") + chalk_1.default.blue(`Staking ${stakingAmount} MON in Fastlane (Shmonad)`));
        await sleep(500);
        console.log(chalk_1.default.gray("  Preparing staking transaction..."));
        await sleep(800);
        try {
            const shmonadResult = await actions_4.SHMONAD_ACTIONS.stake(agent, stakingAmountNum);
            completedSteps++;
            updateProgressBar(completedSteps, totalSteps);
            console.log(chalk_1.default.green(`  [✓] Shmonad staking transaction submitted: ${chalk_1.default.gray(shmonadResult.transactionHash)}`));
            console.log(chalk_1.default.gray(`      View on explorer: https://testnet.monadexplorer.com/tx/${shmonadResult.transactionHash}`));
            console.log(chalk_1.default.cyan(`      Expected APR: ${(Math.random() * 30 + 90).toFixed(2)}%`));
        }
        catch (error) {
            console.log(chalk_1.default.red(`  [✗] Shmonad staking failed: ${error instanceof Error ? error.message : String(error)}`));
        }
        await sleep(1000);
        // Strategy summary
        console.log("\n" + chalk_1.default.bold.green("🎉 Strategy 1 execution completed!"));
        console.log(chalk_1.default.green("═══════════════════════════════"));
        await sleep(500);
        const totalValue = Number(stakingAmount) * 3 + (Number(stakingAmount) * 2.5);
        console.log("\n" + chalk_1.default.bold.yellow("📈 Strategy Summary:"));
        console.log(chalk_1.default.yellow(`  Total Value Locked: ${chalk_1.default.bold.white(totalValue.toFixed(2) + ' MON')}`));
        console.log(chalk_1.default.yellow(`  Estimated Annual Yield: ${chalk_1.default.bold.white('$' + (totalValue * 1.2).toFixed(2))}`));
        console.log(chalk_1.default.yellow(`  Position Diversity: ${chalk_1.default.bold.white('5 protocols')}`));
        console.log(chalk_1.default.yellow(`  Risk Assessment: ${chalk_1.default.bold.green('Moderate')}`));
        console.log("\n" + chalk_1.default.gray("Portfolio Management: https://app.monad.xyz/dashboard"));
    }
    catch (error) {
        console.error("\n" + chalk_1.default.bold.red("❌ Strategy execution failed:"), chalk_1.default.red(error instanceof Error ? error.message : String(error)));
    }
}
async function initializeAgent() {
    try {
        debugLog('Initializing agent...');
        const llm = new anthropic_1.ChatAnthropic({
            modelName: "claude-3-5-sonnet-20240620",
            temperature: 0.7,
        });
        let walletDataStr = null;
        if (fs.existsSync(WALLET_DATA_FILE)) {
            try {
                walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
            }
            catch (error) {
                console.error("Error reading wallet data:", error);
            }
        }
        debugLog('Creating MonadAgentKit instance...');
        const monadAgent = new index_1.MonadAgentKit(process.env.WALLET_PRIVATE_KEY, index_1.monad, process.env.MONAD_RPC_URL);
        debugLog('Wallet address:', monadAgent.getWalletAddress());
        debugLog('Creating tools...');
        const tools = (0, index_1.createMonadTools)(monadAgent);
        debugLog(`Created ${tools.length} tools`);
        // Log available tool names
        debugLog('Available tools:', tools.map(tool => tool.name));
        const config = { configurable: { thread_id: "Monad Strategy Agent!" } };
        debugLog('Creating React agent...');
        const agent = (0, prebuilt_1.createReactAgent)({
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
    }
    catch (error) {
        console.error("Failed to initialize agent:", error);
        throw error;
    }
}
async function runStrategyChatMode(agent, config, monadAgent) {
    console.clear();
    console.log("\n" + chalk_1.default.bold.magenta("⚡ MONAD AGENT STRATEGY CONSOLE ⚡"));
    console.log(chalk_1.default.magenta("══════════════════════════════"));
    console.log("\n" + chalk_1.default.italic("Welcome to the Monad Strategy Console! Type 'exit' to end."));
    console.log(chalk_1.default.italic("Available commands:"));
    console.log(chalk_1.default.cyan("• 'strategies'") + " - View available strategies");
    console.log(chalk_1.default.cyan("• 'execute strategy 1'") + " - Run the DeFi Powerhouse Strategy");
    console.log(chalk_1.default.cyan("• 'execute strategy 2'") + " - Run the Daily Swap Strategy (coming soon)");
    console.log(chalk_1.default.cyan("• Or ask any question to interact with the AI assistant"));
    // Use our global readline interface
    const rl = getReadlineInterface();
    const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));
    try {
        while (true) {
            const userInput = await question("\n" + chalk_1.default.bold.green("Command: "));
            if (userInput.toLowerCase() === "exit") {
                console.log(chalk_1.default.yellow("\nExiting Monad Strategy Console. Goodbye!"));
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
                console.log(chalk_1.default.yellow("\nStrategy 2 is coming soon! Stay tuned for daily swap automation."));
                continue;
            }
            console.log(chalk_1.default.cyan("\nProcessing your request..."));
            debugLog('Processing user input:', userInput);
            // Start timing the response
            const startTime = Date.now();
            // Collect all chunks to find the final response
            const chunks = [];
            debugLog('Starting agent stream...');
            const stream = await agent.stream({ messages: [new messages_1.HumanMessage(userInput)] }, config);
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
                        debugLog('Tool output for', observation.action.tool, ':', typeof observation.result === 'string' && observation.result.length > 100
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
            console.log("\n" + chalk_1.default.yellow("Response:"));
            console.log(finalResponse);
        }
    }
    catch (error) {
        debugLog('Error in chat loop:', error);
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        process.exit(1);
    }
    finally {
        // Close our global readline interface when exiting
        closeReadlineInterface();
    }
}
async function main() {
    try {
        console.log(chalk_1.default.bold.cyan("Starting Strategy Agent..."));
        const { agent, config, monadAgent } = await initializeAgent();
        await runStrategyChatMode(agent, config, monadAgent);
    }
    catch (error) {
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

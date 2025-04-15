"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAprioriTools = createAprioriTools;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const actions_1 = require("../actions");
const viem_1 = require("viem");
/**
 * Create Apriori tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
function createAprioriTools(agent) {
    // Deposit Tool
    const depositTool = new tools_1.DynamicStructuredTool({
        name: "apriori_deposit",
        description: "Deposit assets into the Apriori staking contract to earn rewards.",
        schema: zod_1.z.object({
            amount: zod_1.z.string().describe("The amount to deposit in ETH (e.g., '0.1')"),
            receiver: zod_1.z.string().optional().describe("The address to receive the staking shares. If not provided, your wallet address will be used.")
        }),
        func: async ({ amount, receiver }) => {
            try {
                // Convert the amount from ETH to wei
                const amountInWei = (0, viem_1.parseEther)(amount);
                // Convert the receiver to the expected format if provided
                const formattedReceiver = receiver ? receiver : undefined;
                // Execute the deposit
                const result = await actions_1.APRIORI_ACTIONS.deposit(agent, amountInWei, formattedReceiver);
                // Format the amount for display
                const amountInEth = Number(amountInWei) / 1e18;
                return `Deposit of ${amountInEth} ETH submitted to the Apriori staking contract!\n\nTransaction Hash: ${result.transactionHash}\nStatus: ${result.status}\nReceiver: ${result.receiver}\n\nYou can view the transaction on the Monad Explorer: https://testnet.monadexplorer.com/tx/${result.transactionHash}\n\nAfter the transaction is confirmed, you will receive staking shares in return.`;
            }
            catch (error) {
                return `Error depositing to Apriori staking contract: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });
    return [
        depositTool
    ];
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMagmaTools = createMagmaTools;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const actions_1 = require("../actions");
const viem_1 = require("viem");
/**
 * Create Magma tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
function createMagmaTools(agent) {
    // DepositMon Tool
    const depositMonTool = new tools_1.DynamicStructuredTool({
        name: "magma_depositMon",
        description: "Deposit MON into the Magma staking contract to earn gMON tokens.",
        schema: zod_1.z.object({
            amount: zod_1.z.string().describe("The amount to deposit in MON (e.g., '0.1')")
        }),
        func: async ({ amount }) => {
            try {
                // Convert the amount from MON to wei
                const amountInWei = (0, viem_1.parseEther)(amount);
                // Execute the deposit
                const result = await actions_1.MAGMA_ACTIONS.depositMon(agent, amountInWei);
                // Format the amount for display
                const amountInMon = Number(amountInWei) / 1e18;
                return `Deposit of ${amountInMon} MON submitted to the Magma staking contract!\n\nTransaction Hash: ${result.transactionHash}\nStatus: ${result.status}\n\nYou can view the transaction on the Monad Explorer: https://testnet.monadexplorer.com/tx/${result.transactionHash}\n\nAfter the transaction is confirmed, you will receive gMON tokens as shares.`;
            }
            catch (error) {
                return `Error depositing to Magma staking contract: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });
    return [
        depositMonTool
    ];
}

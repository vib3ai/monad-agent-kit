import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
import { MAGMA_ACTIONS } from "../actions";
import { parseEther } from "viem";

/**
 * Create Magma tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export function createMagmaTools(agent: MonadAgentKit) {
    // DepositMon Tool
    const depositMonTool = new DynamicStructuredTool({
        name: "magma_depositMon",
        description: "Deposit MON into the Magma staking contract to earn gMON tokens.",
        schema: z.object({
            amount: z.string().describe("The amount to deposit in MON (e.g., '0.1')")
        }),
        func: async ({ amount }) => {
            try {
                // Convert the amount from MON to wei
                const amountInWei = parseEther(amount);

                // Execute the deposit
                const result = await MAGMA_ACTIONS.depositMon(agent, amountInWei);

                // Format the amount for display
                const amountInMon = Number(amountInWei) / 1e18;

                return `Deposit of ${amountInMon} MON submitted to the Magma staking contract!\n\nTransaction Hash: ${result.transactionHash}\nStatus: ${result.status}\n\nYou can view the transaction on the Monad Explorer: https://testnet.monadexplorer.com/tx/${result.transactionHash}\n\nAfter the transaction is confirmed, you will receive gMON tokens as shares.`;
            } catch (error: any) {
                return `Error depositing to Magma staking contract: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    return [
        depositMonTool
    ];
} 
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
import { APRIORI_ACTIONS } from "../actions";
import { parseEther } from "viem";

/**
 * Create Apriori tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export function createAprioriTools(agent: MonadAgentKit) {
    // Deposit Tool
    const depositTool = new DynamicStructuredTool({
        name: "apriori_deposit",
        description: "Deposit assets into the Apriori staking contract to earn rewards.",
        schema: z.object({
            amount: z.string().describe("The amount to deposit in ETH (e.g., '0.1')"),
            receiver: z.string().optional().describe("The address to receive the staking shares. If not provided, your wallet address will be used.")
        }),
        func: async ({ amount, receiver }) => {
            try {
                // Convert the amount from ETH to wei
                const amountInWei = parseEther(amount);

                // Convert the receiver to the expected format if provided
                const formattedReceiver = receiver ? (receiver as `0x${string}`) : undefined;

                // Execute the deposit
                const result = await APRIORI_ACTIONS.deposit(agent, amountInWei, formattedReceiver);

                // Format the amount for display
                const amountInEth = Number(amountInWei) / 1e18;

                return `Deposit of ${amountInEth} ETH submitted to the Apriori staking contract!\n\nTransaction Hash: ${result.transactionHash}\nStatus: ${result.status}\nReceiver: ${result.receiver}\n\nYou can view the transaction on the Monad Explorer: https://testnet.monadexplorer.com/tx/${result.transactionHash}\n\nAfter the transaction is confirmed, you will receive staking shares in return.`;
            } catch (error: any) {
                return `Error depositing to Apriori staking contract: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    return [
        depositTool
    ];
} 
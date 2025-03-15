import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
import { SHMONAD_ACTIONS } from "../actions";

/**
 * Create Shmonad tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export function createShmonadTools(agent: MonadAgentKit) {
    const stakeTool = new DynamicStructuredTool({
        name: "shmonad_stake",
        description: "Stake native MON tokens in the Shmonad staking contract. Returns transaction hash immediately without waiting for confirmation.",
        schema: z.object({
            amount: z.number().describe("The amount of MON to stake")
        }),
        func: async ({ amount }) => {
            try {
                const result = await SHMONAD_ACTIONS.stake(
                    agent,
                    amount
                );

                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error staking tokens: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    const unstakeTool = new DynamicStructuredTool({
        name: "shmonad_unstake",
        description: "Unstake tokens from the Shmonad staking contract. Returns transaction hash immediately without waiting for confirmation.",
        schema: z.object({
            shares: z.number().describe("The number of MON to unstake")
        }),
        func: async ({ shares }) => {
            try {
                const result = await SHMONAD_ACTIONS.unstake(
                    agent,
                    shares
                );

                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error unstaking tokens: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    return [
        stakeTool,
        unstakeTool
    ];
} 
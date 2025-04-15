"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShmonadTools = createShmonadTools;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const actions_1 = require("../actions");
/**
 * Create Shmonad tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
function createShmonadTools(agent) {
    const stakeTool = new tools_1.DynamicStructuredTool({
        name: "shmonad_stake",
        description: "Stake native MON tokens in the Shmonad staking contract. Returns transaction hash immediately without waiting for confirmation.",
        schema: zod_1.z.object({
            amount: zod_1.z.number().describe("The amount of MON to stake")
        }),
        func: async ({ amount }) => {
            try {
                const result = await actions_1.SHMONAD_ACTIONS.stake(agent, amount);
                return JSON.stringify(result, null, 2);
            }
            catch (error) {
                return `Error staking tokens: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });
    const unstakeTool = new tools_1.DynamicStructuredTool({
        name: "shmonad_unstake",
        description: "Unstake tokens from the Shmonad staking contract. Returns transaction hash immediately without waiting for confirmation.",
        schema: zod_1.z.object({
            shares: zod_1.z.number().describe("The number of MON to unstake")
        }),
        func: async ({ shares }) => {
            try {
                const result = await actions_1.SHMONAD_ACTIONS.unstake(agent, shares);
                return JSON.stringify(result, null, 2);
            }
            catch (error) {
                return `Error unstaking tokens: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });
    return [
        stakeTool,
        unstakeTool
    ];
}

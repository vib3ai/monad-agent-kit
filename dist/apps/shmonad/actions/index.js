"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHMONAD_ACTIONS = void 0;
exports.stake = stake;
exports.unstake = unstake;
const tools_1 = require("../tools");
/**
 * Stake native tokens (MON) in the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param amount The amount to stake in MON
 * @returns The transaction receipt
 */
async function stake(agent, amount) {
    try {
        const result = await tools_1.shmonadTools.stake(agent, amount);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Unstake tokens from the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param shares The number of shares to unstake
 * @returns The transaction receipt
 */
async function unstake(agent, shares) {
    try {
        const result = await tools_1.shmonadTools.unstake(agent, shares);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Shmonad actions
 */
exports.SHMONAD_ACTIONS = {
    stake,
    unstake
};

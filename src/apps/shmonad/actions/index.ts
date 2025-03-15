import { MonadAgentKit } from "../../../agent";
import { shmonadTools } from "../tools";

/**
 * Stake native tokens (MON) in the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param amount The amount to stake in MON
 * @returns The transaction receipt
 */
export async function stake(
    agent: MonadAgentKit,
    amount: number
) {
    try {
        const result = await shmonadTools.stake(agent, amount);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Unstake tokens from the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param shares The number of shares to unstake
 * @returns The transaction receipt
 */
export async function unstake(
    agent: MonadAgentKit,
    shares: number
) {
    try {
        const result = await shmonadTools.unstake(agent, shares);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Shmonad actions
 */
export const SHMONAD_ACTIONS = {
    stake,
    unstake
}; 
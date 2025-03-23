import { MonadAgentKit } from "../../../agent";
import { aprioriTools } from "../tools";

/**
 * Deposit assets into the Apriori staking contract
 * @param agent The MonadAgentKit instance
 * @param assets The amount of assets to deposit (in wei)
 * @param receiver The address to receive the staking shares (defaults to the sender's address)
 * @returns Transaction hash and deposit details
 */
export async function deposit(
    agent: MonadAgentKit,
    assets: bigint,
    receiver?: `0x${string}`
) {
    try {
        const result = await aprioriTools.deposit(agent, assets, receiver);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Export Apriori actions
 */
export const APRIORI_ACTIONS = {
    deposit
}; 
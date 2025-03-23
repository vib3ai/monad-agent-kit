import { MonadAgentKit } from "../../../agent";
import { magmaTools } from "../tools";

/**
 * Deposit MON into the Magma staking contract
 * @param agent The MonadAgentKit instance
 * @param amount The amount of MON to deposit (in wei)
 * @returns Transaction hash and deposit details
 */
export async function depositMon(
    agent: MonadAgentKit,
    amount: bigint
) {
    try {
        const result = await magmaTools.depositMon(agent, amount);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Export Magma actions
 */
export const MAGMA_ACTIONS = {
    depositMon
}; 
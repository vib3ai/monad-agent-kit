import { MonadAgentKit } from '../../../agent';
import { MAGMA_CONTRACTS } from '../constants';
import { STAKING_ABI } from '../utils';

/**
 * Deposit MON into the Magma staking contract without referral
 * @param agent The MonadAgentKit instance
 * @param amount The amount of MON to deposit (in wei)
 * @returns Transaction hash and deposit details
 */
export async function depositMon(
    agent: MonadAgentKit,
    amount: bigint
) {
    try {
        // Call the depositMon function on the staking contract with no arguments
        const txHash = await agent.walletClient.writeContract({
            address: MAGMA_CONTRACTS.STAKING,
            abi: STAKING_ABI,
            functionName: 'depositMon',
            args: [],
            value: amount, // Send the amount with the transaction (for payable functions)
        });

        // Return transaction hash without waiting for confirmation
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The deposit is now pending on the blockchain.',
            amount: amount.toString()
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to deposit MON: ${errorMessage}`);
    }
}

/**
 * Export all Magma tools
 */
export const magmaTools = {
    depositMon,
}; 
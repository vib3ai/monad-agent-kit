import { MonadAgentKit } from '../../../agent';
import { APRIORI_CONTRACTS } from '../constants';
import { STAKING_ABI } from '../utils';

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
        // If no receiver is specified, use the wallet address
        const receiverAddress = receiver || agent.getWalletAddress();

        // Call the deposit function on the staking contract
        const txHash = await agent.walletClient.writeContract({
            address: APRIORI_CONTRACTS.STAKING,
            abi: STAKING_ABI,
            functionName: 'deposit',
            args: [assets, receiverAddress],
            value: assets, // Send the assets with the transaction (for payable functions)
        });

        // Return transaction hash without waiting for confirmation
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The deposit is now pending on the blockchain.',
            amount: assets.toString(),
            receiver: receiverAddress
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to deposit assets: ${errorMessage}`);
    }
}

/**
 * Export all Apriori tools
 */
export const aprioriTools = {
    deposit,
}; 
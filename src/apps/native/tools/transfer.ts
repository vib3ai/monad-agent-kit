import { MonadAgentKit } from '../../../agent';
import { Address, parseEther } from 'viem';
import { TransferResponse } from '../../../types';

/**
 * Transfer native tokens to another address
 * @param agent - The MonadAgentKit instance
 * @param to - The recipient address
 * @param amount - The amount to transfer in ETH
 * @returns The transfer response with status and transaction hash
 */
export async function transfer(
    agent: MonadAgentKit,
    to: string,
    amount: string
): Promise<TransferResponse> {
    try {
        const recipient = to as Address;
        const txHash = await agent.walletClient.sendTransaction({
            to: recipient,
            value: parseEther(amount),
        });

        return {
            status: 'success',
            txHash,
            from: agent.getWalletAddress(),
            to: recipient,
            amount,
        };
    } catch (error: any) {
        console.error('Error transferring tokens:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to transfer tokens',
            code: error.code,
        };
    }
} 
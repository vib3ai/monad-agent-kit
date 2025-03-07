import { MonadAgentKit } from '../../../agent';
import { Address, formatEther } from 'viem';
import { BalanceResponse } from '../../../types';

/**
 * Get the balance of a wallet
 * @param agent - The MonadAgentKit instance
 * @param address - The address to check (optional)
 * @returns The balance response with status and balance in ETH
 */
export async function get_balance(
    agent: MonadAgentKit,
    address?: string
): Promise<BalanceResponse> {
    try {
        const targetAddress = (address || agent.getWalletAddress()) as Address;
        const rawBalance = await agent.publicClient.getBalance({
            address: targetAddress,
        });

        return {
            status: 'success',
            balance: formatEther(rawBalance),
            address: targetAddress,
        };
    } catch (error: any) {
        console.error('Error getting balance:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to get balance',
            code: error.code,
        };
    }
} 
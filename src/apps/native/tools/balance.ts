import { MonadAgentKit } from '../../../agent';

/**
 * Get the balance of a wallet
 * @param agent - The MonadAgentKit instance
 * @param address - The address to check (optional)
 * @returns The balance in ETH
 */
export async function get_balance(
    agent: MonadAgentKit,
    address?: string
): Promise<string> {
    return agent.getBalance(address);
} 
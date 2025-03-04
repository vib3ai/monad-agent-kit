import { MonadAgentKit } from '../../../agent';

/**
 * Transfer native tokens to another address
 * @param agent - The MonadAgentKit instance
 * @param to - The recipient address
 * @param amount - The amount to transfer in ETH
 * @returns The transaction hash
 */
export async function transfer(
    agent: MonadAgentKit,
    to: string,
    amount: string
): Promise<string> {
    return agent.transfer(to, amount);
} 
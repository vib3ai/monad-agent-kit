import { MonadAgentKit } from '../../../agent';
import { BalanceResponse } from '../../../types';
/**
 * Get the balance of a wallet
 * @param agent - The MonadAgentKit instance
 * @param address - The address to check (optional)
 * @returns The balance response with status and balance in ETH
 */
export declare function get_balance(agent: MonadAgentKit, address?: string): Promise<BalanceResponse>;

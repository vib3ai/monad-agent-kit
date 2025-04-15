import { MonadAgentKit } from "../../../agent";
import { Action } from '../../../types/action';
/**
 * Get the balance of a Monad wallet
 * @param agent The MonadAgentKit instance
 * @param address Optional address to check balance for
 * @returns The balance information
 */
export declare function getBalance(agent: MonadAgentKit, address?: string): Promise<import("../../..").BalanceResponse>;
/**
 * Balance action definition for action executor compatibility
 */
export declare const balanceAction: Action;
/**
 * Transfer native tokens (ETH) to another address
 * @param agent The MonadAgentKit instance
 * @param to The recipient address
 * @param amount The amount to transfer in ETH
 * @returns The transaction details
 */
export declare function transferETH(agent: MonadAgentKit, to: string, amount: string): Promise<import("../../..").TransferResponse>;
/**
 * Transfer action definition for action executor compatibility
 */
export declare const transferAction: Action;
/**
 * Native actions
 */
export declare const NATIVE_ACTIONS: {
    getBalance: typeof getBalance;
    transferETH: typeof transferETH;
};

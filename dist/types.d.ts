import { Chain } from 'viem';
import { Tool } from 'langchain/tools';
/**
 * Common types for the Monad Agent Kit
 */
/**
 * Type for a LangChain tool created by the Monad Agent Kit
 */
export type MonadTool = Tool;
/**
 * Type for a wallet configuration
 */
export interface WalletConfig {
    privateKey: string;
    chain?: Chain;
    rpcUrl?: string;
}
/**
 * Type for balance response
 */
export interface BalanceResponse {
    status: 'success' | 'error';
    balance?: string;
    address?: string;
    message?: string;
    code?: string;
}
/**
 * Type for transfer response
 */
export interface TransferResponse {
    status: 'success' | 'error';
    txHash?: string;
    from?: string;
    to?: string;
    amount?: string;
    message?: string;
    code?: string;
}

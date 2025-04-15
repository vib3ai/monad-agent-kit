import { MonadAgentKit } from '../../../agent';
/**
 * Get the balance of an ERC20 token for a specific address
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param ownerAddress - The address to check the balance for (defaults to the wallet address)
 * @returns The token balance as a string
 */
export declare function getTokenBalance(agent: MonadAgentKit, tokenAddress: string, ownerAddress?: string): Promise<string>;
/**
 * Transfer ERC20 tokens to another address
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param to - The recipient address
 * @param amount - The amount to transfer (in token units, not wei)
 * @returns The transaction hash
 */
export declare function transferToken(agent: MonadAgentKit, tokenAddress: string, to: string, amount: string): Promise<{
    transactionHash: string;
    status: string;
    message: string;
}>;
/**
 * Approve an address to spend tokens on behalf of the wallet owner
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param spender - The address to approve
 * @param amount - The amount to approve (in token units, not wei)
 * @returns The transaction hash
 */
export declare function approveToken(agent: MonadAgentKit, tokenAddress: string, spender: string, amount: string): Promise<{
    transactionHash: string;
    status: string;
    message: string;
}>;
/**
 * Get the allowance of tokens that a spender can use on behalf of the owner
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param ownerAddress - The address of the token owner
 * @param spenderAddress - The address of the spender
 * @returns The allowance as a string
 */
export declare function getTokenAllowance(agent: MonadAgentKit, tokenAddress: string, ownerAddress: string, spenderAddress: string): Promise<string>;
/**
 * Get token information (name, symbol, decimals, total supply)
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @returns Token information object
 */
export declare function getTokenInfo(agent: MonadAgentKit, tokenAddress: string): Promise<{
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
}>;
export declare const erc20Tools: {
    getTokenBalance: typeof getTokenBalance;
    transferToken: typeof transferToken;
    approveToken: typeof approveToken;
    getTokenAllowance: typeof getTokenAllowance;
    getTokenInfo: typeof getTokenInfo;
    createCurveWithMetadata: () => Promise<never>;
};

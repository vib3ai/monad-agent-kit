import { MonadAgentKit } from '../../../agent';
import { erc20Tools } from '../tools';
import { findTokenAddress, getTokenName } from '../utils/token-finder';

/**
 * Get the balance of an ERC20 token for a specific address
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the ERC20 token (optional if token name is provided)
 * @param token The name or symbol of the token (optional if token address is provided)
 * @param ownerAddress The address to check balance for (defaults to the wallet address)
 * @returns The token balance information
 */
export async function getTokenBalance(
    agent: MonadAgentKit,
    tokenAddress?: string,
    token?: string,
    ownerAddress?: string
) {
    try {
        // Find the token address if a name/symbol was provided
        let resolvedTokenAddress = tokenAddress;
        if (!resolvedTokenAddress && token) {
            resolvedTokenAddress = findTokenAddress(token);
            if (!resolvedTokenAddress) {
                return {
                    status: 'error',
                    message: `Unknown token: ${token}. Please provide a valid token name, symbol, or address.`
                };
            }
        }

        if (!resolvedTokenAddress) {
            return {
                status: 'error',
                message: 'Either tokenAddress or token must be provided'
            };
        }

        const balance = await erc20Tools.getTokenBalance(agent, resolvedTokenAddress, ownerAddress);
        const tokenName = getTokenName(resolvedTokenAddress);

        return {
            status: 'success',
            balance,
            tokenAddress: resolvedTokenAddress,
            tokenName,
            ownerAddress: ownerAddress || agent.getWalletAddress()
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}

/**
 * Transfer ERC20 tokens to another address
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the ERC20 token
 * @param to The recipient address
 * @param amount The amount to transfer (in token units, not wei)
 * @returns Transaction information
 */
export async function transferToken(
    agent: MonadAgentKit,
    tokenAddress: string,
    to: string,
    amount: string
) {
    try {
        const txHash = await erc20Tools.transferToken(agent, tokenAddress, to, amount);
        return {
            status: 'success',
            txHash,
            tokenAddress,
            to,
            amount
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}

/**
 * Approve an address to spend tokens on behalf of the wallet owner
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the ERC20 token
 * @param spender The address to approve
 * @param amount The amount to approve (in token units, not wei)
 * @returns Transaction information
 */
export async function approveToken(
    agent: MonadAgentKit,
    tokenAddress: string,
    spender: string,
    amount: string
) {
    try {
        const txHash = await erc20Tools.approveToken(agent, tokenAddress, spender, amount);
        return {
            status: 'success',
            txHash,
            tokenAddress,
            spender,
            amount
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}

/**
 * Get the allowance of tokens that a spender can use on behalf of the owner
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the ERC20 token
 * @param ownerAddress The address of the token owner
 * @param spenderAddress The address of the spender
 * @returns Allowance information
 */
export async function getTokenAllowance(
    agent: MonadAgentKit,
    tokenAddress: string,
    ownerAddress: string,
    spenderAddress: string
) {
    try {
        const allowance = await erc20Tools.getTokenAllowance(agent, tokenAddress, ownerAddress, spenderAddress);
        return {
            status: 'success',
            allowance,
            tokenAddress,
            ownerAddress,
            spenderAddress
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}

/**
 * Get information about an ERC20 token
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the ERC20 token
 * @returns Token information
 */
export async function getTokenInfo(
    agent: MonadAgentKit,
    tokenAddress: string
) {
    try {
        const info = await erc20Tools.getTokenInfo(agent, tokenAddress);
        return {
            status: 'success',
            info,
            tokenAddress
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}

/**
 * Export ERC20 actions
 */
export const ERC20_ACTIONS = {
    getTokenBalance,
    transferToken,
    approveToken,
    getTokenAllowance,
    getTokenInfo
}; 
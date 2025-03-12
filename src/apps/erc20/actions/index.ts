import { z } from 'zod';
import { Action, Example } from '../../../types/action';
import { MonadAgentKit } from '../../../agent';
import { erc20Tools } from '../tools';
import { findTokenAddress, getTokenName } from '../utils/token-finder';

// Schema for the getTokenBalance action
const getTokenBalanceSchema = z.object({
    tokenAddress: z.string().optional().describe('The address of the ERC20 token'),
    token: z.string().optional().describe('The name or symbol of the token (e.g., "USDT", "USDC")'),
    ownerAddress: z.string().optional().describe('The address to check the balance for (defaults to the wallet address)')
}).refine(data => data.tokenAddress || data.token, {
    message: 'Either tokenAddress or token must be provided',
    path: ['tokenAddress']
});

// Examples for the getTokenBalance action
const getTokenBalanceExamples: Array<Example> = [
    {
        input: {
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
        },
        output: {
            status: "success",
            balance: "100.5",
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            ownerAddress: "0xYourWalletAddress"
        },
        explanation: "Get the DAI token balance for your wallet address"
    },
    {
        input: {
            tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
            ownerAddress: "0x1234567890123456789012345678901234567890"
        },
        output: {
            status: "success",
            balance: "50.0",
            tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            ownerAddress: "0x1234567890123456789012345678901234567890"
        },
        explanation: "Get the USDC token balance for a specific address"
    }
];

// Handler for the getTokenBalance action
async function getTokenBalanceHandler(
    agent: MonadAgentKit,
    input: Record<string, any>
) {
    try {
        // Find the token address if a name/symbol was provided
        let tokenAddress = input.tokenAddress;
        if (!tokenAddress && input.token) {
            tokenAddress = findTokenAddress(input.token);
            if (!tokenAddress) {
                return {
                    status: 'error',
                    message: `Unknown token: ${input.token}. Please provide a valid token name, symbol, or address.`
                };
            }
        }

        const balance = await erc20Tools.getTokenBalance(agent, tokenAddress, input.ownerAddress);
        const tokenName = getTokenName(tokenAddress);

        return {
            status: 'success',
            balance,
            tokenAddress,
            tokenName,
            ownerAddress: input.ownerAddress || agent.getWalletAddress()
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}

// Schema for the transferToken action
const transferTokenSchema = z.object({
    tokenAddress: z.string().describe('The address of the ERC20 token'),
    to: z.string().describe('The recipient address'),
    amount: z.string().describe('The amount to transfer (in token units, not wei)')
});

// Examples for the transferToken action
const transferTokenExamples: Array<Example> = [
    {
        input: {
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
            to: "0x1234567890123456789012345678901234567890",
            amount: "10.5"
        },
        output: {
            status: "success",
            txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            to: "0x1234567890123456789012345678901234567890",
            amount: "10.5"
        },
        explanation: "Transfer 10.5 DAI tokens to the specified address"
    }
];

// Handler for the transferToken action
async function transferTokenHandler(
    agent: MonadAgentKit,
    input: Record<string, any>
) {
    const { tokenAddress, to, amount } = input as z.infer<typeof transferTokenSchema>;

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

// Schema for the approveToken action
const approveTokenSchema = z.object({
    tokenAddress: z.string().describe('The address of the ERC20 token'),
    spender: z.string().describe('The address to approve'),
    amount: z.string().describe('The amount to approve (in token units, not wei)')
});

// Examples for the approveToken action
const approveTokenExamples: Array<Example> = [
    {
        input: {
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
            spender: "0x1234567890123456789012345678901234567890",
            amount: "100"
        },
        output: {
            status: "success",
            txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            spender: "0x1234567890123456789012345678901234567890",
            amount: "100"
        },
        explanation: "Approve the spender to use up to 100 DAI tokens on behalf of your wallet"
    }
];

// Handler for the approveToken action
async function approveTokenHandler(
    agent: MonadAgentKit,
    input: Record<string, any>
) {
    const { tokenAddress, spender, amount } = input as z.infer<typeof approveTokenSchema>;

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

// Schema for the getTokenAllowance action
const getTokenAllowanceSchema = z.object({
    tokenAddress: z.string().describe('The address of the ERC20 token'),
    ownerAddress: z.string().describe('The address of the token owner'),
    spenderAddress: z.string().describe('The address of the spender')
});

// Examples for the getTokenAllowance action
const getTokenAllowanceExamples: Array<Example> = [
    {
        input: {
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
            ownerAddress: "0xYourWalletAddress",
            spenderAddress: "0x1234567890123456789012345678901234567890"
        },
        output: {
            status: "success",
            allowance: "100",
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            ownerAddress: "0xYourWalletAddress",
            spenderAddress: "0x1234567890123456789012345678901234567890"
        },
        explanation: "Get the amount of DAI tokens that the spender is allowed to use on behalf of the owner"
    }
];

// Handler for the getTokenAllowance action
async function getTokenAllowanceHandler(
    agent: MonadAgentKit,
    input: Record<string, any>
) {
    const { tokenAddress, ownerAddress, spenderAddress } = input as z.infer<typeof getTokenAllowanceSchema>;

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

// Schema for the getTokenInfo action
const getTokenInfoSchema = z.object({
    tokenAddress: z.string().describe('The address of the ERC20 token')
});

// Examples for the getTokenInfo action
const getTokenInfoExamples: Array<Example> = [
    {
        input: {
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F" // DAI
        },
        output: {
            status: "success",
            info: {
                name: "Dai Stablecoin",
                symbol: "DAI",
                decimals: 18,
                totalSupply: "5000000000"
            },
            tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F"
        },
        explanation: "Get information about the DAI token (name, symbol, decimals, total supply)"
    }
];

// Handler for the getTokenInfo action
async function getTokenInfoHandler(
    agent: MonadAgentKit,
    input: Record<string, any>
) {
    const { tokenAddress } = input as z.infer<typeof getTokenInfoSchema>;

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

// Define the getTokenBalance action
export const getTokenBalanceAction: Action = {
    name: 'getTokenBalance',
    similes: ['check token balance', 'get erc20 balance', 'view token balance', 'show token balance'],
    description: 'Get the balance of an ERC20 token for a specific address',
    examples: [getTokenBalanceExamples],
    schema: getTokenBalanceSchema,
    handler: getTokenBalanceHandler,
};

// Define the transferToken action
export const transferTokenAction: Action = {
    name: 'transferToken',
    similes: ['transfer erc20', 'send tokens', 'transfer tokens', 'send erc20'],
    description: 'Transfer ERC20 tokens to another address',
    examples: [transferTokenExamples],
    schema: transferTokenSchema,
    handler: transferTokenHandler,
};

// Define the approveToken action
export const approveTokenAction: Action = {
    name: 'approveToken',
    similes: ['approve token spending', 'approve erc20', 'allow token usage', 'set token allowance'],
    description: 'Approve an address to spend tokens on behalf of the wallet owner',
    examples: [approveTokenExamples],
    schema: approveTokenSchema,
    handler: approveTokenHandler,
};

// Define the getTokenAllowance action
export const getTokenAllowanceAction: Action = {
    name: 'getTokenAllowance',
    similes: ['check token allowance', 'get erc20 allowance', 'view token approval', 'show token spending limit'],
    description: 'Get the allowance of tokens that a spender can use on behalf of the owner',
    examples: [getTokenAllowanceExamples],
    schema: getTokenAllowanceSchema,
    handler: getTokenAllowanceHandler,
};

// Define the getTokenInfo action
export const getTokenInfoAction: Action = {
    name: 'getTokenInfo',
    similes: ['get token details', 'token information', 'erc20 info', 'token metadata'],
    description: 'Get information about an ERC20 token (name, symbol, decimals, total supply)',
    examples: [getTokenInfoExamples],
    schema: getTokenInfoSchema,
    handler: getTokenInfoHandler,
};

// Export all ERC20 actions
export const ERC20_ACTIONS = {
    getTokenBalance: getTokenBalanceAction,
    transferToken: transferTokenAction,
    approveToken: approveTokenAction,
    getTokenAllowance: getTokenAllowanceAction,
    getTokenInfo: getTokenInfoAction,
} as const; 
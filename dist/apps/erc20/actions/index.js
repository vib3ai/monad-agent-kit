"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20_ACTIONS = exports.getTokenInfoAction = exports.getTokenAllowanceAction = exports.approveTokenAction = exports.transferTokenAction = exports.getTokenBalanceAction = void 0;
const zod_1 = require("zod");
const tools_1 = require("../tools");
const token_finder_1 = require("../utils/token-finder");
// Schema for the getTokenBalance action
const getTokenBalanceSchema = zod_1.z.object({
    tokenAddress: zod_1.z.string().optional().describe('The address of the ERC20 token'),
    token: zod_1.z.string().optional().describe('The name or symbol of the token (e.g., "USDT", "USDC")'),
    ownerAddress: zod_1.z.string().optional().describe('The address to check the balance for (defaults to the wallet address)')
}).refine(data => data.tokenAddress || data.token, {
    message: 'Either tokenAddress or token must be provided',
    path: ['tokenAddress']
});
// Examples for the getTokenBalance action
const getTokenBalanceExamples = [
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
async function getTokenBalanceHandler(agent, input) {
    try {
        // Find the token address if a name/symbol was provided
        let tokenAddress = input.tokenAddress;
        if (!tokenAddress && input.token) {
            tokenAddress = (0, token_finder_1.findTokenAddress)(input.token);
            if (!tokenAddress) {
                return {
                    status: 'error',
                    message: `Unknown token: ${input.token}. Please provide a valid token name, symbol, or address.`
                };
            }
        }
        const balance = await tools_1.erc20Tools.getTokenBalance(agent, tokenAddress, input.ownerAddress);
        const tokenName = (0, token_finder_1.getTokenName)(tokenAddress);
        return {
            status: 'success',
            balance,
            tokenAddress,
            tokenName,
            ownerAddress: input.ownerAddress || agent.getWalletAddress()
        };
    }
    catch (error) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}
// Schema for the transferToken action
const transferTokenSchema = zod_1.z.object({
    tokenAddress: zod_1.z.string().describe('The address of the ERC20 token'),
    to: zod_1.z.string().describe('The recipient address'),
    amount: zod_1.z.string().describe('The amount to transfer (in token units, not wei)')
});
// Examples for the transferToken action
const transferTokenExamples = [
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
async function transferTokenHandler(agent, input) {
    const { tokenAddress, to, amount } = input;
    try {
        const txHash = await tools_1.erc20Tools.transferToken(agent, tokenAddress, to, amount);
        return {
            status: 'success',
            txHash,
            tokenAddress,
            to,
            amount
        };
    }
    catch (error) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}
// Schema for the approveToken action
const approveTokenSchema = zod_1.z.object({
    tokenAddress: zod_1.z.string().describe('The address of the ERC20 token'),
    spender: zod_1.z.string().describe('The address to approve'),
    amount: zod_1.z.string().describe('The amount to approve (in token units, not wei)')
});
// Examples for the approveToken action
const approveTokenExamples = [
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
async function approveTokenHandler(agent, input) {
    const { tokenAddress, spender, amount } = input;
    try {
        const txHash = await tools_1.erc20Tools.approveToken(agent, tokenAddress, spender, amount);
        return {
            status: 'success',
            txHash,
            tokenAddress,
            spender,
            amount
        };
    }
    catch (error) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}
// Schema for the getTokenAllowance action
const getTokenAllowanceSchema = zod_1.z.object({
    tokenAddress: zod_1.z.string().describe('The address of the ERC20 token'),
    ownerAddress: zod_1.z.string().describe('The address of the token owner'),
    spenderAddress: zod_1.z.string().describe('The address of the spender')
});
// Examples for the getTokenAllowance action
const getTokenAllowanceExamples = [
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
async function getTokenAllowanceHandler(agent, input) {
    const { tokenAddress, ownerAddress, spenderAddress } = input;
    try {
        const allowance = await tools_1.erc20Tools.getTokenAllowance(agent, tokenAddress, ownerAddress, spenderAddress);
        return {
            status: 'success',
            allowance,
            tokenAddress,
            ownerAddress,
            spenderAddress
        };
    }
    catch (error) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}
// Schema for the getTokenInfo action
const getTokenInfoSchema = zod_1.z.object({
    tokenAddress: zod_1.z.string().describe('The address of the ERC20 token')
});
// Examples for the getTokenInfo action
const getTokenInfoExamples = [
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
async function getTokenInfoHandler(agent, input) {
    const { tokenAddress } = input;
    try {
        const info = await tools_1.erc20Tools.getTokenInfo(agent, tokenAddress);
        return {
            status: 'success',
            info,
            tokenAddress
        };
    }
    catch (error) {
        return {
            status: 'error',
            message: error.message,
            code: error.code
        };
    }
}
// Define the getTokenBalance action
exports.getTokenBalanceAction = {
    name: 'getTokenBalance',
    similes: ['check token balance', 'get erc20 balance', 'view token balance', 'show token balance'],
    description: 'Get the balance of an ERC20 token for a specific address',
    examples: [getTokenBalanceExamples],
    schema: getTokenBalanceSchema,
    handler: getTokenBalanceHandler,
};
// Define the transferToken action
exports.transferTokenAction = {
    name: 'transferToken',
    similes: ['transfer erc20', 'send tokens', 'transfer tokens', 'send erc20'],
    description: 'Transfer ERC20 tokens to another address',
    examples: [transferTokenExamples],
    schema: transferTokenSchema,
    handler: transferTokenHandler,
};
// Define the approveToken action
exports.approveTokenAction = {
    name: 'approveToken',
    similes: ['approve token spending', 'approve erc20', 'allow token usage', 'set token allowance'],
    description: 'Approve an address to spend tokens on behalf of the wallet owner',
    examples: [approveTokenExamples],
    schema: approveTokenSchema,
    handler: approveTokenHandler,
};
// Define the getTokenAllowance action
exports.getTokenAllowanceAction = {
    name: 'getTokenAllowance',
    similes: ['check token allowance', 'get erc20 allowance', 'view token approval', 'show token spending limit'],
    description: 'Get the allowance of tokens that a spender can use on behalf of the owner',
    examples: [getTokenAllowanceExamples],
    schema: getTokenAllowanceSchema,
    handler: getTokenAllowanceHandler,
};
// Define the getTokenInfo action
exports.getTokenInfoAction = {
    name: 'getTokenInfo',
    similes: ['get token details', 'token information', 'erc20 info', 'token metadata'],
    description: 'Get information about an ERC20 token (name, symbol, decimals, total supply)',
    examples: [getTokenInfoExamples],
    schema: getTokenInfoSchema,
    handler: getTokenInfoHandler,
};
// Export all ERC20 actions
exports.ERC20_ACTIONS = {
    getTokenBalance: exports.getTokenBalanceAction,
    transferToken: exports.transferTokenAction,
    approveToken: exports.approveTokenAction,
    getTokenAllowance: exports.getTokenAllowanceAction,
    getTokenInfo: exports.getTokenInfoAction,
};

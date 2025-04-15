"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.erc20Tools = void 0;
exports.getTokenBalance = getTokenBalance;
exports.transferToken = transferToken;
exports.approveToken = approveToken;
exports.getTokenAllowance = getTokenAllowance;
exports.getTokenInfo = getTokenInfo;
const viem_1 = require("viem");
const erc20_json_1 = __importDefault(require("../abi/erc20.json"));
/**
 * Get the balance of an ERC20 token for a specific address
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param ownerAddress - The address to check the balance for (defaults to the wallet address)
 * @returns The token balance as a string
 */
async function getTokenBalance(agent, tokenAddress, ownerAddress) {
    try {
        // Use the wallet address if ownerAddress is not provided
        const address = ownerAddress || agent.getWalletAddress();
        // Call the balanceOf function on the ERC20 contract
        const balance = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'balanceOf',
            args: [address]
        });
        // Get the token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'decimals'
        });
        // Format the balance based on the token's decimals
        return formatUnits(balance, Number(decimals));
    }
    catch (error) {
        console.error('Error getting token balance:', error);
        throw new Error(`Failed to get token balance: ${error.message}`);
    }
}
/**
 * Transfer ERC20 tokens to another address
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param to - The recipient address
 * @param amount - The amount to transfer (in token units, not wei)
 * @returns The transaction hash
 */
async function transferToken(agent, tokenAddress, to, amount) {
    try {
        // Get the token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'decimals'
        });
        // Parse the amount based on the token's decimals
        const parsedAmount = (0, viem_1.parseUnits)(amount, Number(decimals));
        // Prepare the transaction
        const { request } = await agent.publicClient.simulateContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'transfer',
            args: [to, parsedAmount],
            account: agent.getWalletAddress(),
        });
        // Send the transaction
        const txHash = await agent.walletClient.writeContract(request);
        // Return immediately without waiting for the transaction to be mined
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The token transfer is now pending on the blockchain.'
        };
    }
    catch (error) {
        console.error('Error transferring tokens:', error);
        throw new Error(`Failed to transfer tokens: ${error.message}`);
    }
}
/**
 * Approve an address to spend tokens on behalf of the wallet owner
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param spender - The address to approve
 * @param amount - The amount to approve (in token units, not wei)
 * @returns The transaction hash
 */
async function approveToken(agent, tokenAddress, spender, amount) {
    try {
        // Get the token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'decimals'
        });
        // Parse the amount based on the token's decimals
        const parsedAmount = (0, viem_1.parseUnits)(amount, Number(decimals));
        // Prepare the transaction
        const { request } = await agent.publicClient.simulateContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'approve',
            args: [spender, parsedAmount],
            account: agent.getWalletAddress(),
        });
        // Send the transaction
        const txHash = await agent.walletClient.writeContract(request);
        // Return immediately without waiting for the transaction to be mined
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The token approval is now pending on the blockchain.'
        };
    }
    catch (error) {
        console.error('Error approving tokens:', error);
        throw new Error(`Failed to approve tokens: ${error.message}`);
    }
}
/**
 * Get the allowance of tokens that a spender can use on behalf of the owner
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param ownerAddress - The address of the token owner
 * @param spenderAddress - The address of the spender
 * @returns The allowance as a string
 */
async function getTokenAllowance(agent, tokenAddress, ownerAddress, spenderAddress) {
    try {
        // Call the allowance function on the ERC20 contract
        const allowance = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'allowance',
            args: [ownerAddress, spenderAddress]
        });
        // Get the token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'decimals'
        });
        // Format the allowance based on the token's decimals
        return formatUnits(allowance, Number(decimals));
    }
    catch (error) {
        console.error('Error getting token allowance:', error);
        throw new Error(`Failed to get token allowance: ${error.message}`);
    }
}
/**
 * Get token information (name, symbol, decimals, total supply)
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @returns Token information object
 */
async function getTokenInfo(agent, tokenAddress) {
    try {
        // Get token name
        const name = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'name'
        });
        // Get token symbol
        const symbol = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'symbol'
        });
        // Get token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'decimals'
        });
        // Get token total supply
        const totalSupply = await agent.publicClient.readContract({
            address: tokenAddress,
            abi: erc20_json_1.default,
            functionName: 'totalSupply'
        });
        return {
            name: name,
            symbol: symbol,
            decimals: Number(decimals),
            totalSupply: formatUnits(totalSupply, Number(decimals))
        };
    }
    catch (error) {
        console.error('Error getting token info:', error);
        throw new Error(`Failed to get token info: ${error.message}`);
    }
}
// Helper function to format units based on decimals
function formatUnits(value, decimals) {
    return (Number(value) / Math.pow(10, decimals)).toString();
}
// Export all tools
exports.erc20Tools = {
    getTokenBalance,
    transferToken,
    approveToken,
    getTokenAllowance,
    getTokenInfo,
    // Keep the nadfun tools for backward compatibility
    createCurveWithMetadata: async () => {
        throw new Error('This function is deprecated');
    }
};

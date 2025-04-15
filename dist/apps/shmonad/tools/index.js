"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shmonadTools = void 0;
exports.stake = stake;
exports.unstake = unstake;
const viem_1 = require("viem");
const constants_1 = require("../constants");
const core_json_1 = __importDefault(require("../abi/core.json"));
/**
 * Stake native tokens (MON) in the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param amount The amount to stake in MON
 * @returns The transaction hash
 */
async function stake(agent, amount) {
    try {
        // Use the agent's wallet client and public client
        const { walletClient } = agent;
        const walletAddress = agent.getWalletAddress();
        // Convert amount to wei
        const amountInWei = (0, viem_1.parseEther)(amount.toString());
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Staking operation timed out after 30 seconds'));
            }, 30000); // 30 second timeout
        });
        // Call the deposit function (stake)
        const writeContractPromise = walletClient.writeContract({
            address: constants_1.SHMONAD_CONFIG.STAKING_ADDRESS,
            abi: core_json_1.default,
            functionName: 'deposit',
            args: [amountInWei, walletAddress],
            value: amountInWei
        });
        // Race between the contract call and the timeout
        const hash = await Promise.race([writeContractPromise, timeoutPromise]);
        // Return the transaction hash immediately without waiting for receipt
        return {
            transactionHash: hash,
            status: 'pending',
            message: 'Transaction submitted successfully. The staking operation is now pending on the blockchain.'
        };
    }
    catch (error) {
        // Return a more informative error message
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Staking failed: ${errorMessage}`);
    }
}
/**
 * Unstake tokens from the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param shares The number of shares to unstake
 * @returns The transaction hash
 */
async function unstake(agent, shares) {
    try {
        // Use the agent's wallet client and public client
        const { walletClient } = agent;
        const walletAddress = agent.getWalletAddress();
        // Convert shares to wei
        const sharesInWei = (0, viem_1.parseEther)(shares.toString());
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Unstaking operation timed out after 30 seconds'));
            }, 30000); // 30 second timeout
        });
        // Call the redeem function (unstake)
        const writeContractPromise = walletClient.writeContract({
            address: constants_1.SHMONAD_CONFIG.STAKING_ADDRESS,
            abi: core_json_1.default,
            functionName: 'redeem',
            args: [sharesInWei, walletAddress, walletAddress]
        });
        // Race between the contract call and the timeout
        const hash = await Promise.race([writeContractPromise, timeoutPromise]);
        // Return the transaction hash immediately without waiting for receipt
        return {
            transactionHash: hash,
            status: 'pending',
            message: 'Transaction submitted successfully. The unstaking operation is now pending on the blockchain.'
        };
    }
    catch (error) {
        // Return a more informative error message
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Unstaking failed: ${errorMessage}`);
    }
}
/**
 * Shmonad tools
 */
exports.shmonadTools = {
    stake,
    unstake
};

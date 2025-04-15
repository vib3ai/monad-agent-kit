"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = getBalance;
const viem_1 = require("viem");
/**
 * Get the balance of a wallet
 * @param agent - The MonadAgentKit instance
 * @param address - The address to check (optional)
 * @returns The balance response with status and balance in ETH
 */
async function getBalance(agent, address) {
    try {
        const targetAddress = (address || agent.getWalletAddress());
        const rawBalance = await agent.publicClient.getBalance({
            address: targetAddress,
        });
        return {
            status: 'success',
            balance: (0, viem_1.formatEther)(rawBalance),
            address: targetAddress,
        };
    }
    catch (error) {
        console.error('Error getting balance:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to get balance',
            code: error.code,
        };
    }
}

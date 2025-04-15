"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = transfer;
const viem_1 = require("viem");
/**
 * Transfer native tokens to another address
 * @param agent - The MonadAgentKit instance
 * @param to - The recipient address
 * @param amount - The amount to transfer in ETH
 * @returns The transfer response with status and transaction hash
 */
async function transfer(agent, to, amount) {
    try {
        const recipient = to;
        const txHash = await agent.walletClient.sendTransaction({
            to: recipient,
            value: (0, viem_1.parseEther)(amount),
        });
        return {
            status: 'success',
            txHash,
            from: agent.getWalletAddress(),
            to: recipient,
            amount,
        };
    }
    catch (error) {
        console.error('Error transferring tokens:', error);
        return {
            status: 'error',
            message: error.message || 'Failed to transfer tokens',
            code: error.code,
        };
    }
}

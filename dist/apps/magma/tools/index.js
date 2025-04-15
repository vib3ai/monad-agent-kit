"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.magmaTools = void 0;
exports.depositMon = depositMon;
const constants_1 = require("../constants");
const utils_1 = require("../utils");
/**
 * Deposit MON into the Magma staking contract without referral
 * @param agent The MonadAgentKit instance
 * @param amount The amount of MON to deposit (in wei)
 * @returns Transaction hash and deposit details
 */
async function depositMon(agent, amount) {
    try {
        // Call the depositMon function on the staking contract with no arguments
        const txHash = await agent.walletClient.writeContract({
            address: constants_1.MAGMA_CONTRACTS.STAKING,
            abi: utils_1.STAKING_ABI,
            functionName: 'depositMon',
            args: [],
            value: amount, // Send the amount with the transaction (for payable functions)
        });
        // Return transaction hash without waiting for confirmation
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The deposit is now pending on the blockchain.',
            amount: amount.toString()
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to deposit MON: ${errorMessage}`);
    }
}
/**
 * Export all Magma tools
 */
exports.magmaTools = {
    depositMon,
};

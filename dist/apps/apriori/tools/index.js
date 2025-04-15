"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aprioriTools = void 0;
exports.deposit = deposit;
const constants_1 = require("../constants");
const utils_1 = require("../utils");
/**
 * Deposit assets into the Apriori staking contract
 * @param agent The MonadAgentKit instance
 * @param assets The amount of assets to deposit (in wei)
 * @param receiver The address to receive the staking shares (defaults to the sender's address)
 * @returns Transaction hash and deposit details
 */
async function deposit(agent, assets, receiver) {
    try {
        // If no receiver is specified, use the wallet address
        const receiverAddress = receiver || agent.getWalletAddress();
        // Call the deposit function on the staking contract
        const txHash = await agent.walletClient.writeContract({
            address: constants_1.APRIORI_CONTRACTS.STAKING,
            abi: utils_1.STAKING_ABI,
            functionName: 'deposit',
            args: [assets, receiverAddress],
            value: assets, // Send the assets with the transaction (for payable functions)
        });
        // Return transaction hash without waiting for confirmation
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The deposit is now pending on the blockchain.',
            amount: assets.toString(),
            receiver: receiverAddress
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to deposit assets: ${errorMessage}`);
    }
}
/**
 * Export all Apriori tools
 */
exports.aprioriTools = {
    deposit,
};

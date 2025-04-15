"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nadfunTools = void 0;
exports.createCurveWithMetadata = createCurveWithMetadata;
const viem_1 = require("viem");
const protocol_json_1 = __importDefault(require("../abi/protocol.json"));
const constants_1 = require("../constants");
const metadata_1 = require("../utils/metadata");
/**
 * Creates a new curve token with metadata using the nadfun protocol
 * @param agent - The MonadAgentKit instance
 * @param creator - The address of the creator (defaults to the wallet address)
 * @param name - The name of the token
 * @param symbol - The symbol of the token
 * @param description - The description of the token
 * @param imageBuffer - The image buffer
 * @param imageType - The MIME type of the image (e.g., 'image/jpeg', 'image/png')
 * @param amountIn - The amount of ETH to invest in ETH (e.g., "0.5"). Minimum required amount is 0.5 ETH.
 * @param homePage - Optional home page URL
 * @param twitter - Optional Twitter URL
 * @param telegram - Optional Telegram URL
 * @returns The transaction result with curve address, token address, and other details
 */
async function createCurveWithMetadata(agent, creator, name, symbol, description, imageBuffer, imageType, amountIn, homePage, twitter, telegram) {
    try {
        // Upload image and prepare metadata
        const metadataUrl = await (0, metadata_1.prepareTokenMetadata)(name, symbol, description, imageBuffer, imageType, homePage, twitter, telegram);
        // Use the wallet address if creator is not provided
        const creatorAddress = creator || agent.getWalletAddress();
        // Convert string amounts to BigInt
        const amountInWei = (0, viem_1.parseEther)(amountIn);
        // Calculate fee based on the constant fee percentage
        const feePercent = constants_1.NADFUN_FEES.CREATE_CURVE_FEE_PERCENT;
        const feeWei = amountInWei * BigInt(feePercent) / BigInt(100);
        // Get the protocol contract address from constants
        const protocolAddress = constants_1.NADFUN_ADDRESSES.PROTOCOL;
        // Calculate total value to send (investment amount + fee)
        const totalValue = amountInWei + feeWei;
        console.log(`Creating curve with metadata:
            Creator: ${creatorAddress}
            Name: ${name}
            Symbol: ${symbol}
            Metadata URL: ${metadataUrl}
            Amount (ETH): ${amountIn}
            Amount (Wei): ${amountInWei}
            Fee (ETH): ${parseFloat(amountIn) * feePercent / 100}
            Fee (Wei): ${feeWei}
            Total Value (Wei): ${totalValue}
        `);
        // Prepare the transaction
        const { request } = await agent.publicClient.simulateContract({
            address: protocolAddress,
            abi: protocol_json_1.default,
            functionName: 'createCurve',
            args: [
                creatorAddress,
                name,
                symbol,
                metadataUrl,
                amountInWei,
                feeWei
            ],
            value: totalValue + (0, viem_1.parseEther)('0.02'), // Total amount to send: initial buy amount + fee
        });
        // Send the transaction
        const txHash = await agent.walletClient.writeContract(request);
        // Return immediately without waiting for the transaction to be mined
        return {
            status: 'success',
            txHash,
            message: 'Transaction submitted successfully. The curve creation is now pending on the blockchain.'
        };
    }
    catch (error) {
        console.error('Error creating curve with metadata:', error);
        return {
            status: 'error',
            message: error.message || 'Unknown error occurred',
            code: error.code,
        };
    }
}
// Export all tools
exports.nadfunTools = {
    createCurveWithMetadata,
};

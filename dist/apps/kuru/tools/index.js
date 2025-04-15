"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kuruTools = void 0;
exports.getAllPools = getAllPools;
exports.findBestPath = findBestPath;
exports.getPrice = getPrice;
exports.swap = swap;
const kuru_sdk_1 = require("@kuru-labs/kuru-sdk");
const constants_1 = require("../constants");
const ethers_1 = require("ethers");
/**
 * Get all pools from Kuru DEX
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param poolFetcher The pool fetcher instance
 * @returns The pools
 */
async function getAllPools(tokenInAddress, tokenOutAddress, poolFetcher) {
    try {
        // Convert the readonly array to a regular array
        const baseTokens = [...constants_1.KURU_BASE_TOKENS];
        const pools = await poolFetcher.getAllPools(tokenInAddress, tokenOutAddress, baseTokens);
        return pools;
    }
    catch (error) {
        console.error("Error getting pools:", error);
        throw error;
    }
}
/**
 * Find the best path for a swap
 * @param agent The MonadAgentKit instance
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param amountToSwap The amount to swap
 * @param amountType The type of amount (amountIn or amountOut)
 * @param poolFetcher The pool fetcher instance
 * @param pools The pools
 * @returns The best path
 */
async function findBestPath(agent, tokenInAddress, tokenOutAddress, amountToSwap, amountType, poolFetcher, pools) {
    try {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.MONAD_RPC_URL);
        const bestPath = await kuru_sdk_1.PathFinder.findBestPath(provider, // Cast to any to bypass type checking
        tokenInAddress, tokenOutAddress, amountToSwap, amountType, poolFetcher, pools);
        return bestPath;
    }
    catch (error) {
        console.error("Error finding best path:", error);
        throw error;
    }
}
/**
 * Get the price of a token
 * @param agent The MonadAgentKit instance
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param amountToSwap The amount to swap
 * @param amountType The type of amount (amountIn or amountOut)
 * @returns The price information
 */
async function getPrice(agent, tokenInAddress, tokenOutAddress, amountToSwap, amountType = "amountIn") {
    try {
        const poolFetcher = new kuru_sdk_1.PoolFetcher(constants_1.KURU_CONFIG.KURU_API_URL);
        // Get all pools
        const pools = await getAllPools(tokenInAddress, tokenOutAddress, poolFetcher);
        // Find the best path
        const bestPath = await findBestPath(agent, tokenInAddress, tokenOutAddress, amountToSwap, amountType, poolFetcher, pools);
        return {
            bestPath,
            output: bestPath.output,
            priceImpact: bestPath.priceImpact,
            route: bestPath.route
        };
    }
    catch (error) {
        console.error("Error getting price:", error);
        throw error;
    }
}
/**
 * Swap tokens on Kuru DEX
 * @param agent The MonadAgentKit instance
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param amountToSwap The amount to swap
 * @param inTokenDecimals The decimals of the input token
 * @param outTokenDecimals The decimals of the output token
 * @param slippageTolerance The slippage tolerance (default: 0.5%)
 * @param approveTokens Whether to approve tokens before swapping
 * @returns The transaction receipt
 */
async function swap(agent, tokenInAddress, tokenOutAddress, amountToSwap, inTokenDecimals, outTokenDecimals, slippageTolerance = 0.5, approveTokens = true) {
    try {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.MONAD_RPC_URL);
        const signer = new ethers_1.ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
        const poolFetcher = new kuru_sdk_1.PoolFetcher(constants_1.KURU_CONFIG.KURU_API_URL);
        // Get all pools
        const pools = await getAllPools(tokenInAddress, tokenOutAddress, poolFetcher);
        // Find the best path
        const bestPath = await findBestPath(agent, tokenInAddress, tokenOutAddress, amountToSwap, "amountIn", poolFetcher, pools);
        // Execute the swap
        const receipt = await kuru_sdk_1.TokenSwap.swap(signer, // Cast to any to bypass type checking
        constants_1.KURU_CONFIG.SWAP_ADDRESS, bestPath, amountToSwap, inTokenDecimals, outTokenDecimals, slippageTolerance, approveTokens, (txHash) => {
            console.log(`Transaction hash: ${txHash}`);
        });
        return receipt;
    }
    catch (error) {
        console.error("Error swapping tokens:", error);
        throw error;
    }
}
/**
 * Kuru tools
 */
exports.kuruTools = {
    getAllPools,
    findBestPath,
    getPrice,
    swap
};

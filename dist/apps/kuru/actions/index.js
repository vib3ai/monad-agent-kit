"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KURU_ACTIONS = void 0;
exports.getPrice = getPrice;
exports.swap = swap;
exports.getPriceInMON = getPriceInMON;
exports.swapForMON = swapForMON;
exports.swapMONFor = swapMONFor;
const tools_1 = require("../tools");
const constants_1 = require("../constants");
/**
 * Get the price of a token swap
 * @param agent The MonadAgentKit instance
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param amountToSwap The amount to swap
 * @param amountType The type of amount (amountIn or amountOut)
 * @returns The price information
 */
async function getPrice(agent, tokenInAddress, tokenOutAddress, amountToSwap, amountType = "amountIn") {
    return await tools_1.kuruTools.getPrice(agent, tokenInAddress, tokenOutAddress, amountToSwap, amountType);
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
    return await tools_1.kuruTools.swap(agent, tokenInAddress, tokenOutAddress, amountToSwap, inTokenDecimals, outTokenDecimals, slippageTolerance, approveTokens);
}
/**
 * Get the price of a token swap in MON
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the token
 * @param amountToSwap The amount to swap
 * @param amountType The type of amount (amountIn or amountOut)
 * @returns The price information
 */
async function getPriceInMON(agent, tokenAddress, amountToSwap, amountType = "amountIn") {
    return await getPrice(agent, amountType === "amountIn" ? tokenAddress : constants_1.KURU_TOKEN_ADDRESSES.NATIVE, amountType === "amountIn" ? constants_1.KURU_TOKEN_ADDRESSES.NATIVE : tokenAddress, amountToSwap, amountType);
}
/**
 * Swap tokens for MON
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the token
 * @param amountToSwap The amount to swap
 * @param tokenDecimals The decimals of the token
 * @param slippageTolerance The slippage tolerance (default: 0.5%)
 * @param approveTokens Whether to approve tokens before swapping
 * @returns The transaction receipt
 */
async function swapForMON(agent, tokenAddress, amountToSwap, tokenDecimals, slippageTolerance = 0.5, approveTokens = true) {
    return await swap(agent, tokenAddress, constants_1.KURU_TOKEN_ADDRESSES.NATIVE, amountToSwap, tokenDecimals, 18, // MON has 18 decimals
    slippageTolerance, approveTokens);
}
/**
 * Swap MON for tokens
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the token
 * @param amountToSwap The amount of MON to swap
 * @param tokenDecimals The decimals of the token
 * @param slippageTolerance The slippage tolerance (default: 0.5%)
 * @returns The transaction receipt
 */
async function swapMONFor(agent, tokenAddress, amountToSwap, tokenDecimals, slippageTolerance = 0.5) {
    return await swap(agent, constants_1.KURU_TOKEN_ADDRESSES.NATIVE, tokenAddress, amountToSwap, 18, // MON has 18 decimals
    tokenDecimals, slippageTolerance, false // No need to approve native token
    );
}
/**
 * Kuru actions
 */
exports.KURU_ACTIONS = {
    getPrice,
    getPriceInMON,
    swap,
    swapForMON,
    swapMONFor
};

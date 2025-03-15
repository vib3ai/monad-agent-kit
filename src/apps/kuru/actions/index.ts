import { MonadAgentKit } from "../../../agent";
import { kuruTools } from "../tools";
import { KURU_TOKEN_ADDRESSES } from "../constants";

/**
 * Get the price of a token swap
 * @param agent The MonadAgentKit instance
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param amountToSwap The amount to swap
 * @param amountType The type of amount (amountIn or amountOut)
 * @returns The price information
 */
export async function getPrice(
    agent: MonadAgentKit,
    tokenInAddress: string,
    tokenOutAddress: string,
    amountToSwap: number,
    amountType: "amountIn" | "amountOut" = "amountIn"
) {
    return await kuruTools.getPrice(
        agent,
        tokenInAddress,
        tokenOutAddress,
        amountToSwap,
        amountType
    );
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
export async function swap(
    agent: MonadAgentKit,
    tokenInAddress: string,
    tokenOutAddress: string,
    amountToSwap: number,
    inTokenDecimals: number,
    outTokenDecimals: number,
    slippageTolerance: number = 0.5,
    approveTokens: boolean = true
) {
    return await kuruTools.swap(
        agent,
        tokenInAddress,
        tokenOutAddress,
        amountToSwap,
        inTokenDecimals,
        outTokenDecimals,
        slippageTolerance,
        approveTokens
    );
}

/**
 * Get the price of a token swap in MON
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the token
 * @param amountToSwap The amount to swap
 * @param amountType The type of amount (amountIn or amountOut)
 * @returns The price information
 */
export async function getPriceInMON(
    agent: MonadAgentKit,
    tokenAddress: string,
    amountToSwap: number,
    amountType: "amountIn" | "amountOut" = "amountIn"
) {
    return await getPrice(
        agent,
        amountType === "amountIn" ? tokenAddress : KURU_TOKEN_ADDRESSES.NATIVE,
        amountType === "amountIn" ? KURU_TOKEN_ADDRESSES.NATIVE : tokenAddress,
        amountToSwap,
        amountType
    );
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
export async function swapForMON(
    agent: MonadAgentKit,
    tokenAddress: string,
    amountToSwap: number,
    tokenDecimals: number,
    slippageTolerance: number = 0.5,
    approveTokens: boolean = true
) {
    return await swap(
        agent,
        tokenAddress,
        KURU_TOKEN_ADDRESSES.NATIVE,
        amountToSwap,
        tokenDecimals,
        18, // MON has 18 decimals
        slippageTolerance,
        approveTokens
    );
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
export async function swapMONFor(
    agent: MonadAgentKit,
    tokenAddress: string,
    amountToSwap: number,
    tokenDecimals: number,
    slippageTolerance: number = 0.5
) {
    return await swap(
        agent,
        KURU_TOKEN_ADDRESSES.NATIVE,
        tokenAddress,
        amountToSwap,
        18, // MON has 18 decimals
        tokenDecimals,
        slippageTolerance,
        false // No need to approve native token
    );
}

/**
 * Kuru actions
 */
export const KURU_ACTIONS = {
    getPrice,
    getPriceInMON,
    swap,
    swapForMON,
    swapMONFor
}; 
import { MonadAgentKit } from "../../../agent";
/**
 * Get the price of a token swap
 * @param agent The MonadAgentKit instance
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param amountToSwap The amount to swap
 * @param amountType The type of amount (amountIn or amountOut)
 * @returns The price information
 */
export declare function getPrice(agent: MonadAgentKit, tokenInAddress: string, tokenOutAddress: string, amountToSwap: number, amountType?: "amountIn" | "amountOut"): Promise<{
    bestPath: import("@kuru-labs/kuru-sdk").RouteOutput;
    output: number;
    priceImpact: number;
    route: import("@kuru-labs/kuru-sdk").Route;
}>;
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
export declare function swap(agent: MonadAgentKit, tokenInAddress: string, tokenOutAddress: string, amountToSwap: number, inTokenDecimals: number, outTokenDecimals: number, slippageTolerance?: number, approveTokens?: boolean): Promise<import("ethers").ContractReceipt>;
/**
 * Get the price of a token swap in MON
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the token
 * @param amountToSwap The amount to swap
 * @param amountType The type of amount (amountIn or amountOut)
 * @returns The price information
 */
export declare function getPriceInMON(agent: MonadAgentKit, tokenAddress: string, amountToSwap: number, amountType?: "amountIn" | "amountOut"): Promise<{
    bestPath: import("@kuru-labs/kuru-sdk").RouteOutput;
    output: number;
    priceImpact: number;
    route: import("@kuru-labs/kuru-sdk").Route;
}>;
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
export declare function swapForMON(agent: MonadAgentKit, tokenAddress: string, amountToSwap: number, tokenDecimals: number, slippageTolerance?: number, approveTokens?: boolean): Promise<import("ethers").ContractReceipt>;
/**
 * Swap MON for tokens
 * @param agent The MonadAgentKit instance
 * @param tokenAddress The address of the token
 * @param amountToSwap The amount of MON to swap
 * @param tokenDecimals The decimals of the token
 * @param slippageTolerance The slippage tolerance (default: 0.5%)
 * @returns The transaction receipt
 */
export declare function swapMONFor(agent: MonadAgentKit, tokenAddress: string, amountToSwap: number, tokenDecimals: number, slippageTolerance?: number): Promise<import("ethers").ContractReceipt>;
/**
 * Kuru actions
 */
export declare const KURU_ACTIONS: {
    getPrice: typeof getPrice;
    getPriceInMON: typeof getPriceInMON;
    swap: typeof swap;
    swapForMON: typeof swapForMON;
    swapMONFor: typeof swapMONFor;
};

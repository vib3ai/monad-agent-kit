import { PoolFetcher } from "@kuru-labs/kuru-sdk";
import { MonadAgentKit } from "../../../agent";
import { ethers } from "ethers";
/**
 * Get all pools from Kuru DEX
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param poolFetcher The pool fetcher instance
 * @returns The pools
 */
export declare function getAllPools(tokenInAddress: string, tokenOutAddress: string, poolFetcher: PoolFetcher): Promise<import("@kuru-labs/kuru-sdk").Pool[]>;
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
export declare function findBestPath(agent: MonadAgentKit, tokenInAddress: string, tokenOutAddress: string, amountToSwap: number, amountType: "amountIn" | "amountOut", poolFetcher: PoolFetcher, pools: any[]): Promise<import("@kuru-labs/kuru-sdk").RouteOutput>;
/**
 * Get the price of a token
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
export declare function swap(agent: MonadAgentKit, tokenInAddress: string, tokenOutAddress: string, amountToSwap: number, inTokenDecimals: number, outTokenDecimals: number, slippageTolerance?: number, approveTokens?: boolean): Promise<ethers.ContractReceipt>;
/**
 * Kuru tools
 */
export declare const kuruTools: {
    getAllPools: typeof getAllPools;
    findBestPath: typeof findBestPath;
    getPrice: typeof getPrice;
    swap: typeof swap;
};

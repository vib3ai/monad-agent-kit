import { PoolFetcher, PathFinder, TokenSwap } from "@kuru-labs/kuru-sdk";
import { MonadAgentKit } from "../../../agent";
import { KURU_CONFIG, KURU_BASE_TOKENS } from "../constants";
import { parseUnits } from "viem";
import { ethers } from "ethers";

/**
 * Get all pools from Kuru DEX
 * @param tokenInAddress The address of the input token
 * @param tokenOutAddress The address of the output token
 * @param poolFetcher The pool fetcher instance
 * @returns The pools
 */
export async function getAllPools(
    tokenInAddress: string,
    tokenOutAddress: string,
    poolFetcher: PoolFetcher
) {
    try {
        // Convert the readonly array to a regular array
        const baseTokens = [...KURU_BASE_TOKENS];
        const pools = await poolFetcher.getAllPools(
            tokenInAddress,
            tokenOutAddress,
            baseTokens
        );
        return pools;
    } catch (error) {
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
export async function findBestPath(
    agent: MonadAgentKit,
    tokenInAddress: string,
    tokenOutAddress: string,
    amountToSwap: number,
    amountType: "amountIn" | "amountOut",
    poolFetcher: PoolFetcher,
    pools: any[]
) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.MONAD_RPC_URL);

        const bestPath = await PathFinder.findBestPath(
            provider as any, // Cast to any to bypass type checking
            tokenInAddress,
            tokenOutAddress,
            amountToSwap,
            amountType,
            poolFetcher,
            pools
        );
        return bestPath;
    } catch (error) {
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
export async function getPrice(
    agent: MonadAgentKit,
    tokenInAddress: string,
    tokenOutAddress: string,
    amountToSwap: number,
    amountType: "amountIn" | "amountOut" = "amountIn"
) {
    try {
        const poolFetcher = new PoolFetcher(KURU_CONFIG.KURU_API_URL);

        // Get all pools
        const pools = await getAllPools(tokenInAddress, tokenOutAddress, poolFetcher);

        // Find the best path
        const bestPath = await findBestPath(
            agent,
            tokenInAddress,
            tokenOutAddress,
            amountToSwap,
            amountType,
            poolFetcher,
            pools
        );

        return {
            bestPath,
            output: bestPath.output,
            priceImpact: bestPath.priceImpact,
            route: bestPath.route
        };
    } catch (error) {
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
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.MONAD_RPC_URL);
        const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY as string, provider);
        const poolFetcher = new PoolFetcher(KURU_CONFIG.KURU_API_URL);

        // Get all pools
        const pools = await getAllPools(tokenInAddress, tokenOutAddress, poolFetcher);

        // Find the best path
        const bestPath = await findBestPath(
            agent,
            tokenInAddress,
            tokenOutAddress,
            amountToSwap,
            "amountIn",
            poolFetcher,
            pools
        );

        // Execute the swap
        const receipt = await TokenSwap.swap(
            signer as any, // Cast to any to bypass type checking
            KURU_CONFIG.SWAP_ADDRESS,
            bestPath,
            amountToSwap,
            inTokenDecimals,
            outTokenDecimals,
            slippageTolerance,
            approveTokens,
            (txHash: string | null) => {
                console.log(`Transaction hash: ${txHash}`);
            }
        );

        return receipt;
    } catch (error) {
        console.error("Error swapping tokens:", error);
        throw error;
    }
}

/**
 * Kuru tools
 */
export const kuruTools = {
    getAllPools,
    findBestPath,
    getPrice,
    swap
}; 
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
import { KURU_ACTIONS } from "../actions";
import { KURU_TOKEN_ADDRESSES } from "../constants";

/**
 * Create Kuru tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export function createKuruTools(agent: MonadAgentKit) {
    const getPriceTool = new DynamicStructuredTool({
        name: "kuru_get_price",
        description: "Get the price of a token swap on Kuru DEX",
        schema: z.object({
            tokenInAddress: z.string().describe("The address of the input token"),
            tokenOutAddress: z.string().describe("The address of the output token"),
            amountToSwap: z.number().describe("The amount to swap"),
            amountType: z.enum(["amountIn", "amountOut"]).optional().describe("The type of amount (amountIn or amountOut)")
        }),
        func: async ({ tokenInAddress, tokenOutAddress, amountToSwap, amountType }) => {
            try {
                const result = await KURU_ACTIONS.getPrice(
                    agent,
                    tokenInAddress,
                    tokenOutAddress,
                    amountToSwap,
                    amountType || "amountIn"
                );
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error getting price: ${error.message}`;
            }
        }
    });

    const getPriceInMONTool = new DynamicStructuredTool({
        name: "kuru_get_price_in_mon",
        description: "Get the price of a token in MON on Kuru DEX",
        schema: z.object({
            tokenAddress: z.string().describe("The address of the token"),
            amountToSwap: z.number().describe("The amount to swap"),
            amountType: z.enum(["amountIn", "amountOut"]).optional().describe("The type of amount (amountIn or amountOut)")
        }),
        func: async ({ tokenAddress, amountToSwap, amountType }) => {
            try {
                const result = await KURU_ACTIONS.getPriceInMON(
                    agent,
                    tokenAddress,
                    amountToSwap,
                    amountType || "amountIn"
                );
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error getting price in MON: ${error.message}`;
            }
        }
    });

    // Add a specific tool for getting CHOG price
    const getChogPriceTool = new DynamicStructuredTool({
        name: "kuru_get_chog_price",
        description: "Get the price of CHOG token in MON on Kuru DEX",
        schema: z.object({
            amountToSwap: z.number().describe("The amount to swap"),
            amountType: z.enum(["amountIn", "amountOut"]).optional().describe("The type of amount (amountIn or amountOut)")
        }),
        func: async ({ amountToSwap, amountType }) => {
            try {
                // Use the constants directly to avoid any address issues
                const result = await KURU_ACTIONS.getPrice(
                    agent,
                    KURU_TOKEN_ADDRESSES.NATIVE, // MON
                    KURU_TOKEN_ADDRESSES.CHOG,   // CHOG
                    amountToSwap,
                    amountType || "amountIn"
                );
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error getting CHOG price: ${error.message}`;
            }
        }
    });

    const swapTool = new DynamicStructuredTool({
        name: "kuru_swap",
        description: "Swap tokens on Kuru DEX",
        schema: z.object({
            tokenInAddress: z.string().describe("The address of the input token"),
            tokenOutAddress: z.string().describe("The address of the output token"),
            amountToSwap: z.number().describe("The amount to swap"),
            inTokenDecimals: z.number().describe("The decimals of the input token"),
            outTokenDecimals: z.number().describe("The decimals of the output token"),
            slippageTolerance: z.number().optional().describe("The slippage tolerance (default: 0.5%)"),
            approveTokens: z.boolean().optional().describe("Whether to approve tokens before swapping")
        }),
        func: async ({ tokenInAddress, tokenOutAddress, amountToSwap, inTokenDecimals, outTokenDecimals, slippageTolerance, approveTokens }) => {
            try {
                const result = await KURU_ACTIONS.swap(
                    agent,
                    tokenInAddress,
                    tokenOutAddress,
                    amountToSwap,
                    inTokenDecimals,
                    outTokenDecimals,
                    slippageTolerance,
                    approveTokens
                );
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error swapping tokens: ${error.message}`;
            }
        }
    });

    const swapForMONTool = new DynamicStructuredTool({
        name: "kuru_swap_for_mon",
        description: "Swap tokens for MON on Kuru DEX",
        schema: z.object({
            tokenAddress: z.string().describe("The address of the token"),
            amountToSwap: z.number().describe("The amount to swap"),
            tokenDecimals: z.number().describe("The decimals of the token"),
            slippageTolerance: z.number().optional().describe("The slippage tolerance (default: 0.5%)"),
            approveTokens: z.boolean().optional().describe("Whether to approve tokens before swapping")
        }),
        func: async ({ tokenAddress, amountToSwap, tokenDecimals, slippageTolerance, approveTokens }) => {
            try {
                const result = await KURU_ACTIONS.swapForMON(
                    agent,
                    tokenAddress,
                    amountToSwap,
                    tokenDecimals,
                    slippageTolerance,
                    approveTokens
                );
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error swapping tokens for MON: ${error.message}`;
            }
        }
    });

    const swapMONForTool = new DynamicStructuredTool({
        name: "kuru_swap_mon_for",
        description: "Swap MON for tokens on Kuru DEX",
        schema: z.object({
            tokenAddress: z.string().describe("The address of the token"),
            amountToSwap: z.number().describe("The amount of MON to swap"),
            tokenDecimals: z.number().describe("The decimals of the token"),
            slippageTolerance: z.number().optional().describe("The slippage tolerance (default: 0.5%)")
        }),
        func: async ({ tokenAddress, amountToSwap, tokenDecimals, slippageTolerance }) => {
            try {
                const result = await KURU_ACTIONS.swapMONFor(
                    agent,
                    tokenAddress,
                    amountToSwap,
                    tokenDecimals,
                    slippageTolerance
                );
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error swapping MON for tokens: ${error.message}`;
            }
        }
    });

    // Add a tool to get token addresses
    const getTokenAddressesTool = new DynamicStructuredTool({
        name: "kuru_get_token_addresses",
        description: "Get the addresses of tokens supported by Kuru DEX",
        schema: z.object({}),
        func: async () => {
            return JSON.stringify({
                MON: KURU_TOKEN_ADDRESSES.NATIVE,
                CHOG: KURU_TOKEN_ADDRESSES.CHOG,
            }, null, 2);
        }
    });

    return [
        getPriceTool,
        getPriceInMONTool,
        getChogPriceTool,
        swapTool,
        swapForMONTool,
        swapMONForTool,
        getTokenAddressesTool
    ];
} 
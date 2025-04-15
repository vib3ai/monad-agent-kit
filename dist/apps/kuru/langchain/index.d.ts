import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
/**
 * Create Kuru tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export declare function createKuruTools(agent: MonadAgentKit): (DynamicStructuredTool<z.ZodObject<{
    tokenInAddress: z.ZodString;
    tokenOutAddress: z.ZodString;
    amountToSwap: z.ZodNumber;
    amountType: z.ZodOptional<z.ZodEnum<["amountIn", "amountOut"]>>;
}, "strip", z.ZodTypeAny, {
    tokenInAddress: string;
    tokenOutAddress: string;
    amountToSwap: number;
    amountType?: "amountIn" | "amountOut" | undefined;
}, {
    tokenInAddress: string;
    tokenOutAddress: string;
    amountToSwap: number;
    amountType?: "amountIn" | "amountOut" | undefined;
}>> | DynamicStructuredTool<z.ZodObject<{
    tokenAddress: z.ZodString;
    amountToSwap: z.ZodNumber;
    amountType: z.ZodOptional<z.ZodEnum<["amountIn", "amountOut"]>>;
}, "strip", z.ZodTypeAny, {
    amountToSwap: number;
    tokenAddress: string;
    amountType?: "amountIn" | "amountOut" | undefined;
}, {
    amountToSwap: number;
    tokenAddress: string;
    amountType?: "amountIn" | "amountOut" | undefined;
}>> | DynamicStructuredTool<z.ZodObject<{
    amountToSwap: z.ZodNumber;
    amountType: z.ZodOptional<z.ZodEnum<["amountIn", "amountOut"]>>;
}, "strip", z.ZodTypeAny, {
    amountToSwap: number;
    amountType?: "amountIn" | "amountOut" | undefined;
}, {
    amountToSwap: number;
    amountType?: "amountIn" | "amountOut" | undefined;
}>> | DynamicStructuredTool<z.ZodObject<{
    tokenInAddress: z.ZodString;
    tokenOutAddress: z.ZodString;
    amountToSwap: z.ZodNumber;
    inTokenDecimals: z.ZodNumber;
    outTokenDecimals: z.ZodNumber;
    slippageTolerance: z.ZodOptional<z.ZodNumber>;
    approveTokens: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    tokenInAddress: string;
    tokenOutAddress: string;
    amountToSwap: number;
    inTokenDecimals: number;
    outTokenDecimals: number;
    slippageTolerance?: number | undefined;
    approveTokens?: boolean | undefined;
}, {
    tokenInAddress: string;
    tokenOutAddress: string;
    amountToSwap: number;
    inTokenDecimals: number;
    outTokenDecimals: number;
    slippageTolerance?: number | undefined;
    approveTokens?: boolean | undefined;
}>> | DynamicStructuredTool<z.ZodObject<{
    tokenAddress: z.ZodString;
    amountToSwap: z.ZodNumber;
    tokenDecimals: z.ZodNumber;
    slippageTolerance: z.ZodOptional<z.ZodNumber>;
    approveTokens: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    amountToSwap: number;
    tokenAddress: string;
    tokenDecimals: number;
    slippageTolerance?: number | undefined;
    approveTokens?: boolean | undefined;
}, {
    amountToSwap: number;
    tokenAddress: string;
    tokenDecimals: number;
    slippageTolerance?: number | undefined;
    approveTokens?: boolean | undefined;
}>> | DynamicStructuredTool<z.ZodObject<{
    tokenAddress: z.ZodString;
    amountToSwap: z.ZodNumber;
    tokenDecimals: z.ZodNumber;
    slippageTolerance: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    amountToSwap: number;
    tokenAddress: string;
    tokenDecimals: number;
    slippageTolerance?: number | undefined;
}, {
    amountToSwap: number;
    tokenAddress: string;
    tokenDecimals: number;
    slippageTolerance?: number | undefined;
}>> | DynamicStructuredTool<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>)[];

import { MonadAgentKit } from '../agent';
/**
 * Create all LangChain tools for all supported dapps
 * @param monadKit - The MonadAgentKit instance
 * @returns An array of LangChain tools
 */
export declare function createAllTools(monadKit: MonadAgentKit): (import("./native/langchain/balance").NativeBalanceTool | import("./native/langchain/transfer").NativeTransferTool | import("./nadfun/langchain").NadfunCreateCurveWithMetadataTool | import("./erc20/langchain").ERC20BalanceTool | import("./erc20/langchain").ERC20TransferTool | import("./erc20/langchain").ERC20ApproveTool | import("./erc20/langchain").ERC20AllowanceTool | import("./erc20/langchain").ERC20InfoTool | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    tokenInAddress: import("zod").ZodString;
    tokenOutAddress: import("zod").ZodString;
    amountToSwap: import("zod").ZodNumber;
    amountType: import("zod").ZodOptional<import("zod").ZodEnum<["amountIn", "amountOut"]>>;
}, "strip", import("zod").ZodTypeAny, {
    tokenInAddress: string;
    tokenOutAddress: string;
    amountToSwap: number;
    amountType?: "amountIn" | "amountOut" | undefined;
}, {
    tokenInAddress: string;
    tokenOutAddress: string;
    amountToSwap: number;
    amountType?: "amountIn" | "amountOut" | undefined;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    tokenAddress: import("zod").ZodString;
    amountToSwap: import("zod").ZodNumber;
    amountType: import("zod").ZodOptional<import("zod").ZodEnum<["amountIn", "amountOut"]>>;
}, "strip", import("zod").ZodTypeAny, {
    amountToSwap: number;
    tokenAddress: string;
    amountType?: "amountIn" | "amountOut" | undefined;
}, {
    amountToSwap: number;
    tokenAddress: string;
    amountType?: "amountIn" | "amountOut" | undefined;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    amountToSwap: import("zod").ZodNumber;
    amountType: import("zod").ZodOptional<import("zod").ZodEnum<["amountIn", "amountOut"]>>;
}, "strip", import("zod").ZodTypeAny, {
    amountToSwap: number;
    amountType?: "amountIn" | "amountOut" | undefined;
}, {
    amountToSwap: number;
    amountType?: "amountIn" | "amountOut" | undefined;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    tokenInAddress: import("zod").ZodString;
    tokenOutAddress: import("zod").ZodString;
    amountToSwap: import("zod").ZodNumber;
    inTokenDecimals: import("zod").ZodNumber;
    outTokenDecimals: import("zod").ZodNumber;
    slippageTolerance: import("zod").ZodOptional<import("zod").ZodNumber>;
    approveTokens: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
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
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    tokenAddress: import("zod").ZodString;
    amountToSwap: import("zod").ZodNumber;
    tokenDecimals: import("zod").ZodNumber;
    slippageTolerance: import("zod").ZodOptional<import("zod").ZodNumber>;
    approveTokens: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
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
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    tokenAddress: import("zod").ZodString;
    amountToSwap: import("zod").ZodNumber;
    tokenDecimals: import("zod").ZodNumber;
    slippageTolerance: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    amountToSwap: number;
    tokenAddress: string;
    tokenDecimals: number;
    slippageTolerance?: number | undefined;
}, {
    amountToSwap: number;
    tokenAddress: string;
    tokenDecimals: number;
    slippageTolerance?: number | undefined;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    amount: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny, {
    amount: number;
}, {
    amount: number;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    shares: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny, {
    shares: number;
}, {
    shares: number;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    name: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
}, {
    name: string;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    address: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    address: string;
}, {
    address: string;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    name: import("zod").ZodString;
    key: import("zod").ZodString;
    value: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
    key: string;
    value: string;
}, {
    name: string;
    key: string;
    value: string;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    name: import("zod").ZodString;
    duration: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
    duration?: number | undefined;
}, {
    name: string;
    duration?: number | undefined;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    name: import("zod").ZodString;
    tld: import("zod").ZodOptional<import("zod").ZodString>;
    duration: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
    duration?: number | undefined;
    tld?: string | undefined;
}, {
    name: string;
    duration?: number | undefined;
    tld?: string | undefined;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    amount: import("zod").ZodString;
    receiver: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    amount: string;
    receiver?: string | undefined;
}, {
    amount: string;
    receiver?: string | undefined;
}>> | import("langchain/tools").DynamicStructuredTool<import("zod").ZodObject<{
    amount: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny, {
    amount: string;
}, {
    amount: string;
}>>)[];

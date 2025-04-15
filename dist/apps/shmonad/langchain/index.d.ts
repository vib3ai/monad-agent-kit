import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
/**
 * Create Shmonad tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export declare function createShmonadTools(agent: MonadAgentKit): (DynamicStructuredTool<z.ZodObject<{
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
}, {
    amount: number;
}>> | DynamicStructuredTool<z.ZodObject<{
    shares: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    shares: number;
}, {
    shares: number;
}>>)[];

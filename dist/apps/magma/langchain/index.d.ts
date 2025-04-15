import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
/**
 * Create Magma tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export declare function createMagmaTools(agent: MonadAgentKit): DynamicStructuredTool<z.ZodObject<{
    amount: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: string;
}, {
    amount: string;
}>>[];

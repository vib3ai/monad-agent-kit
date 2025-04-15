import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
/**
 * Create Apriori tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export declare function createAprioriTools(agent: MonadAgentKit): DynamicStructuredTool<z.ZodObject<{
    amount: z.ZodString;
    receiver: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: string;
    receiver?: string | undefined;
}, {
    amount: string;
    receiver?: string | undefined;
}>>[];

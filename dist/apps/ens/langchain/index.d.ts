import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
/**
 * Create ENS tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export declare function createENSTools(agent: MonadAgentKit): (DynamicStructuredTool<z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>> | DynamicStructuredTool<z.ZodObject<{
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: string;
}, {
    address: string;
}>> | DynamicStructuredTool<z.ZodObject<{
    name: z.ZodString;
    key: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    key: string;
    value: string;
}, {
    name: string;
    key: string;
    value: string;
}>> | DynamicStructuredTool<z.ZodObject<{
    name: z.ZodString;
    duration: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    duration?: number | undefined;
}, {
    name: string;
    duration?: number | undefined;
}>> | DynamicStructuredTool<z.ZodObject<{
    name: z.ZodString;
    tld: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    duration?: number | undefined;
    tld?: string | undefined;
}, {
    name: string;
    duration?: number | undefined;
    tld?: string | undefined;
}>>)[];

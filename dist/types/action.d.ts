import { z } from 'zod';
import { MonadAgentKit } from '../agent';
/**
 * Example object for actions
 */
export interface Example {
    input: Record<string, any>;
    output: Record<string, any>;
    explanation: string;
}
/**
 * Action interface for MonadAgentKit
 */
export interface Action {
    name: string;
    similes: string[];
    description: string;
    examples: Array<Array<Example>>;
    schema: z.ZodSchema;
    handler: (agent: MonadAgentKit, input: Record<string, any>) => Promise<Record<string, any>>;
}

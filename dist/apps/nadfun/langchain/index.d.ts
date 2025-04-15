import { Tool } from 'langchain/tools';
import { MonadAgentKit } from '../../../agent';
/**
 * LangChain tool for creating a new token with a bonding curve on the nadfun protocol with metadata
 */
export declare class NadfunCreateCurveWithMetadataTool extends Tool {
    name: string;
    description: string;
    private agent;
    constructor(agent: MonadAgentKit);
    _call(args: string): Promise<string>;
}
/**
 * Create all LangChain tools for the nadfun protocol
 * @param monadKit - The MonadAgentKit instance
 * @returns An array of LangChain tools for the nadfun protocol
 */
export declare function createNadfunTools(monadKit: MonadAgentKit): NadfunCreateCurveWithMetadataTool[];

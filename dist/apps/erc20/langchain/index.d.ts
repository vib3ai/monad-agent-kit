import { Tool } from 'langchain/tools';
import { MonadAgentKit } from '../../../agent';
/**
 * LangChain tool for getting the balance of an ERC20 token
 */
export declare class ERC20BalanceTool extends Tool {
    name: string;
    description: string;
    private agent;
    constructor(agent: MonadAgentKit);
    _call(args: string): Promise<string>;
}
/**
 * LangChain tool for transferring ERC20 tokens
 */
export declare class ERC20TransferTool extends Tool {
    name: string;
    description: string;
    private agent;
    constructor(agent: MonadAgentKit);
    _call(args: string): Promise<string>;
}
/**
 * LangChain tool for approving ERC20 token spending
 */
export declare class ERC20ApproveTool extends Tool {
    name: string;
    description: string;
    private agent;
    constructor(agent: MonadAgentKit);
    _call(args: string): Promise<string>;
}
/**
 * LangChain tool for getting ERC20 token allowance
 */
export declare class ERC20AllowanceTool extends Tool {
    name: string;
    description: string;
    private agent;
    constructor(agent: MonadAgentKit);
    _call(args: string): Promise<string>;
}
/**
 * LangChain tool for getting ERC20 token information
 */
export declare class ERC20InfoTool extends Tool {
    name: string;
    description: string;
    private agent;
    constructor(agent: MonadAgentKit);
    _call(args: string): Promise<string>;
}
/**
 * Create all LangChain tools for ERC20 interactions
 * @param agent - The MonadAgentKit instance
 * @returns An array of LangChain tools for ERC20 interactions
 */
export declare function createERC20Tools(agent: MonadAgentKit): (ERC20BalanceTool | ERC20TransferTool | ERC20ApproveTool | ERC20AllowanceTool | ERC20InfoTool)[];

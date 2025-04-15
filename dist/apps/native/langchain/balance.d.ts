import { Tool } from 'langchain/tools';
import { MonadAgentKit } from '../../../agent';
export declare class NativeBalanceTool extends Tool {
    private monadKit;
    name: string;
    description: string;
    constructor(monadKit: MonadAgentKit);
    protected _call(input: string): Promise<string>;
}

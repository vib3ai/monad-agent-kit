import { NativeBalanceTool } from './balance';
import { NativeTransferTool } from './transfer';
import { MonadAgentKit } from '../../../agent';

export function createNativeTools(monadKit: MonadAgentKit) {
    return [
        new NativeBalanceTool(monadKit),
        new NativeTransferTool(monadKit),
    ];
} 
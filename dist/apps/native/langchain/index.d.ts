import { NativeBalanceTool } from './balance';
import { NativeTransferTool } from './transfer';
import { MonadAgentKit } from '../../../agent';
export declare function createNativeTools(monadKit: MonadAgentKit): (NativeBalanceTool | NativeTransferTool)[];

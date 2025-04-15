import { MonadAgentKit } from '../../../agent';
import { TransferResponse } from '../../../types';
/**
 * Transfer native tokens to another address
 * @param agent - The MonadAgentKit instance
 * @param to - The recipient address
 * @param amount - The amount to transfer in ETH
 * @returns The transfer response with status and transaction hash
 */
export declare function transfer(agent: MonadAgentKit, to: string, amount: string): Promise<TransferResponse>;

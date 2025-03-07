import { Tool } from 'langchain/tools';
import { MonadAgentKit } from '../../../agent';
import { transfer } from '../tools';

export class NativeTransferTool extends Tool {
    name = 'native_transfer';
    description = `Transfer native tokens (ETH) to another address.
  
  Inputs (input is a JSON string):
  to: string - The recipient address
  amount: string - The amount to transfer in ETH`;

    constructor(private monadKit: MonadAgentKit) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            const params = JSON.parse(input);

            if (!params.to) {
                throw new Error('Recipient address (to) is required');
            }

            if (!params.amount) {
                throw new Error('Amount is required');
            }

            const result = await transfer(this.monadKit, params.to, params.amount);

            return JSON.stringify(result);
        } catch (error: any) {
            return JSON.stringify({
                status: 'error',
                message: error.message,
                code: error.code || 'UNKNOWN_ERROR',
            });
        }
    }
} 
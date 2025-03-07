import { z } from 'zod';
import type { Action } from '../../../types/action';
import type { MonadAgentKit } from '../../../agent';
import { transfer } from '../tools';

const transferAction: Action = {
    name: 'NATIVE_TRANSFER_ACTION',
    similes: [
        'transfer ETH',
        'send ETH',
        'send ETH',
        'transfer ETH',
    ],
    description: `Transfer native tokens (ETH) to another address.`,
    examples: [
        [
            {
                input: {
                    to: '0x1234567890123456789012345678901234567890',
                    amount: '1.5',
                },
                output: {
                    status: 'success',
                    txHash: '0xabcdef...',
                    from: '0x...',
                    to: '0x1234567890123456789012345678901234567890',
                    amount: '1.5',
                },
                explanation: 'Transfer 1.5 ETH to the specified address',
            },
        ],
    ],
    schema: z.object({
        to: z.string().describe('The recipient address'),
        amount: z.string().describe('The amount to transfer in ETH'),
    }),
    handler: async (agent: MonadAgentKit, input: Record<string, any>) => {
        const { to, amount } = input;
        // The transfer tool now returns a TransferResponse object
        return await transfer(agent, to, amount);
    },
};

export default transferAction; 
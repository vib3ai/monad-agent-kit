import { z } from 'zod';
import type { Action } from '../../../types/action';
import type { MonadAgentKit } from '../../../agent';
import { get_balance } from '../tools';

const balanceAction: Action = {
    name: 'NATIVE_BALANCE_ACTION',
    similes: [
        'check balance',
        'get wallet balance',
        'view balance',
        'show balance',
    ],
    description: `Get the balance of a Monad wallet.
  If you want to get the balance of your wallet, you don't need to provide the address.`,
    examples: [
        [
            {
                input: {},
                output: {
                    status: 'success',
                    balance: '100',
                    address: '0x...',
                },
                explanation: 'Get the balance of the current wallet',
            },
        ],
        [
            {
                input: {
                    address: '0x1234567890123456789012345678901234567890',
                },
                output: {
                    status: 'success',
                    balance: '50',
                    address: '0x1234567890123456789012345678901234567890',
                },
                explanation: 'Get the balance of a specific wallet',
            },
        ],
    ],
    schema: z.object({
        address: z.string().optional(),
    }),
    handler: async (agent: MonadAgentKit, input: Record<string, any>) => {
        const balance = await get_balance(agent, input.address);
        const address = input.address || agent.getWalletAddress();

        return {
            status: 'success',
            balance,
            address,
        };
    },
};

export default balanceAction; 
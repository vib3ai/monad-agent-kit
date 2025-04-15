import { z } from 'zod';
import { MonadAgentKit } from "../../../agent";
import { getBalance as getBalanceTool, transfer } from '../tools';
import { Action } from '../../../types/action';

/**
 * Get the balance of a Monad wallet
 * @param agent The MonadAgentKit instance
 * @param address Optional address to check balance for
 * @returns The balance information
 */
export async function getBalance(
    agent: MonadAgentKit,
    address?: string
) {
    return await getBalanceTool(agent, address);
}

/**
 * Balance action definition for action executor compatibility
 */
export const balanceAction: Action = {
    name: 'getBalance',
    similes: [
        'check balance',
        'get wallet balance',
        'view balance',
        'show balance',
    ],
    description: 'Get the balance of a Monad wallet. If you want to get the balance of your wallet, you don\'t need to provide the address.',
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
        return await getBalanceTool(agent, input.address);
    },
};

/**
 * Transfer native tokens (ETH) to another address
 * @param agent The MonadAgentKit instance
 * @param to The recipient address
 * @param amount The amount to transfer in ETH
 * @returns The transaction details
 */
export async function transferETH(
    agent: MonadAgentKit,
    to: string,
    amount: string
) {
    return await transfer(agent, to, amount);
}

/**
 * Transfer action definition for action executor compatibility
 */
export const transferAction: Action = {
    name: 'transferETH',
    similes: [
        'transfer ETH',
        'send ETH',
        'send money',
        'transfer tokens',
    ],
    description: 'Transfer native tokens (ETH) to another address.',
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
        return await transfer(agent, input.to, input.amount);
    },
};

/**
 * Native actions
 */
export const NATIVE_ACTIONS = {
    getBalance,
    transferETH,
}; 
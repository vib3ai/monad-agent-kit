"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NATIVE_ACTIONS = exports.transferAction = exports.balanceAction = void 0;
exports.getBalance = getBalance;
exports.transferETH = transferETH;
const zod_1 = require("zod");
const tools_1 = require("../tools");
/**
 * Get the balance of a Monad wallet
 * @param agent The MonadAgentKit instance
 * @param address Optional address to check balance for
 * @returns The balance information
 */
async function getBalance(agent, address) {
    return await (0, tools_1.getBalance)(agent, address);
}
/**
 * Balance action definition for action executor compatibility
 */
exports.balanceAction = {
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
    schema: zod_1.z.object({
        address: zod_1.z.string().optional(),
    }),
    handler: async (agent, input) => {
        return await (0, tools_1.getBalance)(agent, input.address);
    },
};
/**
 * Transfer native tokens (ETH) to another address
 * @param agent The MonadAgentKit instance
 * @param to The recipient address
 * @param amount The amount to transfer in ETH
 * @returns The transaction details
 */
async function transferETH(agent, to, amount) {
    return await (0, tools_1.transfer)(agent, to, amount);
}
/**
 * Transfer action definition for action executor compatibility
 */
exports.transferAction = {
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
    schema: zod_1.z.object({
        to: zod_1.z.string().describe('The recipient address'),
        amount: zod_1.z.string().describe('The amount to transfer in ETH'),
    }),
    handler: async (agent, input) => {
        return await (0, tools_1.transfer)(agent, input.to, input.amount);
    },
};
/**
 * Native actions
 */
exports.NATIVE_ACTIONS = {
    getBalance,
    transferETH,
};

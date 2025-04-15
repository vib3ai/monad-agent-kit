"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const tools_1 = require("../tools");
const balanceAction = {
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
    schema: zod_1.z.object({
        address: zod_1.z.string().optional(),
    }),
    handler: async (agent, input) => {
        // The get_balance tool now returns a BalanceResponse object
        return await (0, tools_1.get_balance)(agent, input.address);
    },
};
exports.default = balanceAction;

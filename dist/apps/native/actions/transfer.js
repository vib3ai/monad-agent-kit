"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const tools_1 = require("../tools");
const transferAction = {
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
    schema: zod_1.z.object({
        to: zod_1.z.string().describe('The recipient address'),
        amount: zod_1.z.string().describe('The amount to transfer in ETH'),
    }),
    handler: async (agent, input) => {
        const { to, amount } = input;
        // The transfer tool now returns a TransferResponse object
        return await (0, tools_1.transfer)(agent, to, amount);
    },
};
exports.default = transferAction;

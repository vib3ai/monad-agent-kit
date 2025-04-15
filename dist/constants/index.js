"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_OPTIONS = exports.monad = void 0;
const viem_1 = require("viem");
// Define Monad chain
exports.monad = (0, viem_1.defineChain)({
    id: 10143,
    name: 'Monad',
    nativeCurrency: {
        decimals: 18,
        name: 'Monad',
        symbol: 'MON',
    },
    rpcUrls: {
        default: {
            http: [process.env.MONAD_RPC_URL || 'https://testnet-rpc.monad.xyz/'],
        },
        public: {
            http: ['https://testnet-rpc.monad.xyz/'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Monad Explorer',
            url: 'https://testnet.monadexplorer.com/',
        },
    },
});
// Default options
exports.DEFAULT_OPTIONS = {
    rpcUrl: process.env.MONAD_RPC_URL || 'https://testnet-rpc.monad.xyz/',
};

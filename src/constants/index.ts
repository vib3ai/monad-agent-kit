import { defineChain } from 'viem';

// Define Monad chain
export const monad = defineChain({
    id: 10143,
    name: 'Monad',
    nativeCurrency: {
        decimals: 18,
        name: 'Monad',
        symbol: 'MONAD',
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
export const DEFAULT_OPTIONS = {
    rpcUrl: process.env.MONAD_RPC_URL || 'https://testnet-rpc.monad.xyz/',
}; 
export declare const monad: {
    blockExplorers: {
        readonly default: {
            readonly name: "Monad Explorer";
            readonly url: "https://testnet.monadexplorer.com/";
        };
    };
    contracts?: {
        [x: string]: import("viem").ChainContract | {
            [sourceId: number]: import("viem").ChainContract | undefined;
        } | undefined;
        ensRegistry?: import("viem").ChainContract | undefined;
        ensUniversalResolver?: import("viem").ChainContract | undefined;
        multicall3?: import("viem").ChainContract | undefined;
        universalSignatureVerifier?: import("viem").ChainContract | undefined;
    } | undefined;
    id: 10143;
    name: "Monad";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Monad";
        readonly symbol: "MON";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly [string];
        };
        readonly public: {
            readonly http: readonly ["https://testnet-rpc.monad.xyz/"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
};
export declare const DEFAULT_OPTIONS: {
    rpcUrl: string;
};

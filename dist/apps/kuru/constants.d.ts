/**
 * Kuru DEX configuration
 */
/**
 * API configuration for Kuru DEX
 */
export declare const KURU_CONFIG: {
    /**
     * Kuru API URL
     */
    readonly KURU_API_URL: string;
    /**
     * Router address for Kuru DEX
     */
    readonly ROUTER_ADDRESS: string;
    /**
     * Swap address for Kuru DEX
     */
    readonly SWAP_ADDRESS: string;
};
/**
 * Common token addresses on Monad
 */
export declare const KURU_TOKEN_ADDRESSES: {
    /**
     * Native token (MON)
     */
    readonly NATIVE: "0x0000000000000000000000000000000000000000";
    /**
     * CHOG token
     */
    readonly CHOG: "0xE0590015A873bF326bd645c3E1266d4db41C4E6B";
};
/**
 * Base tokens for pool fetching
 */
export declare const KURU_BASE_TOKENS: readonly [{
    readonly symbol: "MON";
    readonly address: "0x0000000000000000000000000000000000000000";
}, {
    readonly symbol: "CHOG";
    readonly address: "0xE0590015A873bF326bd645c3E1266d4db41C4E6B";
}];

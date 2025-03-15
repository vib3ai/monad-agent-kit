/**
 * Kuru DEX configuration
 */

/**
 * API configuration for Kuru DEX
 */
export const KURU_CONFIG = {
    /**
     * Kuru API URL
     */
    KURU_API_URL: process.env.KURU_API_URL || 'https://api.kuru.io',

    /**
     * Router address for Kuru DEX
     */
    ROUTER_ADDRESS: process.env.KURU_ROUTER_ADDRESS || '0xc4b11B176D4194A0175709cac9fEf9DFD40C005A',

    /**
     * Swap address for Kuru DEX
     */
    SWAP_ADDRESS: process.env.KURU_SWAP_ADDRESS || '0xc816865f172d640d93712C68a7E1F83F3fA63235',
} as const;

/**
 * Common token addresses on Monad
 */
export const KURU_TOKEN_ADDRESSES = {
    /**
     * Native token (MON)
     */
    NATIVE: '0x0000000000000000000000000000000000000000',

    /**
     * CHOG token
     */
    CHOG: '0xE0590015A873bF326bd645c3E1266d4db41C4E6B',

} as const;

/**
 * Base tokens for pool fetching
 */
export const KURU_BASE_TOKENS = [
    {
        symbol: 'MON',
        address: KURU_TOKEN_ADDRESSES.NATIVE
    },
    {
        symbol: 'CHOG',
        address: KURU_TOKEN_ADDRESSES.CHOG
    },
] as const; 
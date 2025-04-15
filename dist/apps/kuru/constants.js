"use strict";
/**
 * Kuru DEX configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KURU_BASE_TOKENS = exports.KURU_TOKEN_ADDRESSES = exports.KURU_CONFIG = void 0;
/**
 * API configuration for Kuru DEX
 */
exports.KURU_CONFIG = {
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
};
/**
 * Common token addresses on Monad
 */
exports.KURU_TOKEN_ADDRESSES = {
    /**
     * Native token (MON)
     */
    NATIVE: '0x0000000000000000000000000000000000000000',
    /**
     * CHOG token
     */
    CHOG: '0xE0590015A873bF326bd645c3E1266d4db41C4E6B',
};
/**
 * Base tokens for pool fetching
 */
exports.KURU_BASE_TOKENS = [
    {
        symbol: 'MON',
        address: exports.KURU_TOKEN_ADDRESSES.NATIVE
    },
    {
        symbol: 'CHOG',
        address: exports.KURU_TOKEN_ADDRESSES.CHOG
    },
];

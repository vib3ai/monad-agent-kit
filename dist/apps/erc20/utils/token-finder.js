"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTokenAddress = findTokenAddress;
exports.getTokenName = getTokenName;
exports.isTokenSupported = isTokenSupported;
exports.getSupportedTokens = getSupportedTokens;
const constants_1 = require("../constants");
/**
 * Find a token address by name or symbol
 * @param nameOrSymbol - The token name or symbol to search for (case insensitive)
 * @returns The token address if found, undefined otherwise
 */
function findTokenAddress(nameOrSymbol) {
    // If input is empty, return undefined
    if (!nameOrSymbol) {
        return undefined;
    }
    // Normalize the input to uppercase for case-insensitive comparison
    // and remove any special characters or extra spaces
    const normalizedInput = nameOrSymbol.toUpperCase().trim()
        .replace(/[^A-Z0-9]/g, ' ') // Replace special chars with spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
    // Check for exact matches with token symbols in constants
    if (normalizedInput === 'USDT' ||
        normalizedInput === 'TETHER' ||
        normalizedInput.includes('USDT') ||
        normalizedInput.includes('TETHER')) {
        return constants_1.ERC20_CONSTANTS.TOKENS.USDT;
    }
    if (normalizedInput === 'USDC' ||
        normalizedInput === 'USD COIN' ||
        normalizedInput.includes('USDC') ||
        normalizedInput.includes('USD COIN')) {
        return constants_1.ERC20_CONSTANTS.TOKENS.USDC;
    }
    // Check if the input is already an address (starts with 0x)
    if (nameOrSymbol.startsWith('0x') && nameOrSymbol.length === 42) {
        return nameOrSymbol;
    }
    // No match found
    return undefined;
}
/**
 * Get a human-readable name for a token address
 * @param address - The token address
 * @returns The token name if known, or the address itself
 */
function getTokenName(address) {
    if (!address) {
        return 'Unknown token';
    }
    // Normalize the address to lowercase for comparison
    const normalizedAddress = address.toLowerCase();
    if (normalizedAddress === constants_1.ERC20_CONSTANTS.TOKENS.USDT.toLowerCase()) {
        return 'USDT (Tether)';
    }
    if (normalizedAddress === constants_1.ERC20_CONSTANTS.TOKENS.USDC.toLowerCase()) {
        return 'USDC (USD Coin)';
    }
    // Return the address if no known name
    return address;
}
/**
 * Check if a token is supported by name, symbol, or address
 * @param nameOrSymbol - The token name, symbol, or address to check
 * @returns True if the token is supported, false otherwise
 */
function isTokenSupported(nameOrSymbol) {
    return !!findTokenAddress(nameOrSymbol);
}
/**
 * Get a list of supported tokens with their addresses
 * @returns An array of supported tokens with their names and addresses
 */
function getSupportedTokens() {
    return [
        { name: 'USDT (Tether)', address: constants_1.ERC20_CONSTANTS.TOKENS.USDT },
        { name: 'USDC (USD Coin)', address: constants_1.ERC20_CONSTANTS.TOKENS.USDC },
    ];
}

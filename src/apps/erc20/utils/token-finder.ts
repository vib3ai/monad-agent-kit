import { ERC20_CONSTANTS } from '../constants';

/**
 * Find a token address by name or symbol
 * @param nameOrSymbol - The token name or symbol to search for (case insensitive)
 * @returns The token address if found, undefined otherwise
 */
export function findTokenAddress(nameOrSymbol: string): string | undefined {
    // If input is empty, return undefined
    if (!nameOrSymbol) {
        return undefined;
    }

    // Normalize the input to uppercase for case-insensitive comparison
    // and remove any special characters or extra spaces
    const normalizedInput = nameOrSymbol.toUpperCase().trim()
        .replace(/[^A-Z0-9]/g, ' ')  // Replace special chars with spaces
        .replace(/\s+/g, ' ')        // Replace multiple spaces with single space
        .trim();

    // Check for exact matches with token symbols in constants
    if (normalizedInput === 'USDT' ||
        normalizedInput === 'TETHER' ||
        normalizedInput.includes('USDT') ||
        normalizedInput.includes('TETHER')) {
        return ERC20_CONSTANTS.TOKENS.USDT;
    }

    if (normalizedInput === 'USDC' ||
        normalizedInput === 'USD COIN' ||
        normalizedInput.includes('USDC') ||
        normalizedInput.includes('USD COIN')) {
        return ERC20_CONSTANTS.TOKENS.USDC;
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
export function getTokenName(address: string): string {
    if (!address) {
        return 'Unknown token';
    }

    // Normalize the address to lowercase for comparison
    const normalizedAddress = address.toLowerCase();

    if (normalizedAddress === ERC20_CONSTANTS.TOKENS.USDT.toLowerCase()) {
        return 'USDT (Tether)';
    }

    if (normalizedAddress === ERC20_CONSTANTS.TOKENS.USDC.toLowerCase()) {
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
export function isTokenSupported(nameOrSymbol: string): boolean {
    return !!findTokenAddress(nameOrSymbol);
}

/**
 * Get a list of supported tokens with their addresses
 * @returns An array of supported tokens with their names and addresses
 */
export function getSupportedTokens(): Array<{ name: string, address: string }> {
    return [
        { name: 'USDT (Tether)', address: ERC20_CONSTANTS.TOKENS.USDT },
        { name: 'USDC (USD Coin)', address: ERC20_CONSTANTS.TOKENS.USDC },
    ];
} 
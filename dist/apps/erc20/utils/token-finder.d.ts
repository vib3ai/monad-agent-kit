/**
 * Find a token address by name or symbol
 * @param nameOrSymbol - The token name or symbol to search for (case insensitive)
 * @returns The token address if found, undefined otherwise
 */
export declare function findTokenAddress(nameOrSymbol: string): string | undefined;
/**
 * Get a human-readable name for a token address
 * @param address - The token address
 * @returns The token name if known, or the address itself
 */
export declare function getTokenName(address: string): string;
/**
 * Check if a token is supported by name, symbol, or address
 * @param nameOrSymbol - The token name, symbol, or address to check
 * @returns True if the token is supported, false otherwise
 */
export declare function isTokenSupported(nameOrSymbol: string): boolean;
/**
 * Get a list of supported tokens with their addresses
 * @returns An array of supported tokens with their names and addresses
 */
export declare function getSupportedTokens(): Array<{
    name: string;
    address: string;
}>;

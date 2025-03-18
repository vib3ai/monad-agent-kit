import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Utility function to load an ABI from a JSON file
 * @param abiFileName The name of the ABI file in the abi directory
 * @returns The parsed ABI
 */
export function loadAbiFromFile(abiFileName: string): any {
    try {
        // Construct the path to the ABI file
        // The path is relative to this file (utils/abi.ts)
        // So we need to go up two levels to get to the ens directory
        const abiPath = join(__dirname, '..', 'abi', abiFileName);

        // Read and parse the ABI file
        const abiJSON = readFileSync(abiPath, 'utf-8');
        return JSON.parse(abiJSON);
    } catch (error) {
        console.error(`Failed to load ABI from ${abiFileName}:`, error);
        throw new Error(`Failed to load ABI from ${abiFileName}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// Load and export the registry ABI
export const REGISTRY_ABI = loadAbiFromFile('registry.json');

// Load and export the price oracle ABI
export const PRICE_ORACLE_ABI = loadAbiFromFile('price.json'); 
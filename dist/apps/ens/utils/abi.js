"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICE_ORACLE_ABI = exports.REGISTRY_ABI = void 0;
exports.loadAbiFromFile = loadAbiFromFile;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Utility function to load an ABI from a JSON file
 * @param abiFileName The name of the ABI file in the abi directory
 * @returns The parsed ABI
 */
function loadAbiFromFile(abiFileName) {
    try {
        // Construct the path to the ABI file
        // The path is relative to this file (utils/abi.ts)
        // So we need to go up two levels to get to the ens directory
        const abiPath = (0, path_1.join)(__dirname, '..', 'abi', abiFileName);
        // Read and parse the ABI file
        const abiJSON = (0, fs_1.readFileSync)(abiPath, 'utf-8');
        return JSON.parse(abiJSON);
    }
    catch (error) {
        console.error(`Failed to load ABI from ${abiFileName}:`, error);
        throw new Error(`Failed to load ABI from ${abiFileName}: ${error instanceof Error ? error.message : String(error)}`);
    }
}
// Load and export the registry ABI
exports.REGISTRY_ABI = loadAbiFromFile('registry.json');
// Load and export the price oracle ABI
exports.PRICE_ORACLE_ABI = loadAbiFromFile('price.json');

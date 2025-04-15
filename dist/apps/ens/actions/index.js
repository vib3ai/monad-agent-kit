"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENS_ACTIONS = void 0;
exports.getProfile = getProfile;
exports.resolveAddress = resolveAddress;
exports.getPrimaryName = getPrimaryName;
exports.getNamesForAddress = getNamesForAddress;
exports.getAvatarUrl = getAvatarUrl;
exports.setNameAttribute = setNameAttribute;
exports.registerDomain = registerDomain;
exports.getDomainPrice = getDomainPrice;
const tools_1 = require("../tools");
/**
 * Get the profile for a name
 * @param agent The MonadAgentKit instance
 * @param name The name to get the profile for
 * @returns The profile data
 */
async function getProfile(agent, name) {
    try {
        const result = await tools_1.ensTools.getProfile(agent, name);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Resolve a name to an address
 * @param agent The MonadAgentKit instance
 * @param name The name to resolve
 * @returns The resolved address
 */
async function resolveAddress(agent, name) {
    try {
        const result = await tools_1.ensTools.resolveAddress(agent, name);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get the primary name for an address
 * @param agent The MonadAgentKit instance
 * @param address The address to get the primary name for
 * @returns The primary name
 */
async function getPrimaryName(agent, address) {
    try {
        const result = await tools_1.ensTools.getPrimaryName(agent, address);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get all names owned by an address
 * @param agent The MonadAgentKit instance
 * @param address The address to get names for
 * @returns Array of names owned by the address
 */
async function getNamesForAddress(agent, address) {
    try {
        const result = await tools_1.ensTools.getNamesForAddress(agent, address);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get avatar URL for a name
 * @param agent The MonadAgentKit instance
 * @param name The name to get the avatar for
 * @returns The avatar URL
 */
async function getAvatarUrl(agent, name) {
    try {
        const result = await tools_1.ensTools.getAvatarUrl(agent, name);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Set a name attribute
 * @param agent The MonadAgentKit instance
 * @param name The name to set the attribute for
 * @param key The attribute key
 * @param value The attribute value
 * @returns Transaction hash
 */
async function setNameAttribute(agent, name, key, value) {
    try {
        const result = await tools_1.ensTools.setNameAttribute(agent, name, key, value);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Register/buy an ENS domain
 * @param agent The MonadAgentKit instance
 * @param name The domain name to register (without TLD)
 * @param tld The top-level domain (e.g., 'nad')
 * @param duration Registration duration in days
 * @returns Transaction hash and registration details
 */
async function registerDomain(agent, name, tld = 'nad', duration = 365) {
    try {
        const result = await tools_1.ensTools.registerDomain(agent, name, tld, duration);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Get the price for registering a domain
 * @param agent The MonadAgentKit instance
 * @param name The domain name (without TLD)
 * @param duration Registration duration in days
 * @returns Object with success flag and price info
 */
async function getDomainPrice(agent, name, duration = 365) {
    try {
        const result = await tools_1.ensTools.getDomainPrice(agent, name, duration);
        return result;
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
            price: BigInt(0)
        };
    }
}
/**
 * Export ENS actions
 */
exports.ENS_ACTIONS = {
    getProfile,
    resolveAddress,
    getPrimaryName,
    getNamesForAddress,
    getAvatarUrl,
    setNameAttribute,
    registerDomain,
    getDomainPrice
};

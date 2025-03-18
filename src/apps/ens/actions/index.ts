import { MonadAgentKit } from "../../../agent";
import { ensTools } from "../tools";

/**
 * Get the profile for a name
 * @param agent The MonadAgentKit instance
 * @param name The name to get the profile for
 * @returns The profile data
 */
export async function getProfile(
    agent: MonadAgentKit,
    name: string
) {
    try {
        const result = await ensTools.getProfile(agent, name);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Resolve a name to an address
 * @param agent The MonadAgentKit instance
 * @param name The name to resolve
 * @returns The resolved address
 */
export async function resolveAddress(
    agent: MonadAgentKit,
    name: string
) {
    try {
        const result = await ensTools.resolveAddress(agent, name);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Get the primary name for an address
 * @param agent The MonadAgentKit instance
 * @param address The address to get the primary name for
 * @returns The primary name
 */
export async function getPrimaryName(
    agent: MonadAgentKit,
    address: `0x${string}`
) {
    try {
        const result = await ensTools.getPrimaryName(agent, address);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Get all names owned by an address
 * @param agent The MonadAgentKit instance
 * @param address The address to get names for
 * @returns Array of names owned by the address
 */
export async function getNamesForAddress(
    agent: MonadAgentKit,
    address: `0x${string}`
) {
    try {
        const result = await ensTools.getNamesForAddress(agent, address);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Get avatar URL for a name
 * @param agent The MonadAgentKit instance
 * @param name The name to get the avatar for
 * @returns The avatar URL
 */
export async function getAvatarUrl(
    agent: MonadAgentKit,
    name: string
) {
    try {
        const result = await ensTools.getAvatarUrl(agent, name);
        return result;
    } catch (error) {
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
export async function setNameAttribute(
    agent: MonadAgentKit,
    name: string,
    key: string,
    value: string
) {
    try {
        const result = await ensTools.setNameAttribute(agent, name, key, value);
        return result;
    } catch (error) {
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
export async function registerDomain(
    agent: MonadAgentKit,
    name: string,
    tld: string = 'nad',
    duration: number = 365
) {
    try {
        const result = await ensTools.registerDomain(agent, name, tld, duration);
        return result;
    } catch (error) {
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
export async function getDomainPrice(
    agent: MonadAgentKit,
    name: string,
    duration: number = 365
) {
    try {
        const result = await ensTools.getDomainPrice(agent, name, duration);
        return result;
    } catch (error) {
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
export const ENS_ACTIONS = {
    getProfile,
    resolveAddress,
    getPrimaryName,
    getNamesForAddress,
    getAvatarUrl,
    setNameAttribute,
    registerDomain,
    getDomainPrice
}; 
import { MonadAgentKit } from '../../../agent';
/**
 * Get the profile for a name
 * @param agent The MonadAgentKit instance
 * @param name The name to get the profile for
 * @returns The profile data
 */
export declare function getProfile(agent: MonadAgentKit, name: string): Promise<{
    profile: import("@nadnameservice/nns-viem-sdk/lib/NNS").Profile;
    name: string;
}>;
/**
 * Resolve a name to an address
 * @param agent The MonadAgentKit instance
 * @param name The name to resolve
 * @returns The resolved address
 */
export declare function resolveAddress(agent: MonadAgentKit, name: string): Promise<{
    address: `0x${string}`;
    name: string;
}>;
/**
 * Get the primary name for an address
 * @param agent The MonadAgentKit instance
 * @param address The address to get the primary name for
 * @returns The primary name
 */
export declare function getPrimaryName(agent: MonadAgentKit, address: `0x${string}`): Promise<{
    primaryName: string;
    address: `0x${string}`;
}>;
/**
 * Get all names owned by an address
 * @param agent The MonadAgentKit instance
 * @param address The address to get names for
 * @returns Array of names owned by the address
 */
export declare function getNamesForAddress(agent: MonadAgentKit, address: `0x${string}`): Promise<{
    names: string[];
    address: `0x${string}`;
}>;
/**
 * Get avatar URL for a name
 * @param agent The MonadAgentKit instance
 * @param name The name to get the avatar for
 * @returns The avatar URL
 */
export declare function getAvatarUrl(agent: MonadAgentKit, name: string): Promise<{
    avatarUrl: string;
    name: string;
}>;
/**
 * Set a name attribute (requires wallet)
 * @param agent The MonadAgentKit instance
 * @param name The name to set the attribute for
 * @param key The attribute key
 * @param value The attribute value
 * @returns Transaction hash
 */
export declare function setNameAttribute(agent: MonadAgentKit, name: string, key: string, value: string): Promise<{
    transactionHash: `0x${string}`;
    status: string;
    message: string;
    name: string;
    key: string;
    value: string;
}>;
/**
 * Get domain price information
 * @param agent The MonadAgentKit instance
 * @param name The domain name (without TLD)
 * @param duration Registration duration in days
 * @returns The domain price and discount information
 */
export declare function getDomainPrice(agent: MonadAgentKit, name: string, duration?: number): Promise<{
    success: boolean;
    price: bigint;
    basePrice: bigint;
    premiumPrice: bigint;
    discountInfo: unknown;
    error?: undefined;
} | {
    success: boolean;
    price: bigint;
    discountInfo: null;
    error: string;
    basePrice?: undefined;
    premiumPrice?: undefined;
} | {
    success: boolean;
    error: string;
    price: bigint;
    basePrice?: undefined;
    premiumPrice?: undefined;
    discountInfo?: undefined;
}>;
/**
 * Register/buy an ENS domain (requires wallet)
 * @param agent The MonadAgentKit instance
 * @param name The domain name to register (without TLD)
 * @param tld The top-level domain (e.g., 'nad')
 * @param duration Registration duration in days
 * @returns Transaction hash and registration details
 */
export declare function registerDomain(agent: MonadAgentKit, name: string, tld?: string, duration?: number): Promise<{
    transactionHash: `0x${string}`;
    status: string;
    message: string;
    domainName: string;
    duration: number;
    price: string;
    registrantAddress: string;
}>;
/**
 * Export all ENS tools
 */
export declare const ensTools: {
    getProfile: typeof getProfile;
    resolveAddress: typeof resolveAddress;
    getPrimaryName: typeof getPrimaryName;
    getNamesForAddress: typeof getNamesForAddress;
    getAvatarUrl: typeof getAvatarUrl;
    setNameAttribute: typeof setNameAttribute;
    registerDomain: typeof registerDomain;
    getDomainPrice: typeof getDomainPrice;
};

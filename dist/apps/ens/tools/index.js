"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensTools = void 0;
exports.getProfile = getProfile;
exports.resolveAddress = resolveAddress;
exports.getPrimaryName = getPrimaryName;
exports.getNamesForAddress = getNamesForAddress;
exports.getAvatarUrl = getAvatarUrl;
exports.setNameAttribute = setNameAttribute;
exports.getDomainPrice = getDomainPrice;
exports.registerDomain = registerDomain;
const nns_viem_sdk_1 = require("@nadnameservice/nns-viem-sdk");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const viem_1 = require("viem");
/**
 * Get the profile for a name
 * @param agent The MonadAgentKit instance
 * @param name The name to get the profile for
 * @returns The profile data
 */
async function getProfile(agent, name) {
    try {
        const nns = new nns_viem_sdk_1.NNS(agent.publicClient);
        const formattedName = name;
        const profile = await nns.getProfile(formattedName);
        return {
            profile,
            name
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to get profile for ${name}: ${errorMessage}`);
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
        const nns = new nns_viem_sdk_1.NNS(agent.publicClient);
        const formattedName = name;
        const address = await nns.getResolvedAddress(formattedName);
        return {
            address,
            name
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to resolve address for ${name}: ${errorMessage}`);
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
        const nns = new nns_viem_sdk_1.NNS(agent.publicClient);
        const primaryName = await nns.getPrimaryNameForAddress(address);
        return {
            primaryName,
            address
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to get primary name for ${address}: ${errorMessage}`);
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
        const nns = new nns_viem_sdk_1.NNS(agent.publicClient);
        const names = await nns.getNamesOfAddress(address);
        return {
            names,
            address
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to get names for ${address}: ${errorMessage}`);
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
        const nns = new nns_viem_sdk_1.NNS(agent.publicClient);
        const formattedName = name;
        const avatarUrl = await nns.getAvatarUrl(formattedName);
        return {
            avatarUrl,
            name
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to get avatar URL for ${name}: ${errorMessage}`);
    }
}
/**
 * Set a name attribute (requires wallet)
 * @param agent The MonadAgentKit instance
 * @param name The name to set the attribute for
 * @param key The attribute key
 * @param value The attribute value
 * @returns Transaction hash
 */
async function setNameAttribute(agent, name, key, value) {
    try {
        const nns = new nns_viem_sdk_1.NNS(agent.publicClient);
        const formattedName = name;
        const hash = await nns.setNameAttribute(formattedName, key, value);
        // Return transaction hash without waiting for confirmation
        return {
            transactionHash: hash,
            status: 'pending',
            message: 'Transaction submitted successfully. The attribute update is now pending on the blockchain.',
            name,
            key,
            value
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to set attribute for ${name}: ${errorMessage}`);
    }
}
/**
 * Get domain price information
 * @param agent The MonadAgentKit instance
 * @param name The domain name (without TLD)
 * @param duration Registration duration in days
 * @returns The domain price and discount information
 */
async function getDomainPrice(agent, name, duration = 365) {
    try {
        // Call the price oracle contract to get the price
        try {
            const priceData = await agent.publicClient.readContract({
                address: constants_1.ENS_CONTRACTS.PRICE_ORACLE,
                abi: utils_1.PRICE_ORACLE_ABI,
                functionName: 'getRegisteringPrice',
                args: [name]
            });
            // The price oracle returns a tuple with base and premium prices
            const basePrice = priceData.base;
            const premiumPrice = priceData.premium;
            const totalPrice = basePrice + premiumPrice;
            // Get discount information if available
            let discountInfo = null;
            try {
                // Attempt to get discount information from the controller
                const result = await agent.publicClient.readContract({
                    address: constants_1.ENS_CONTRACTS.REGISTRY_CONTROLLER,
                    abi: utils_1.REGISTRY_ABI,
                    functionName: 'getActiveDiscounts',
                    args: []
                });
                discountInfo = result;
            }
            catch (discountError) {
                // Silently handle discount errors
            }
            return {
                success: true,
                price: totalPrice,
                basePrice,
                premiumPrice,
                discountInfo
            };
        }
        catch (priceError) {
            // Fallback to default price
            return {
                success: true,
                price: (0, viem_1.parseEther)('0.05'), // Default price
                discountInfo: null,
                error: `Could not get price information: ${priceError instanceof Error ? priceError.message : String(priceError)}`
            };
        }
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error),
            price: (0, viem_1.parseEther)('0.05') // Default price as fallback
        };
    }
}
/**
 * Register/buy an ENS domain (requires wallet)
 * @param agent The MonadAgentKit instance
 * @param name The domain name to register (without TLD)
 * @param tld The top-level domain (e.g., 'nad')
 * @param duration Registration duration in days
 * @returns Transaction hash and registration details
 */
async function registerDomain(agent, name, tld = 'nad', duration = 365) {
    try {
        const domainName = `${name}.${tld}`;
        // Get the chain ID from the agent's connection
        const chainId = await agent.publicClient.getChainId();
        // Get the price from the price oracle
        const priceInfo = await getDomainPrice(agent, name, duration);
        if (!priceInfo.success) {
            throw new Error(`Failed to get price information: ${priceInfo.error}`);
        }
        const price = priceInfo.price;
        // Request signature from the NAD Domains API
        const apiUrl = new URL('https://api.nad.domains/register/signature');
        apiUrl.searchParams.append('name', name);
        apiUrl.searchParams.append('nameOwner', agent.getWalletAddress());
        apiUrl.searchParams.append('setAsPrimaryName', 'true');
        apiUrl.searchParams.append('referrer', '0x0000000000000000000000000000000000000000');
        apiUrl.searchParams.append('discountKey', '0x0000000000000000000000000000000000000000000000000000000000000000');
        apiUrl.searchParams.append('discountClaimProof', '0x0000000000000000000000000000000000000000000000000000000000000000');
        apiUrl.searchParams.append('chainId', chainId.toString());
        // Fetch the signature data
        const response = await fetch(apiUrl.toString(), {
            method: 'GET',
            headers: {
                'accept': 'application/json, text/plain, */*',
            }
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        const signatureData = await response.json();
        if (!signatureData.success) {
            throw new Error(`API request unsuccessful: ${signatureData.message}`);
        }
        // Extract the signature and other required data
        const { signature, nonce, deadline } = signatureData;
        // Prepare the registration data structure with the API-provided nonce and deadline
        const registerData = {
            name: name,
            nameOwner: agent.getWalletAddress(),
            setAsPrimaryName: true,
            referrer: '0x0000000000000000000000000000000000000000',
            discountKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
            discountClaimProof: '0x0000000000000000000000000000000000000000000000000000000000000000',
            nonce: BigInt(nonce),
            deadline: BigInt(deadline)
        };
        // Directly send the contract transaction with the signature
        const txHash = await agent.walletClient.writeContract({
            address: constants_1.ENS_CONTRACTS.REGISTRY_CONTROLLER,
            abi: utils_1.REGISTRY_ABI,
            functionName: 'registerWithSignature',
            args: [
                registerData,
                // Ensure the signature is properly formatted
                `0x${signature.replace(/^0x/, '')}`
            ],
            value: price, // Use actual price from price oracle
        });
        // Return transaction hash without waiting for confirmation
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The domain registration is now pending on the blockchain.',
            domainName,
            duration,
            price: price.toString(),
            registrantAddress: agent.getWalletAddress()
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to register domain ${name}.${tld}: ${errorMessage}`);
    }
}
/**
 * Export all ENS tools
 */
exports.ensTools = {
    getProfile,
    resolveAddress,
    getPrimaryName,
    getNamesForAddress,
    getAvatarUrl,
    setNameAttribute,
    registerDomain,
    getDomainPrice,
};

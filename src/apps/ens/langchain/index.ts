import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { MonadAgentKit } from "../../../agent";
import { ENS_ACTIONS } from "../actions";

/**
 * Create ENS tools for LangChain
 * @param agent The MonadAgentKit instance
 * @returns The LangChain tools
 */
export function createENSTools(agent: MonadAgentKit) {
    // Resolve Name Tool
    const resolveNameTool = new DynamicStructuredTool({
        name: "ens_resolve_name",
        description: "Resolve a Monad Name Service (MNS) name to an Ethereum address.",
        schema: z.object({
            name: z.string().describe("The name to resolve (e.g., 'vitalik.nad')")
        }),
        func: async ({ name }) => {
            try {
                const result = await ENS_ACTIONS.resolveAddress(agent, name);
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error resolving name: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    // Lookup Address Tool
    const lookupAddressTool = new DynamicStructuredTool({
        name: "ens_lookup_address",
        description: "Find the primary MNS name for an Ethereum address.",
        schema: z.object({
            address: z.string().describe("The Ethereum address to look up")
        }),
        func: async ({ address }) => {
            try {
                // Convert the address to the expected format
                const formattedAddress = address as `0x${string}`;
                const result = await ENS_ACTIONS.getPrimaryName(agent, formattedAddress);
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error looking up address: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    // Get Profile Tool
    const getProfileTool = new DynamicStructuredTool({
        name: "ens_get_profile",
        description: "Get the profile information for a MNS name.",
        schema: z.object({
            name: z.string().describe("The name to get profile information for")
        }),
        func: async ({ name }) => {
            try {
                const result = await ENS_ACTIONS.getProfile(agent, name);
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error getting profile: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    // Get Avatar Tool
    const getAvatarTool = new DynamicStructuredTool({
        name: "ens_get_avatar",
        description: "Get the avatar URL for a MNS name.",
        schema: z.object({
            name: z.string().describe("The name to get the avatar for")
        }),
        func: async ({ name }) => {
            try {
                const result = await ENS_ACTIONS.getAvatarUrl(agent, name);
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error getting avatar: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    // Get Names for Address Tool
    const getNamesForAddressTool = new DynamicStructuredTool({
        name: "ens_get_names",
        description: "Get all MNS names owned by an address.",
        schema: z.object({
            address: z.string().describe("The Ethereum address to get names for")
        }),
        func: async ({ address }) => {
            try {
                // Convert the address to the expected format
                const formattedAddress = address as `0x${string}`;
                const result = await ENS_ACTIONS.getNamesForAddress(agent, formattedAddress);
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error getting names: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    // Set Name Attribute Tool
    const setNameAttributeTool = new DynamicStructuredTool({
        name: "ens_set_attribute",
        description: "Set an attribute for a MNS name. Requires that you own the name.",
        schema: z.object({
            name: z.string().describe("The name to set the attribute for"),
            key: z.string().describe("The attribute key to set"),
            value: z.string().describe("The attribute value to set")
        }),
        func: async ({ name, key, value }) => {
            try {
                const result = await ENS_ACTIONS.setNameAttribute(agent, name, key, value);
                return JSON.stringify(result, null, 2);
            } catch (error: any) {
                return `Error setting attribute: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    // Get Domain Price Tool
    const getDomainPriceTool = new DynamicStructuredTool({
        name: "ens_get_price",
        description: "Check the price for registering a new Monad Name Service (MNS) domain.",
        schema: z.object({
            name: z.string().describe("The domain name to check (without TLD)"),
            duration: z.number().optional().describe("Registration duration in days. Default is 365 days")
        }),
        func: async ({ name, duration = 365 }) => {
            try {
                const result = await ENS_ACTIONS.getDomainPrice(agent, name, duration);

                if (result.success) {
                    const priceInEth = Number(result.price) / 1e18;
                    let response = `The price to register ${name}.nad for ${duration} days is ${priceInEth} MON.`;

                    if (result.basePrice) {
                        const basePriceInEth = Number(result.basePrice) / 1e18;
                        response += `\nBase price: ${basePriceInEth} MON`;
                    }

                    if (result.premiumPrice && result.premiumPrice > 0n) {
                        const premiumPriceInEth = Number(result.premiumPrice) / 1e18;
                        response += `\nPremium: ${premiumPriceInEth} MON`;
                    }

                    response += `\n\nTo register this domain, use 'register ${name}.nad'`;
                    return response;
                } else {
                    return `Error getting domain price: ${result.error}`;
                }
            } catch (error: any) {
                return `Error getting domain price: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    // Register Domain Tool
    const registerDomainTool = new DynamicStructuredTool({
        name: "ens_register_domain",
        description: "Register a new Monad Name Service (MNS) domain. Requires payment in MON tokens.",
        schema: z.object({
            name: z.string().describe("The domain name to register (without TLD)"),
            tld: z.string().optional().describe("The top-level domain (e.g., 'nad'). Default is 'nad'"),
            duration: z.number().optional().describe("Registration duration in days. Default is 365 days")
        }),
        func: async ({ name, tld = 'nad', duration = 365 }) => {
            try {
                // Get the price for the domain
                const priceResult = await ENS_ACTIONS.getDomainPrice(agent, name, duration);
                if (!priceResult.success) {
                    return `Error getting domain price: ${priceResult.error}`;
                }

                const priceInEth = Number(priceResult.price) / 1e18;

                // Register the domain
                const result = await ENS_ACTIONS.registerDomain(agent, name, tld, duration);

                return `Domain registration for ${name}.${tld} has been submitted to the blockchain!\n\nTransaction Hash: ${result.transactionHash}\nStatus: ${result.status}\nPrice: ${priceInEth} MON\nDuration: ${duration} days\n\nYou can view the transaction on the Monad Explorer: https://testnet.monadexplorer.com/tx/${result.transactionHash}\n\nAfter the transaction is confirmed, you can manage your domain at https://app.nad.domains/`;
            } catch (error: any) {
                return `Error registering domain: ${error.message}. DO NOT retry automatically - please report this error to the user.`;
            }
        }
    });

    return [
        resolveNameTool,
        lookupAddressTool,
        getProfileTool,
        getAvatarTool,
        getNamesForAddressTool,
        setNameAttributeTool,
        getDomainPriceTool,
        registerDomainTool
    ];
} 
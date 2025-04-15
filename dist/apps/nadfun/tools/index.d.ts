import { MonadAgentKit } from '../../../agent';
/**
 * Creates a new curve token with metadata using the nadfun protocol
 * @param agent - The MonadAgentKit instance
 * @param creator - The address of the creator (defaults to the wallet address)
 * @param name - The name of the token
 * @param symbol - The symbol of the token
 * @param description - The description of the token
 * @param imageBuffer - The image buffer
 * @param imageType - The MIME type of the image (e.g., 'image/jpeg', 'image/png')
 * @param amountIn - The amount of ETH to invest in ETH (e.g., "0.5"). Minimum required amount is 0.5 ETH.
 * @param homePage - Optional home page URL
 * @param twitter - Optional Twitter URL
 * @param telegram - Optional Telegram URL
 * @returns The transaction result with curve address, token address, and other details
 */
export declare function createCurveWithMetadata(agent: MonadAgentKit, creator: string | undefined, name: string, symbol: string, description: string, imageBuffer: Buffer, imageType: string, amountIn: string, homePage?: string, twitter?: string, telegram?: string): Promise<{
    status: 'success' | 'error';
    txHash?: string;
    message?: string;
    code?: string;
}>;
export declare const nadfunTools: {
    createCurveWithMetadata: typeof createCurveWithMetadata;
};

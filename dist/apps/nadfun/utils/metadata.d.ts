/**
 * Interface for token metadata
 */
export interface TokenMetadata {
    name: string;
    symbol: string;
    image_uri: string;
    description: string;
    home_page?: string;
    twitter?: string;
    telegram?: string;
}
/**
 * Prepares and uploads token metadata with an image
 * @param name - The token name
 * @param symbol - The token symbol
 * @param description - The token description
 * @param imageBuffer - The image buffer
 * @param imageType - The MIME type of the image
 * @param homePage - Optional home page URL
 * @param twitter - Optional Twitter URL
 * @param telegram - Optional Telegram URL
 * @returns The URL of the uploaded metadata
 */
export declare function prepareTokenMetadata(name: string, symbol: string, description: string, imageBuffer: Buffer, imageType?: string, homePage?: string, twitter?: string, telegram?: string): Promise<string>;

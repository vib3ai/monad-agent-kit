/**
 * Prepares token metadata and uploads it to IPFS or another storage service
 * @param name - The name of the token
 * @param symbol - The symbol of the token
 * @param description - The description of the token
 * @param imageBuffer - The image buffer
 * @param imageType - The MIME type of the image
 * @param homePage - Optional home page URL
 * @param twitter - Optional Twitter URL
 * @param telegram - Optional Telegram URL
 * @returns The URL of the uploaded metadata
 */
export declare function prepareTokenMetadata(name: string, symbol: string, description: string, imageBuffer: Buffer, imageType: string, homePage?: string, twitter?: string, telegram?: string): Promise<string>;

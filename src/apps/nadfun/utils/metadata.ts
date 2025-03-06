import { NADFUN_API } from '../constants';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the image upload response
 */
interface ImageUploadResponse {
    success: boolean;
    url: string;
    fileUrl: string;
}

/**
 * Interface for the metadata upload response
 */
interface MetadataUploadResponse {
    success: boolean;
    url: string;
    fileUrl: string;
}

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
 * Default headers for API requests
 */
const DEFAULT_HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'Referer': NADFUN_API.REFERER,
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};

/**
 * Uploads an image to the nadfun storage service
 * @param imageBuffer - The image buffer to upload
 * @param fileType - The MIME type of the image (e.g., 'image/jpeg', 'image/png')
 * @returns The URL of the uploaded image
 */
async function uploadImage(
    imageBuffer: Buffer,
    fileType: string = 'image/jpeg'
): Promise<string> {
    try {
        // Generate a unique filename
        const extension = fileType.split('/')[1];
        const uuid = uuidv4();
        const fileName = `${uuid}-image.${extension}`;
        const fileSize = imageBuffer.length;

        // Get the upload URL
        const uploadUrlResponse = await fetch(NADFUN_API.GET_IMAGE_UPLOAD_URL, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({
                fileName,
                fileType,
                fileSize
            })
        });

        if (!uploadUrlResponse.ok) {
            throw new Error(`Failed to get upload URL: ${uploadUrlResponse.statusText}`);
        }

        const uploadUrlData = await uploadUrlResponse.json() as ImageUploadResponse;

        if (!uploadUrlData.success) {
            throw new Error('Failed to get upload URL');
        }

        // Create a FormData object for the multipart/form-data request
        const formData = new FormData();
        formData.append('file', new Blob([imageBuffer], { type: fileType }), fileName);
        formData.append('fileName', fileName);

        // Upload the image to the provided URL
        const uploadResponse = await fetch(uploadUrlData.url, {
            method: 'POST',
            body: formData,
            headers: {
                'Referer': NADFUN_API.REFERER
            }
        });

        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
        }

        // Return the file URL
        return uploadUrlData.fileUrl;
    } catch (error: any) {
        console.error('Error uploading image:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}

/**
 * Uploads token metadata to the nadfun storage service
 * @param metadata - The token metadata
 * @returns The URL of the uploaded metadata
 */
async function uploadMetadata(metadata: TokenMetadata): Promise<string> {
    try {
        // Generate a unique filename for the metadata
        const uuid = uuidv4();
        const fileName = `metadata-${uuid}.json`;
        const metadataString = JSON.stringify(metadata);

        // Get the metadata upload URL
        const uploadUrlResponse = await fetch(NADFUN_API.GET_METADATA_UPLOAD_URL, {
            method: 'POST',
            headers: {
                ...DEFAULT_HEADERS,
                'Referer': 'https://testnet.nad.fun/',
            },
            body: JSON.stringify({
                fileName,
                metadata
            })
        });

        if (!uploadUrlResponse.ok) {
            throw new Error(`Failed to get metadata upload URL: ${uploadUrlResponse.statusText}`);
        }

        const uploadUrlData = await uploadUrlResponse.json() as MetadataUploadResponse;

        if (!uploadUrlData.success) {
            throw new Error('Failed to get metadata upload URL');
        }

        // Create a FormData object for the multipart/form-data request
        const formData = new FormData();
        formData.append('file', new Blob([metadataString], { type: 'application/json' }), fileName);
        formData.append('fileName', fileName);

        // Upload the metadata to the provided URL
        const uploadResponse = await fetch(uploadUrlData.url, {
            method: 'POST',
            body: formData,
            headers: {
                'Referer': NADFUN_API.REFERER
            }
        });

        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload metadata: ${uploadResponse.statusText}`);
        }

        // Return the file URL
        return uploadUrlData.fileUrl;
    } catch (error: any) {
        console.error('Error uploading metadata:', error);
        throw new Error(`Failed to upload metadata: ${error.message}`);
    }
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
export async function prepareTokenMetadata(
    name: string,
    symbol: string,
    description: string,
    imageBuffer: Buffer,
    imageType: string = 'image/jpeg',
    homePage?: string,
    twitter?: string,
    telegram?: string
): Promise<string> {
    // Upload the image first
    const imageUrl = await uploadImage(imageBuffer, imageType);

    // Prepare the metadata
    const metadata: TokenMetadata = {
        name,
        symbol,
        image_uri: imageUrl,
        description,
    };

    // Add optional fields if provided
    if (homePage) metadata.home_page = homePage;
    if (twitter) metadata.twitter = twitter;
    if (telegram) metadata.telegram = telegram;

    // Upload the metadata
    return await uploadMetadata(metadata);
} 
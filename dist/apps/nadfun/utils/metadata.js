"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTokenMetadata = prepareTokenMetadata;
const constants_1 = require("../constants");
const uuid_1 = require("uuid");
/**
 * Default headers for API requests
 */
const DEFAULT_HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'Referer': constants_1.NADFUN_API.REFERER,
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};
/**
 * Uploads an image to the nadfun storage service
 * @param imageBuffer - The image buffer to upload
 * @param fileType - The MIME type of the image (e.g., 'image/jpeg', 'image/png')
 * @returns The URL of the uploaded image
 */
async function uploadImage(imageBuffer, fileType = 'image/jpeg') {
    try {
        // Generate a unique filename
        const extension = fileType.split('/')[1];
        const uuid = (0, uuid_1.v4)();
        const fileName = `${uuid}-image.${extension}`;
        const fileSize = imageBuffer.length;
        // Get the upload URL
        const uploadUrlResponse = await fetch(constants_1.NADFUN_API.GET_IMAGE_UPLOAD_URL, {
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
        const uploadUrlData = await uploadUrlResponse.json();
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
                'Referer': constants_1.NADFUN_API.REFERER
            }
        });
        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
        }
        // Return the file URL
        return uploadUrlData.fileUrl;
    }
    catch (error) {
        console.error('Error uploading image:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}
/**
 * Uploads token metadata to the nadfun storage service
 * @param metadata - The token metadata
 * @returns The URL of the uploaded metadata
 */
async function uploadMetadata(metadata) {
    try {
        // Generate a unique filename for the metadata
        const uuid = (0, uuid_1.v4)();
        const fileName = `metadata-${uuid}.json`;
        const metadataString = JSON.stringify(metadata);
        // Get the metadata upload URL
        const uploadUrlResponse = await fetch(constants_1.NADFUN_API.GET_METADATA_UPLOAD_URL, {
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
        const uploadUrlData = await uploadUrlResponse.json();
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
                'Referer': constants_1.NADFUN_API.REFERER
            }
        });
        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload metadata: ${uploadResponse.statusText}`);
        }
        // Return the file URL
        return uploadUrlData.fileUrl;
    }
    catch (error) {
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
async function prepareTokenMetadata(name, symbol, description, imageBuffer, imageType = 'image/jpeg', homePage, twitter, telegram) {
    // Upload the image first
    const imageUrl = await uploadImage(imageBuffer, imageType);
    // Prepare the metadata
    const metadata = {
        name,
        symbol,
        image_uri: imageUrl,
        description,
    };
    // Add optional fields if provided
    if (homePage)
        metadata.home_page = homePage;
    if (twitter)
        metadata.twitter = twitter;
    if (telegram)
        metadata.telegram = telegram;
    // Upload the metadata
    return await uploadMetadata(metadata);
}

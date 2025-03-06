/**
 * Constants for the nadfun protocol
 */

/**
 * Contract addresses for the nadfun protocol
 */
export const NADFUN_ADDRESSES = {
    /**
     * Protocol contract address
     */
    PROTOCOL: '0x822EB1ADD41cf87C3F178100596cf24c9a6442f6',

    /**
     * Factory contract address (if needed in the future)
     */
    // FACTORY: '0x...',

    /**
     * Other contract addresses can be added here
     */
} as const;

/**
 * Fee configuration for the nadfun protocol
 */
export const NADFUN_FEES = {
    /**
     * Fee percentage for creating a curve (1%)
     */
    CREATE_CURVE_FEE_PERCENT: 1,
} as const;

/**
 * API endpoints for the nadfun metadata service
 */
export const NADFUN_API = {
    /**
     * Endpoint to get an upload URL for images
     */
    GET_IMAGE_UPLOAD_URL: 'https://r2-access-worker.jeeterlabs.workers.dev/get-upload-url',

    /**
     * Endpoint to get an upload URL for metadata
     */
    GET_METADATA_UPLOAD_URL: 'https://r2-access-worker.jeeterlabs.workers.dev/get-metadata-upload-url',

    /**
     * Base URL for stored files
     */
    STORAGE_BASE_URL: 'https://storage.nadapp.net/',

    /**
     * Referer header value required for API requests
     */
    REFERER: 'https://testnet.nad.fun/',
} as const; 
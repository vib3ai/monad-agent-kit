/**
 * Constants for the nadfun protocol
 */
/**
 * Contract addresses for the nadfun protocol
 */
export declare const NADFUN_ADDRESSES: {
    /**
     * Protocol contract address
     */
    readonly PROTOCOL: "0x822EB1ADD41cf87C3F178100596cf24c9a6442f6";
};
/**
 * Fee configuration for the nadfun protocol
 */
export declare const NADFUN_FEES: {
    /**
     * Fee percentage for creating a curve (1%)
     */
    readonly CREATE_CURVE_FEE_PERCENT: 1;
};
/**
 * API endpoints for the nadfun metadata service
 */
export declare const NADFUN_API: {
    /**
     * Endpoint to get an upload URL for images
     */
    readonly GET_IMAGE_UPLOAD_URL: "https://r2-access-worker.jeeterlabs.workers.dev/get-upload-url";
    /**
     * Endpoint to get an upload URL for metadata
     */
    readonly GET_METADATA_UPLOAD_URL: "https://r2-access-worker.jeeterlabs.workers.dev/get-metadata-upload-url";
    /**
     * Base URL for stored files
     */
    readonly STORAGE_BASE_URL: "https://storage.nadapp.net/";
    /**
     * Referer header value required for API requests
     */
    readonly REFERER: "https://testnet.nad.fun/";
};

import { z } from 'zod';
import { Action, Example } from '../../../types/action';
import { MonadAgentKit } from '../../../agent';
import { nadfunTools } from '../tools';
import { NADFUN_FEES } from '../constants';
import * as fs from 'fs';
import * as mime from 'mime-types';

// Schema for the createCurveWithMetadata action
const createCurveWithMetadataSchema = z.object({
    creator: z.string().optional().describe('The address of the creator (defaults to the wallet address)'),
    name: z.string().describe('The name of the token'),
    symbol: z.string().describe('The symbol of the token'),
    description: z.string().describe('The description of the token'),
    imagePath: z.string().describe('The path to the image file (MIME type will be automatically detected)'),
    amountIn: z.string().describe(`The amount of ETH to invest (e.g., "0.5"). MINIMUM required amount is 0.5 ETH. A fee of ${NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% will be automatically calculated.`),
    homePage: z.string().optional().describe('The home page URL for the token'),
    twitter: z.string().optional().describe('The Twitter URL for the token'),
    telegram: z.string().optional().describe('The Telegram URL for the token'),
});

// Examples for the createCurveWithMetadata action
const createCurveWithMetadataExamples: Array<Example> = [
    {
        input: {
            name: "Cat Token",
            symbol: "CAT",
            description: "A token for cat lovers",
            imagePath: "/path/to/cat.jpg", // Path to the image file
            amountIn: "0.5",
            homePage: "https://x.com/cat",
            twitter: "https://x.com/cat",
            telegram: "https://t.me/cat"
        },
        output: {
            status: "success",
            txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
        },
        explanation: `Created a new token called 'Cat Token' with symbol 'CAT' by uploading an image, creating metadata, and investing 0.5 ETH with an automatic fee of 0.005 ETH (${NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% of investment).`
    }
];

// Handler for the createCurveWithMetadata action
async function createCurveWithMetadataHandler(
    agent: MonadAgentKit,
    input: Record<string, any>
) {
    const {
        creator,
        name,
        symbol,
        description,
        imagePath,
        amountIn,
        homePage,
        twitter,
        telegram
    } = input as z.infer<typeof createCurveWithMetadataSchema>;

    try {
        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);

        // Automatically detect the MIME type
        const imageType = mime.lookup(imagePath) || 'image/jpeg';

        return await nadfunTools.createCurveWithMetadata(
            agent,
            creator,
            name,
            symbol,
            description,
            imageBuffer,
            imageType,
            amountIn,
            homePage,
            twitter,
            telegram
        );
    } catch (error: any) {
        return {
            status: 'error',
            message: `Error reading image file: ${error.message}. Please provide a valid file path.`,
            code: error.code
        };
    }
}

// Define the createCurveWithMetadata action
export const createCurveWithMetadataAction: Action = {
    name: 'createCurveWithMetadata',
    similes: ['create token with image', 'create curve with metadata', 'mint token with image', 'launch token with metadata'],
    description: `Creates a new token with a bonding curve on the nadfun protocol by uploading an image and creating metadata. Requires a path to an image file (MIME type will be automatically detected) and a minimum of 0.5 ETH investment. A fee of ${NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% of the investment amount is automatically applied.`,
    examples: [createCurveWithMetadataExamples],
    schema: createCurveWithMetadataSchema,
    handler: createCurveWithMetadataHandler,
};

// Export all nadfun actions
export const NADFUN_ACTIONS = {
    createCurveWithMetadata: createCurveWithMetadataAction,
} as const; 
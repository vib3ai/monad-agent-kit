import { Tool } from 'langchain/tools';
import { MonadAgentKit } from '../../../agent';
import { nadfunTools } from '../tools';
import { NADFUN_FEES } from '../constants';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';

/**
 * LangChain tool for creating a new token with a bonding curve on the nadfun protocol with metadata
 */
export class NadfunCreateCurveWithMetadataTool extends Tool {
    name = 'nadfun_create_curve_with_metadata';
    description = `Creates a new token with a bonding curve on the nadfun protocol by uploading an image and creating metadata. Requires name, symbol, description, imagePath (path to the image file), and amountIn (ETH amount to invest, MINIMUM 0.5 ETH required). Optional fields: homePage, twitter, telegram. A fee of ${NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% of the investment amount is automatically applied.`;

    private agent: MonadAgentKit;

    constructor(agent: MonadAgentKit) {
        super();
        this.agent = agent;
    }

    async _call(args: string): Promise<string> {
        try {
            // Parse the input JSON
            const input = JSON.parse(args);

            // Validate required fields
            if (!input.name || !input.symbol || !input.description || !input.imagePath || !input.amountIn) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required fields. Please provide name, symbol, description, imagePath (path to image file), and amountIn (minimum 0.5 ETH).'
                });
            }

            // Validate minimum amount
            const amountInFloat = parseFloat(input.amountIn);
            if (isNaN(amountInFloat) || amountInFloat < 0.5) {
                return JSON.stringify({
                    status: 'error',
                    message: 'The minimum required amount is 0.5 ETH. Please provide a valid amount.'
                });
            }

            // Read image file and detect MIME type
            try {
                const imageBuffer = fs.readFileSync(input.imagePath);
                const imageType = mime.lookup(input.imagePath) || 'image/jpeg';

                // Call the createCurveWithMetadata function
                const result = await nadfunTools.createCurveWithMetadata(
                    this.agent,
                    input.creator,
                    input.name,
                    input.symbol,
                    input.description,
                    imageBuffer,
                    imageType,
                    input.amountIn,
                    input.homePage,
                    input.twitter,
                    input.telegram
                );

                return JSON.stringify(result);
            } catch (fileError: any) {
                return JSON.stringify({
                    status: 'error',
                    message: `Error reading image file: ${fileError.message}. Please provide a valid file path.`,
                    code: fileError.code
                });
            }
        } catch (error: any) {
            return JSON.stringify({
                status: 'error',
                message: error.message || 'An error occurred while creating the curve with metadata',
                code: error.code
            });
        }
    }
}

/**
 * Create all LangChain tools for the nadfun protocol
 * @param monadKit - The MonadAgentKit instance
 * @returns An array of LangChain tools for the nadfun protocol
 */
export function createNadfunTools(monadKit: MonadAgentKit) {
    return [
        new NadfunCreateCurveWithMetadataTool(monadKit),
        // Add more nadfun tools here as they are implemented
    ];
}
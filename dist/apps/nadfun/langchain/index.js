"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NadfunCreateCurveWithMetadataTool = void 0;
exports.createNadfunTools = createNadfunTools;
const tools_1 = require("langchain/tools");
const tools_2 = require("../tools");
const constants_1 = require("../constants");
const fs = __importStar(require("fs"));
const mime = __importStar(require("mime-types"));
/**
 * LangChain tool for creating a new token with a bonding curve on the nadfun protocol with metadata
 */
class NadfunCreateCurveWithMetadataTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.name = 'nadfun_create_curve_with_metadata';
        this.description = `Creates a new token with a bonding curve on the nadfun protocol by uploading an image and creating metadata. Requires name, symbol, description, imagePath (path to the image file), and amountIn (ETH amount to invest, MINIMUM 0.5 ETH required). Optional fields: homePage, twitter, telegram. A fee of ${constants_1.NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% of the investment amount is automatically applied.`;
        this.agent = agent;
    }
    async _call(args) {
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
                const result = await tools_2.nadfunTools.createCurveWithMetadata(this.agent, input.creator, input.name, input.symbol, input.description, imageBuffer, imageType, input.amountIn, input.homePage, input.twitter, input.telegram);
                return JSON.stringify(result);
            }
            catch (fileError) {
                return JSON.stringify({
                    status: 'error',
                    message: `Error reading image file: ${fileError.message}. Please provide a valid file path. DO NOT retry automatically.`,
                    code: fileError.code
                });
            }
        }
        catch (error) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while creating the curve with metadata') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}
exports.NadfunCreateCurveWithMetadataTool = NadfunCreateCurveWithMetadataTool;
/**
 * Create all LangChain tools for the nadfun protocol
 * @param monadKit - The MonadAgentKit instance
 * @returns An array of LangChain tools for the nadfun protocol
 */
function createNadfunTools(monadKit) {
    return [
        new NadfunCreateCurveWithMetadataTool(monadKit),
        // Add more nadfun tools here as they are implemented
    ];
}

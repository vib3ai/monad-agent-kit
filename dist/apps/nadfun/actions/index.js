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
exports.NADFUN_ACTIONS = exports.createCurveWithMetadataAction = void 0;
const zod_1 = require("zod");
const tools_1 = require("../tools");
const constants_1 = require("../constants");
const fs = __importStar(require("fs"));
const mime = __importStar(require("mime-types"));
// Schema for the createCurveWithMetadata action
const createCurveWithMetadataSchema = zod_1.z.object({
    creator: zod_1.z.string().optional().describe('The address of the creator (defaults to the wallet address)'),
    name: zod_1.z.string().describe('The name of the token'),
    symbol: zod_1.z.string().describe('The symbol of the token'),
    description: zod_1.z.string().describe('The description of the token'),
    imagePath: zod_1.z.string().describe('The path to the image file (MIME type will be automatically detected)'),
    amountIn: zod_1.z.string().describe(`The amount of ETH to invest (e.g., "0.5"). MINIMUM required amount is 0.5 ETH. A fee of ${constants_1.NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% will be automatically calculated.`),
    homePage: zod_1.z.string().optional().describe('The home page URL for the token'),
    twitter: zod_1.z.string().optional().describe('The Twitter URL for the token'),
    telegram: zod_1.z.string().optional().describe('The Telegram URL for the token'),
});
// Examples for the createCurveWithMetadata action
const createCurveWithMetadataExamples = [
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
        explanation: `Created a new token called 'Cat Token' with symbol 'CAT' by uploading an image, creating metadata, and investing 0.5 ETH with an automatic fee of 0.005 ETH (${constants_1.NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% of investment).`
    }
];
// Handler for the createCurveWithMetadata action
async function createCurveWithMetadataHandler(agent, input) {
    const { creator, name, symbol, description, imagePath, amountIn, homePage, twitter, telegram } = input;
    try {
        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);
        // Automatically detect the MIME type
        const imageType = mime.lookup(imagePath) || 'image/jpeg';
        return await tools_1.nadfunTools.createCurveWithMetadata(agent, creator, name, symbol, description, imageBuffer, imageType, amountIn, homePage, twitter, telegram);
    }
    catch (error) {
        return {
            status: 'error',
            message: `Error reading image file: ${error.message}. Please provide a valid file path.`,
            code: error.code
        };
    }
}
// Define the createCurveWithMetadata action
exports.createCurveWithMetadataAction = {
    name: 'createCurveWithMetadata',
    similes: ['create token with image', 'create curve with metadata', 'mint token with image', 'launch token with metadata'],
    description: `Creates a new token with a bonding curve on the nadfun protocol by uploading an image and creating metadata. Requires a path to an image file (MIME type will be automatically detected) and a minimum of 0.5 ETH investment. A fee of ${constants_1.NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% of the investment amount is automatically applied.`,
    examples: [createCurveWithMetadataExamples],
    schema: createCurveWithMetadataSchema,
    handler: createCurveWithMetadataHandler,
};
// Export all nadfun actions
exports.NADFUN_ACTIONS = {
    createCurveWithMetadata: exports.createCurveWithMetadataAction,
};

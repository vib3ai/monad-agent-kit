import { MonadAgentKit } from '../../src';
import { nadfunTools } from '../../src/apps/nadfun/tools';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as mime from 'mime-types';

// Load environment variables
dotenv.config();

/**
 * Example of using the nadfun metadata upload functionality
 */
async function main() {
    console.log('=== Nadfun Token Creation Example ===');

    // Load private key from environment variables
    let privateKey = process.env.WALLET_PRIVATE_KEY;

    if (!privateKey) {
        console.error('WALLET_PRIVATE_KEY is required in .env file');
        process.exit(1);
    }

    // Add 0x prefix if not present
    if (!privateKey.startsWith('0x')) {
        privateKey = `0x${privateKey}`;
    }

    // Initialize the MonadAgentKit
    const agent = new MonadAgentKit(privateKey);
    const walletAddress = agent.getWalletAddress();
    console.log(`Wallet address: ${walletAddress}`);

    // Example: Create a curve with metadata from an image file
    console.log('\nExample: Create a curve with metadata from an image file');
    console.log('This would:');
    console.log('1. Read an image file');
    console.log('2. Automatically detect the MIME type');
    console.log('3. Upload the image to nadfun storage');
    console.log('4. Create metadata with the image URL');
    console.log('5. Create a curve with the metadata URL');

    try {
        // Define the image path (replace with your own image path)
        const imagePath = path.join(__dirname, 'image.jpg');

        console.log(`Image path: ${imagePath}`);
        console.log('Note: You need to place an image file at this location before running this example.');
        console.log('If the file does not exist, this example will fail.');

        // Check if the image file exists
        if (!fs.existsSync(imagePath)) {
            console.error(`Error: Image file not found at ${imagePath}`);
            console.log('Please place an image file at this location and try again.');
            process.exit(1);
        }

        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);

        // Automatically detect the MIME type
        const imageType = mime.lookup(imagePath) || 'image/jpeg';

        console.log(`Read image file: ${imagePath} (${imageBuffer.length} bytes)`);
        console.log(`Detected MIME type: ${imageType}`);

        // Create a curve with metadata
        const result = await nadfunTools.createCurveWithMetadata(
            agent,
            undefined, // Use wallet address as creator
            'Example Token',
            'EX',
            'An example token created with metadata',
            imageBuffer,
            imageType,
            '0.5', // Minimum required amount for creating a curve (0.5 ETH)
            'https://example.com',
            'https://x.com/example',
            'https://t.me/example'
        );

        console.log('Result:', result);
    } catch (error) {
        console.error('Error:', error);
    }

    console.log('\nExample completed!');
}

// Run the example
main().catch(console.error);
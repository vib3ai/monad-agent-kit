import { MonadAgentKit } from '../../../src';
import { createNadfunTools } from '../../../src/apps/nadfun/langchain';
import { nadfunTools } from '../../../src/apps/nadfun/tools';
import { NADFUN_ADDRESSES, NADFUN_FEES, NADFUN_API } from '../../../src/apps/nadfun/constants';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

/**
 * Test for nadfun app functionality
 */
async function testNadfunApp() {
    console.log('=== Testing Nadfun App ===');

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

    // Test creating LangChain tools
    const tools = createNadfunTools(agent);
    console.log(`Created ${tools.length} nadfun LangChain tools:`);
    tools.forEach(tool => console.log(`- ${tool.name}: ${tool.description.split('.')[0]}`));

    // Test the constants
    console.log(`\nNadfun protocol address: ${NADFUN_ADDRESSES.PROTOCOL}`);
    console.log(`Nadfun fee percentage: ${NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}%`);
    console.log(`Nadfun API endpoints configured: ${Object.keys(NADFUN_API).length}`);

    // Test metadata upload functionality (without actually uploading)
    console.log('\nTesting createCurveWithMetadata functionality (simulation only):');

    console.log('This would:');
    console.log('1. Upload an image to the nadfun storage service');
    console.log(`   - Get upload URL from: ${NADFUN_API.GET_IMAGE_UPLOAD_URL}`);
    console.log('   - Upload the image to the provided URL');
    console.log('2. Create and upload metadata with the image URL');
    console.log(`   - Get metadata upload URL from: ${NADFUN_API.GET_METADATA_UPLOAD_URL}`);
    console.log('   - Upload the metadata with the image URL');
    console.log('3. Create a curve with the metadata URL');
    console.log(`   - Invest ETH with a ${NADFUN_FEES.CREATE_CURVE_FEE_PERCENT}% fee`);
    console.log(`   - Use protocol address: ${NADFUN_ADDRESSES.PROTOCOL}`);

    console.log('\nExample parameters for createCurveWithMetadata:');
    console.log('- Name: "Cat Token"');
    console.log('- Symbol: "CAT"');
    console.log('- Description: "A token for cat lovers"');
    console.log('- Image: [binary data]');
    console.log('- Amount: 0.1 ETH');
    console.log('- Fee: 0.001 ETH (automatically calculated)');

    console.log('\nNadfun app test completed successfully!');
}

// Run the test if this file is executed directly
if (require.main === module) {
    testNadfunApp();
}

export { testNadfunApp }; 
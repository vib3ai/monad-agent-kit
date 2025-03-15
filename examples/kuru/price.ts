import { MonadAgentKit } from '../../src';
import { kuruTools } from '../../src/apps/kuru/tools';
import { KURU_TOKEN_ADDRESSES } from '../../src/apps/kuru/constants';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Example of using the Kuru price fetching functionality
 */
async function main() {
    console.log('=== Kuru Price Fetching Example ===');

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

    // Example: Get price information for a token swap
    console.log('\nExample: Get price information for MON to USDC swap');
    console.log('This will:');
    console.log('1. Create a PoolFetcher instance');
    console.log('2. Get all pools for the MON/USDC pair');
    console.log('3. Find the best path for the swap');
    console.log('4. Return price information');

    try {
        // Define the token addresses
        const tokenInAddress = KURU_TOKEN_ADDRESSES.NATIVE; // MON
        const tokenOutAddress = KURU_TOKEN_ADDRESSES.CHOG; // CHOG
        const amountToSwap = 1.0; // 1 MON

        console.log(`Token In: ${tokenInAddress} (MON)`);
        console.log(`Token Out: ${tokenOutAddress} (CHOG)`);
        console.log(`Amount: ${amountToSwap} MON`);

        // Get price information
        const priceInfo = await kuruTools.getPrice(
            agent,
            tokenInAddress,
            tokenOutAddress,
            amountToSwap,
            'amountIn'
        );

        console.log('\nPrice Information:');
        console.log(`Expected Output: ${priceInfo.output} CHOG`);
        console.log(`Price Impact: ${priceInfo.priceImpact}%`);
        console.log(`Route: ${JSON.stringify(priceInfo.route, null, 2)}`);
    } catch (error) {
        console.error('Error:', error);
    }

    console.log('\nExample completed!');
}

// Run the example
main().catch(console.error); 
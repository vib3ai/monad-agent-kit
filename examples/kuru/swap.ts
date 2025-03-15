import { MonadAgentKit } from '../../src';
import { kuruTools } from '../../src/apps/kuru/tools';
import { KURU_TOKEN_ADDRESSES } from '../../src/apps/kuru/constants';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Example of using the Kuru swap functionality
 */
async function main() {
    console.log('=== Kuru Token Swap Example ===');

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

    // Example: Swap MON for CHOG
    console.log('\nExample: Swap MON for CHOG');
    console.log('This will:');
    console.log('1. Create a PoolFetcher instance');
    console.log('2. Get all pools for the MON/CHOG pair');
    console.log('3. Find the best path for the swap');
    console.log('4. Create a transaction to execute the swap');
    console.log('5. Sign and send the transaction');
    console.log('6. Return the transaction receipt');

    try {
        // Define the token addresses and parameters
        const tokenInAddress = KURU_TOKEN_ADDRESSES.NATIVE; // MON
        const tokenOutAddress = KURU_TOKEN_ADDRESSES.CHOG; // CHOG
        const amountToSwap = 0.2; // 0.2 MON (small amount for testing)
        const inTokenDecimals = 18; // MON has 18 decimals
        const outTokenDecimals = 6; // CHOG has 6 decimals
        const slippageTolerance = 0.5; // 0.5% slippage tolerance
        const approveTokens = false; // No need to approve native token

        console.log(`Token In: ${tokenInAddress} (MON)`);
        console.log(`Token Out: ${tokenOutAddress} (CHOG)`);
        console.log(`Amount: ${amountToSwap} MON`);
        console.log(`In Token Decimals: ${inTokenDecimals}`);
        console.log(`Out Token Decimals: ${outTokenDecimals}`);
        console.log(`Slippage Tolerance: ${slippageTolerance}%`);
        console.log(`Approve Tokens: ${approveTokens}`);

        // First get price information to confirm the swap details
        console.log('\nGetting price information...');
        const priceInfo = await kuruTools.getPrice(
            agent,
            tokenInAddress,
            tokenOutAddress,
            amountToSwap,
            'amountIn'
        );

        console.log('Price Information:');
        console.log(`Expected Output: ${priceInfo.output} CHOG`);
        console.log(`Price Impact: ${priceInfo.priceImpact}%`);

        // Ask for confirmation before executing the swap
        console.log('\nWARNING: This will execute a real swap on the Monad blockchain.');

        // Execute the swap
        console.log('\nExecuting swap...');
        const receipt = await kuruTools.swap(
            agent,
            tokenInAddress,
            tokenOutAddress,
            amountToSwap,
            inTokenDecimals,
            outTokenDecimals,
            slippageTolerance,
            approveTokens
        );

        console.log('\nSwap completed!');
        console.log('Transaction Receipt:', receipt);
    } catch (error) {
        console.error('Error:', error);
    }

    console.log('\nExample completed!');
}

// Run the example
main().catch(console.error); 
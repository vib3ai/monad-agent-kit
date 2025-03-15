import { MonadAgentKit } from '../../src';
import { shmonadTools } from '../../src/apps/shmonad/tools';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Example of using the Shmonad unstaking functionality
 */
async function main() {
    console.log('=== Shmonad Unstaking Example ===');

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

    // Example: Unstake tokens
    console.log('\nExample: Unstake tokens');
    console.log('This will:');
    console.log('1. Call the redeem function on the Shmonad staking contract');
    console.log('2. Unstake the specified number of shares');
    console.log('3. Return the transaction receipt');

    try {
        // Define the shares to unstake
        const sharesToUnstake = 0.05; // 0.05 shares

        console.log(`Shares to unstake: ${sharesToUnstake}`);

        // Unstake tokens
        const receipt = await shmonadTools.unstake(
            agent,
            sharesToUnstake
        );

        console.log('\nUnstaking Transaction Receipt:');
        console.log(`Transaction Hash: ${receipt.transactionHash}`);
        console.log(`Status: ${receipt.status === 'success' ? 'Success' : 'Failed'}`);
    } catch (error) {
        console.error('Error:', error);
    }

    console.log('\nExample completed!');
}

// Run the example
main().catch(console.error); 
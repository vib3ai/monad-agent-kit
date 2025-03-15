import { MonadAgentKit } from '../../../src';
import { createKuruTools } from '../../../src/apps/kuru/langchain';
import { kuruTools } from '../../../src/apps/kuru/tools';
import { KURU_CONFIG, KURU_TOKEN_ADDRESSES, KURU_BASE_TOKENS } from '../../../src/apps/kuru/constants';
import 'dotenv/config';

/**
 * Test for Kuru app functionality
 */
async function testKuruApp() {
    console.log('=== Testing Kuru App ===');

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
    const tools = createKuruTools(agent);
    console.log(`Created ${tools.length} Kuru LangChain tools:`);
    tools.forEach(tool => console.log(`- ${tool.name}: ${tool.description.split('.')[0]}`));

    // Test the constants
    console.log(`\nKuru API URL: ${KURU_CONFIG.KURU_API_URL}`);
    console.log(`Kuru Router address: ${KURU_CONFIG.ROUTER_ADDRESS}`);
    console.log(`Native token address: ${KURU_TOKEN_ADDRESSES.NATIVE}`);
    console.log(`Base tokens configured: ${KURU_BASE_TOKENS.length}`);

    // Test price fetching functionality (simulation only)
    console.log('\nTesting getPrice functionality (simulation only):');

    console.log('This would:');
    console.log('1. Create a PoolFetcher instance with the Kuru API URL');
    console.log('2. Get all pools for the token pair');
    console.log('3. Find the best path for the swap');
    console.log('4. Return price information including:');
    console.log('   - Expected output amount');
    console.log('   - Price impact');
    console.log('   - Route details');

    // Test swap functionality (simulation only)
    console.log('\nTesting swap functionality (simulation only):');

    console.log('This would:');
    console.log('1. Create a PoolFetcher instance with the Kuru API URL');
    console.log('2. Get all pools for the token pair');
    console.log('3. Find the best path for the swap');
    console.log('4. Create a transaction to execute the swap');
    console.log('5. Sign and send the transaction');
    console.log('6. Return the transaction receipt');

    console.log('\nExample parameters for getPrice:');
    console.log(`- Token In: ${KURU_TOKEN_ADDRESSES.NATIVE} (MON)`);
    console.log(`- Token Out: ${KURU_TOKEN_ADDRESSES.USDC} (USDC)`);
    console.log('- Amount: 1.0');
    console.log('- Amount Type: "amountIn"');

    console.log('\nExample parameters for swap:');
    console.log(`- Token In: ${KURU_TOKEN_ADDRESSES.NATIVE} (MON)`);
    console.log(`- Token Out: ${KURU_TOKEN_ADDRESSES.USDC} (USDC)`);
    console.log('- Amount: 1.0');
    console.log('- In Token Decimals: 18');
    console.log('- Out Token Decimals: 6');
    console.log('- Slippage Tolerance: 0.5%');
    console.log('- Approve Tokens: false (not needed for native token)');

    console.log('\nKuru app test completed successfully!');
}

// Run the test if this file is executed directly
if (require.main === module) {
    testKuruApp();
}

export { testKuruApp }; 
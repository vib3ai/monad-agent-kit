import { MonadAgentKit, monad } from '../../../src';
import { createENSTools } from '../../../src/apps/ens/langchain';

/**
 * Test the ENS module
 */
export async function testENSApp() {
    console.log('=== Testing ENS (Monad Name Service) App ===');

    // Create a MonadAgentKit instance
    const privateKey = process.env.WALLET_PRIVATE_KEY || '0x1111111111111111111111111111111111111111111111111111111111111111';
    const rpcUrl = process.env.MONAD_RPC_URL || 'https://rpc.monad.xyz';

    const agent = new MonadAgentKit(
        privateKey,
        monad,
        rpcUrl
    );

    const walletAddress = agent.getWalletAddress();
    console.log('Wallet address:', walletAddress);

    // Create ENS tools
    const ensTools = createENSTools(agent);
    console.log(`Created ${ensTools.length} ENS LangChain tools:`);
    for (const tool of ensTools) {
        console.log(`- ${tool.name}: ${tool.description}`);
    }

    // Test functionality (simulation only, as we don't want to make actual RPC calls during tests)
    console.log('\nTesting ENS functionality (simulation only):');
    console.log('This would:');
    console.log('1. Create an NNS instance with the public client');
    console.log('2. Call the appropriate NNS methods based on the request');
    console.log('3. Return the formatted response');

    // Example parameters
    console.log('\nExample parameters for resolveAddress:');
    console.log('- Name: "vitalik.nad"');

    console.log('\nExample parameters for getPrimaryName:');
    console.log(`- Address: "${walletAddress}"`);

    console.log('\nExample parameters for setNameAttribute:');
    console.log('- Name: "myname.nad"');
    console.log('- Key: "twitter"');
    console.log('- Value: "@username"');

    console.log('\nENS (Monad Name Service) app test completed successfully!');
} 
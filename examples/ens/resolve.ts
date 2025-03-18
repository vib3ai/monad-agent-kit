import { MonadAgentKit, monad } from '../../src';
import { ENS_ACTIONS } from '../../src/apps/ens/actions';
import 'dotenv/config';

/**
 * Example: Resolving a Monad Name Service (MNS) name to an address
 * 
 * This example demonstrates how to:
 * 1. Connect to the Monad network
 * 2. Resolve a Monad Name Service (MNS) name to an address
 * 
 * To run this example:
 * yarn tsx examples/ens/resolve.ts
 */
async function main() {
    console.log('ENS (Monad Name Service) Name Resolution Example');
    console.log('===============================================\n');

    // Load environment variables
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    if (!privateKey) {
        console.error('Error: WALLET_PRIVATE_KEY is not set in your .env file');
        process.exit(1);
    }

    const rpcUrl = process.env.MONAD_RPC_URL || 'https://rpc.monad.xyz';
    console.log(`Using RPC URL: ${rpcUrl}`);

    // Initialize the agent
    const agent = new MonadAgentKit(
        privateKey,
        monad,
        rpcUrl,
    );

    const walletAddress = agent.getWalletAddress();
    console.log(`Connected with wallet address: ${walletAddress}\n`);

    try {
        // Resolve an MNS name
        // For demonstration, we're using a placeholder name - replace with a real MNS name
        const name = 'vitalik.nad';
        console.log(`Resolving name: ${name}...`);

        // Call the resolveAddress action directly
        const result = await ENS_ACTIONS.resolveAddress(agent, name);
        console.log('Resolution result:', result);
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
}

// Run the main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 
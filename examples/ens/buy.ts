import { MonadAgentKit, monad } from '../../src';
import { ENS_ACTIONS } from '../../src/apps/ens/actions';
import { ENS_CONTRACTS } from '../../src/apps/ens/constants';
import 'dotenv/config';

/**
 * Example: Buying a Monad Name Service (MNS) domain
 * 
 * This example demonstrates how to:
 * 1. Connect to the Monad network
 * 2. Purchase a Monad Name Service (MNS) domain using the NAD Domains API
 * 
 * To run this example:
 * yarn tsx examples/ens/buy.ts
 */
async function main() {
    console.log('ENS (Monad Name Service) Domain Purchase Example');
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
        // Define the domain details
        const domainName = 'testdomain' + Date.now().toString().slice(-6); // Generate a unique domain name
        const tld = 'nad';
        const duration = 365; // Registration duration in days

        console.log(`Attempting to purchase domain: ${domainName}.${tld} for ${duration} days...`);
        console.log(`Registry Controller contract: ${ENS_CONTRACTS.REGISTRY_CONTROLLER}`);

        console.log('\nThis process will:');
        console.log('1. Request a signature from the NAD Domains API');
        console.log('2. Use the signature, nonce, and deadline from the API');
        console.log('3. Submit the transaction to the blockchain\n');

        // Register the domain using our action
        console.log(`Processing domain registration...`);
        const result = await ENS_ACTIONS.registerDomain(agent, domainName, tld, duration);

        console.log('\nDomain purchase transaction submitted!');
        console.log('Transaction Hash:', result.transactionHash);
        console.log('Status:', result.status);
        console.log('Domain Name:', result.domainName);
        console.log('Duration:', result.duration, 'days');
        console.log('Registrant Address:', result.registrantAddress);

        console.log('\nYou can view the transaction on the Monad Explorer:');
        console.log(`https://explorer.monad.xyz/tx/${result.transactionHash}`);

        console.log('\nAfter the transaction is confirmed, you can manage your domain at:');
        console.log(`https://app.nad.domains/`);
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
}

// Run the main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 
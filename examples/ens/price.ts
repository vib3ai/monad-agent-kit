import { MonadAgentKit, monad } from '../../src';
import { ENS_ACTIONS } from '../../src/apps/ens/actions';
import { ENS_CONTRACTS } from '../../src/apps/ens/constants';
import 'dotenv/config';

/**
 * Example: Checking price for Monad Name Service (MNS) domains
 * 
 * This example demonstrates how to:
 * 1. Connect to the Monad network
 * 2. Get the price for registering a domain using the price oracle
 * 
 * To run this example:
 * yarn example:ens-price
 */
async function main() {
    console.log('Monad Name Service (MNS) Domain Price Check');
    console.log('=========================================\n');

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
        // Define the domains to check
        const domains = ['monad', 'vitalik', 'example', 'test', 'blockchain', 'wckd'];
        const duration = 365; // Registration duration in days

        console.log(`Checking domain prices (${duration} days registration):\n`);
        console.log(`Price Oracle address: ${ENS_CONTRACTS.PRICE_ORACLE}`);
        console.log(`Registry Controller address: ${ENS_CONTRACTS.REGISTRY_CONTROLLER}\n`);

        // Check each domain
        for (const name of domains) {
            console.log(`Domain: ${name}.nad`);

            try {
                // Get the price for this domain
                const priceResult = await ENS_ACTIONS.getDomainPrice(agent, name, duration);

                if (priceResult.success) {
                    // Format the price in ETH for better readability
                    const priceInEth = Number(priceResult.price) / 1e18;
                    console.log(`  Price: ${priceInEth} MON`);

                    if (priceResult.basePrice) {
                        const basePriceInEth = Number(priceResult.basePrice) / 1e18;
                        console.log(`  Base Price: ${basePriceInEth} MON`);
                    }

                    if (priceResult.premiumPrice) {
                        const premiumPriceInEth = Number(priceResult.premiumPrice) / 1e18;
                        console.log(`  Premium: ${premiumPriceInEth} MON`);
                    }

                    console.log(`  To register: Use ENS_ACTIONS.registerDomain(agent, "${name}", "nad", ${duration})`);
                } else {
                    console.log(`  Price Error: ${priceResult.error}`);
                }
            } catch (error) {
                console.log(`  Error: ${error instanceof Error ? error.message : String(error)}`);
            }
            console.log();
        }

        console.log('Notes:');
        console.log('1. Domain prices are determined by the Monad Name Service price oracle');
        console.log('2. Prices may include a base price and premium for premium domains');
        console.log('3. To register a domain, use the ENS_ACTIONS.registerDomain function');
        console.log('4. After registration, you can manage your domain at https://nad.domains');
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
}

// Run the main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 
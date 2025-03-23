import { MonadAgentKit, monad } from '../../src';
import { APRIORI_ACTIONS } from '../../src/apps/apriori/actions';
import { APRIORI_CONTRACTS } from '../../src/apps/apriori/constants';
import { parseEther } from 'viem';
import 'dotenv/config';

/**
 * Example: Depositing assets into the Apriori staking contract
 * 
 * This example demonstrates how to:
 * 1. Connect to the Monad network
 * 2. Deposit assets into the Apriori staking contract
 * 
 * To run this example:
 * yarn example:apriori-deposit
 */
async function main() {
    console.log('Apriori Staking Deposit Example');
    console.log('===============================\n');

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
        // Define the deposit amount
        const depositAmount = parseEther('0.1'); // 0.1 ETH
        console.log(`Attempting to deposit ${Number(depositAmount) / 1e18} ETH into the Apriori staking contract...`);
        console.log(`Staking contract: ${APRIORI_CONTRACTS.STAKING}`);

        // Deposit assets
        console.log(`Processing deposit...`);
        const result = await APRIORI_ACTIONS.deposit(agent, depositAmount);

        console.log('\nDeposit transaction submitted!');
        console.log('Transaction Hash:', result.transactionHash);
        console.log('Status:', result.status);
        console.log('Amount:', Number(BigInt(result.amount)) / 1e18, 'ETH');
        console.log('Receiver:', result.receiver);

        console.log('\nYou can view the transaction on the Monad Explorer:');
        console.log(`https://testnet.monadexplorer.com/tx/${result.transactionHash}`);

        console.log('\nAfter the transaction is confirmed, you will receive staking shares in return.');
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
}

// Run the main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 
import { MonadAgentKit, monad } from '../../src';
import { MAGMA_ACTIONS } from '../../src/apps/magma/actions';
import { MAGMA_CONTRACTS } from '../../src/apps/magma/constants';
import { parseEther } from 'viem';
import 'dotenv/config';

/**
 * Example: Depositing MON into the Magma staking contract
 * 
 * This example demonstrates how to:
 * 1. Connect to the Monad network
 * 2. Deposit MON into the Magma staking contract without referral
 * 
 * To run this example:
 * yarn example:magma-deposit
 */
async function main() {
    console.log('Magma Staking Deposit Example');
    console.log('============================\n');

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
        const depositAmount = parseEther('0.1'); // 0.1 MON
        console.log(`Attempting to deposit ${Number(depositAmount) / 1e18} MON into the Magma staking contract...`);
        console.log(`Staking contract: ${MAGMA_CONTRACTS.STAKING}`);

        // Deposit MON
        console.log(`Processing deposit...`);
        const result = await MAGMA_ACTIONS.depositMon(agent, depositAmount);

        console.log('\nDeposit transaction submitted!');
        console.log('Transaction Hash:', result.transactionHash);
        console.log('Status:', result.status);
        console.log('Amount:', Number(BigInt(result.amount)) / 1e18, 'MON');

        console.log('\nYou can view the transaction on the Monad Explorer:');
        console.log(`https://testnet.monadexplorer.com/tx/${result.transactionHash}`);

        console.log('\nAfter the transaction is confirmed, you will receive gMON tokens as shares.');
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
}

// Run the main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 
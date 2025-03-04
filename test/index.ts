import { MonadAgentKit, createAllTools } from '../src';
import { Tool } from 'langchain/tools';
import 'dotenv/config';

async function main() {
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

    try {
        // Initialize the MonadAgentKit
        const monadKit = new MonadAgentKit(privateKey);
        console.log('Wallet address:', monadKit.getWalletAddress());

        // Check balance
        const balance = await monadKit.getBalance();
        console.log('Wallet balance:', balance, 'ETH');

        // Create LangChain tools
        const tools = createAllTools(monadKit);
        console.log('Available tools:', tools.map(tool => tool.name));

        // Example of using the balance tool directly
        const balanceTool = tools[0] as Tool;
        const balanceResult = await balanceTool.call('{}');
        console.log('Balance tool result:', balanceResult);

        // Note: We're not testing the transfer tool here as it would actually send tokens
        console.log('Test completed successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
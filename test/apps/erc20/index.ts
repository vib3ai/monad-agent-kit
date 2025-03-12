import { MonadAgentKit } from '../../../src';
import { createERC20Tools } from '../../../src/apps/erc20/langchain';
import 'dotenv/config';
import { erc20Tools } from '../../../src/apps/erc20/tools';

/**
 * Test for native app functionality
 */
async function testERC20App() {
    console.log('=== Testing ERC20 App ===');

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

        // Create LangChain tools for ERC20 app
        const tools = createERC20Tools(monadKit);
        console.log('Available ERC20 tools:', tools.map(tool => tool.name));

        // USDC Balance
        const usdcAddress = '0xf817257fed379853cDe0fa4F97AB987181B1E5Ea';
        const balance = await erc20Tools.getTokenBalance(monadKit, usdcAddress, monadKit.getWalletAddress());
        console.log('Wallet balance:', balance, 'USDC');

        const balanceTool = tools.find(tool => tool.name === 'erc20_balance');
        if (balanceTool) {
            const balanceResult = await balanceTool.call(JSON.stringify({ tokenAddress: usdcAddress, ownerAddress: monadKit.getWalletAddress() }));
            console.log('Balance tool result:', balanceResult);
        } else {
            console.error('Balance tool not found');
        }

        // USDT Allowance
        const spenderAddress = '0x0000000000000000000000000000000000000000';
        const allowance = await erc20Tools.getTokenAllowance(
            monadKit,
            usdcAddress,
            monadKit.getWalletAddress(),
            spenderAddress
        );
        console.log('Wallet allowance:', allowance, 'USDC');

        const allowanceTool = tools.find(tool => tool.name === 'erc20_allowance');
        if (allowanceTool) {
            const allowanceResult = await allowanceTool.call(JSON.stringify(
                {
                    tokenAddress: usdcAddress,
                    ownerAddress: monadKit.getWalletAddress(),
                    spenderAddress: spenderAddress
                }
            ));
            console.log('Allowance tool result:', allowanceResult);
        } else {
            console.error('Allowance tool not found');
        }
    } catch (error) {
        console.error('Error in native app test:', error);
    }
}

// Run the test if this file is executed directly
if (require.main === module) {
    testERC20App();
}

export { testERC20App }; 
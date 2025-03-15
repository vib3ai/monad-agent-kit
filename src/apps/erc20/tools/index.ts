import { MonadAgentKit } from '../../../agent';
import { parseUnits } from 'viem';
import erc20Abi from '../abi/erc20.json';

/**
 * Get the balance of an ERC20 token for a specific address
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param ownerAddress - The address to check the balance for (defaults to the wallet address)
 * @returns The token balance as a string
 */
export async function getTokenBalance(
    agent: MonadAgentKit,
    tokenAddress: string,
    ownerAddress?: string
): Promise<string> {
    try {
        // Use the wallet address if ownerAddress is not provided
        const address = ownerAddress || agent.getWalletAddress();

        // Call the balanceOf function on the ERC20 contract
        const balance = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address as `0x${string}`]
        });

        // Get the token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'decimals'
        });

        // Format the balance based on the token's decimals
        return formatUnits(balance as bigint, Number(decimals));
    } catch (error: any) {
        console.error('Error getting token balance:', error);
        throw new Error(`Failed to get token balance: ${error.message}`);
    }
}

/**
 * Transfer ERC20 tokens to another address
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param to - The recipient address
 * @param amount - The amount to transfer (in token units, not wei)
 * @returns The transaction hash
 */
export async function transferToken(
    agent: MonadAgentKit,
    tokenAddress: string,
    to: string,
    amount: string
): Promise<{
    transactionHash: string;
    status: string;
    message: string;
}> {
    try {
        // Get the token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'decimals'
        });

        // Parse the amount based on the token's decimals
        const parsedAmount = parseUnits(amount, Number(decimals));

        // Prepare the transaction
        const { request } = await agent.publicClient.simulateContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'transfer',
            args: [to as `0x${string}`, parsedAmount],
            account: agent.getWalletAddress() as `0x${string}`,
        });

        // Send the transaction
        const txHash = await agent.walletClient.writeContract(request);

        // Return immediately without waiting for the transaction to be mined
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The token transfer is now pending on the blockchain.'
        };
    } catch (error: any) {
        console.error('Error transferring tokens:', error);
        throw new Error(`Failed to transfer tokens: ${error.message}`);
    }
}

/**
 * Approve an address to spend tokens on behalf of the wallet owner
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param spender - The address to approve
 * @param amount - The amount to approve (in token units, not wei)
 * @returns The transaction hash
 */
export async function approveToken(
    agent: MonadAgentKit,
    tokenAddress: string,
    spender: string,
    amount: string
): Promise<{
    transactionHash: string;
    status: string;
    message: string;
}> {
    try {
        // Get the token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'decimals'
        });

        // Parse the amount based on the token's decimals
        const parsedAmount = parseUnits(amount, Number(decimals));

        // Prepare the transaction
        const { request } = await agent.publicClient.simulateContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'approve',
            args: [spender as `0x${string}`, parsedAmount],
            account: agent.getWalletAddress() as `0x${string}`,
        });

        // Send the transaction
        const txHash = await agent.walletClient.writeContract(request);

        // Return immediately without waiting for the transaction to be mined
        return {
            transactionHash: txHash,
            status: 'pending',
            message: 'Transaction submitted successfully. The token approval is now pending on the blockchain.'
        };
    } catch (error: any) {
        console.error('Error approving tokens:', error);
        throw new Error(`Failed to approve tokens: ${error.message}`);
    }
}

/**
 * Get the allowance of tokens that a spender can use on behalf of the owner
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @param ownerAddress - The address of the token owner
 * @param spenderAddress - The address of the spender
 * @returns The allowance as a string
 */
export async function getTokenAllowance(
    agent: MonadAgentKit,
    tokenAddress: string,
    ownerAddress: string,
    spenderAddress: string
): Promise<string> {
    try {
        // Call the allowance function on the ERC20 contract
        const allowance = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [ownerAddress as `0x${string}`, spenderAddress as `0x${string}`]
        });

        // Get the token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'decimals'
        });

        // Format the allowance based on the token's decimals
        return formatUnits(allowance as bigint, Number(decimals));
    } catch (error: any) {
        console.error('Error getting token allowance:', error);
        throw new Error(`Failed to get token allowance: ${error.message}`);
    }
}

/**
 * Get token information (name, symbol, decimals, total supply)
 * @param agent - The MonadAgentKit instance
 * @param tokenAddress - The address of the ERC20 token
 * @returns Token information object
 */
export async function getTokenInfo(
    agent: MonadAgentKit,
    tokenAddress: string
): Promise<{
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
}> {
    try {
        // Get token name
        const name = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'name'
        });

        // Get token symbol
        const symbol = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'symbol'
        });

        // Get token decimals
        const decimals = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'decimals'
        });

        // Get token total supply
        const totalSupply = await agent.publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'totalSupply'
        });

        return {
            name: name as string,
            symbol: symbol as string,
            decimals: Number(decimals),
            totalSupply: formatUnits(totalSupply as bigint, Number(decimals))
        };
    } catch (error: any) {
        console.error('Error getting token info:', error);
        throw new Error(`Failed to get token info: ${error.message}`);
    }
}

// Helper function to format units based on decimals
function formatUnits(value: bigint, decimals: number): string {
    return (Number(value) / Math.pow(10, decimals)).toString();
}

// Export all tools
export const erc20Tools = {
    getTokenBalance,
    transferToken,
    approveToken,
    getTokenAllowance,
    getTokenInfo,

    // Keep the nadfun tools for backward compatibility
    createCurveWithMetadata: async () => {
        throw new Error('This function is deprecated');
    }
}; 
import { createWalletClient, http, parseEther, createPublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { monad } from "../../../constants";
import { MonadAgentKit } from "../../../agent";
import { SHMONAD_CONFIG } from "../constants";
import coreAbi from "../abi/core.json";

/**
 * Stake native tokens (MON) in the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param amount The amount to stake in MON
 * @returns The transaction hash
 */
export async function stake(
    agent: MonadAgentKit,
    amount: number
) {
    try {
        // Use the agent's wallet client and public client
        const { walletClient } = agent;
        const walletAddress = agent.getWalletAddress();

        // Convert amount to wei
        const amountInWei = parseEther(amount.toString());

        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Staking operation timed out after 30 seconds'));
            }, 30000); // 30 second timeout
        });

        // Call the deposit function (stake)
        const writeContractPromise = walletClient.writeContract({
            address: SHMONAD_CONFIG.STAKING_ADDRESS as `0x${string}`,
            abi: coreAbi,
            functionName: 'deposit',
            args: [amountInWei, walletAddress],
            value: amountInWei
        });

        // Race between the contract call and the timeout
        const hash = await Promise.race([writeContractPromise, timeoutPromise]) as `0x${string}`;

        // Return the transaction hash immediately without waiting for receipt
        return {
            transactionHash: hash,
            status: 'pending',
            message: 'Transaction submitted successfully. The staking operation is now pending on the blockchain.'
        };
    } catch (error) {
        // Return a more informative error message
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Staking failed: ${errorMessage}`);
    }
}

/**
 * Unstake tokens from the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param shares The number of shares to unstake
 * @returns The transaction hash
 */
export async function unstake(
    agent: MonadAgentKit,
    shares: number
) {
    try {
        // Use the agent's wallet client and public client
        const { walletClient } = agent;
        const walletAddress = agent.getWalletAddress();

        // Convert shares to wei
        const sharesInWei = parseEther(shares.toString());

        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Unstaking operation timed out after 30 seconds'));
            }, 30000); // 30 second timeout
        });

        // Call the redeem function (unstake)
        const writeContractPromise = walletClient.writeContract({
            address: SHMONAD_CONFIG.STAKING_ADDRESS as `0x${string}`,
            abi: coreAbi,
            functionName: 'redeem',
            args: [sharesInWei, walletAddress, walletAddress]
        });

        // Race between the contract call and the timeout
        const hash = await Promise.race([writeContractPromise, timeoutPromise]) as `0x${string}`;

        // Return the transaction hash immediately without waiting for receipt
        return {
            transactionHash: hash,
            status: 'pending',
            message: 'Transaction submitted successfully. The unstaking operation is now pending on the blockchain.'
        };
    } catch (error) {
        // Return a more informative error message
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Unstaking failed: ${errorMessage}`);
    }
}

/**
 * Shmonad tools
 */
export const shmonadTools = {
    stake,
    unstake
};
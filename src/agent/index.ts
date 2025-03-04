import {
    createWalletClient,
    createPublicClient,
    http,
    Chain,
    Address,
    Account,
    parseEther,
    formatEther,
    WalletClient,
    PublicClient,
    Transport,
} from 'viem';

import { privateKeyToAccount } from 'viem/accounts';
import { monad } from '../constants';

/**
 * MonadAgentKit is the main class for interacting with the Monad blockchain
 */
export class MonadAgentKit {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient;
    walletAccount: Account;

    /**
     * Create a new MonadAgentKit instance
     * @param privateKey - The private key of the wallet
     * @param chain - The chain to connect to (defaults to Monad)
     * @param rpcUrl - The RPC URL to use (optional)
     */
    constructor(privateKey: string, chain: Chain = monad, rpcUrl?: string) {
        this.publicClient = createPublicClient({
            chain,
            transport: http(rpcUrl),
        });

        this.walletAccount = privateKeyToAccount(privateKey as Address);
        this.walletClient = createWalletClient({
            chain,
            account: this.walletAccount,
            transport: http(rpcUrl),
        });
    }

    /**
     * Get the wallet address
     * @returns The wallet address
     */
    getWalletAddress(): string {
        return this.walletAccount.address;
    }

    /**
     * Get the balance of a wallet
     * @param address - The address to check (defaults to the wallet address)
     * @returns The balance in ETH
     */
    async getBalance(address?: string): Promise<string> {
        const targetAddress = (address || this.walletAccount.address) as Address;
        const rawBalance = await this.publicClient.getBalance({
            address: targetAddress,
        });
        return formatEther(rawBalance);
    }

    /**
     * Transfer native tokens to another address
     * @param to - The recipient address
     * @param amount - The amount to transfer in ETH
     * @returns The transaction hash
     */
    async transfer(to: string, amount: string): Promise<string> {
        const recipient = to as Address;
        return this.walletClient.sendTransaction({
            to: recipient,
            value: parseEther(amount),
        });
    }
} 
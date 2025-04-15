import { Chain, Account, WalletClient, PublicClient, Transport } from 'viem';
/**
 * MonadAgentKit is the main class for interacting with the Monad blockchain
 */
export declare class MonadAgentKit {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient;
    walletAccount: Account;
    /**
     * Create a new MonadAgentKit instance
     * @param privateKey - The private key of the wallet
     * @param chain - The chain to connect to (defaults to Monad)
     * @param rpcUrl - The RPC URL to use (optional)
     */
    constructor(privateKey: string, chain?: Chain, rpcUrl?: string);
    /**
     * Get the wallet address
     * @returns The wallet address
     */
    getWalletAddress(): string;
}

import {
    createWalletClient,
    createPublicClient,
    http,
    Chain,
    Address,
    Account,
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
} 
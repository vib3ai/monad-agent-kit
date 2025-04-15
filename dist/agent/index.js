"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonadAgentKit = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const constants_1 = require("../constants");
/**
 * MonadAgentKit is the main class for interacting with the Monad blockchain
 */
class MonadAgentKit {
    /**
     * Create a new MonadAgentKit instance
     * @param privateKey - The private key of the wallet
     * @param chain - The chain to connect to (defaults to Monad)
     * @param rpcUrl - The RPC URL to use (optional)
     */
    constructor(privateKey, chain = constants_1.monad, rpcUrl) {
        this.publicClient = (0, viem_1.createPublicClient)({
            chain,
            transport: (0, viem_1.http)(rpcUrl),
        });
        this.walletAccount = (0, accounts_1.privateKeyToAccount)(privateKey);
        this.walletClient = (0, viem_1.createWalletClient)({
            chain,
            account: this.walletAccount,
            transport: (0, viem_1.http)(rpcUrl),
        });
    }
    /**
     * Get the wallet address
     * @returns The wallet address
     */
    getWalletAddress() {
        return this.walletAccount.address;
    }
}
exports.MonadAgentKit = MonadAgentKit;

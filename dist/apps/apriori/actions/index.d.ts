import { MonadAgentKit } from "../../../agent";
/**
 * Deposit assets into the Apriori staking contract
 * @param agent The MonadAgentKit instance
 * @param assets The amount of assets to deposit (in wei)
 * @param receiver The address to receive the staking shares (defaults to the sender's address)
 * @returns Transaction hash and deposit details
 */
export declare function deposit(agent: MonadAgentKit, assets: bigint, receiver?: `0x${string}`): Promise<{
    transactionHash: `0x${string}`;
    status: string;
    message: string;
    amount: string;
    receiver: string;
}>;
/**
 * Export Apriori actions
 */
export declare const APRIORI_ACTIONS: {
    deposit: typeof deposit;
};

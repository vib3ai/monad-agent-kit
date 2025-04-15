import { MonadAgentKit } from "../../../agent";
/**
 * Stake native tokens (MON) in the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param amount The amount to stake in MON
 * @returns The transaction receipt
 */
export declare function stake(agent: MonadAgentKit, amount: number): Promise<{
    transactionHash: `0x${string}`;
    status: string;
    message: string;
}>;
/**
 * Unstake tokens from the Shmonad staking contract
 * @param agent The MonadAgentKit instance
 * @param shares The number of shares to unstake
 * @returns The transaction receipt
 */
export declare function unstake(agent: MonadAgentKit, shares: number): Promise<{
    transactionHash: `0x${string}`;
    status: string;
    message: string;
}>;
/**
 * Shmonad actions
 */
export declare const SHMONAD_ACTIONS: {
    stake: typeof stake;
    unstake: typeof unstake;
};

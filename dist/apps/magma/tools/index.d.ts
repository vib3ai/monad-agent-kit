import { MonadAgentKit } from '../../../agent';
/**
 * Deposit MON into the Magma staking contract without referral
 * @param agent The MonadAgentKit instance
 * @param amount The amount of MON to deposit (in wei)
 * @returns Transaction hash and deposit details
 */
export declare function depositMon(agent: MonadAgentKit, amount: bigint): Promise<{
    transactionHash: `0x${string}`;
    status: string;
    message: string;
    amount: string;
}>;
/**
 * Export all Magma tools
 */
export declare const magmaTools: {
    depositMon: typeof depositMon;
};

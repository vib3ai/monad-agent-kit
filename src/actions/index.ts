import { NATIVE_ACTIONS } from '../tools/native/actions';

// Combine all dapp actions
export const ACTIONS = {
    ...NATIVE_ACTIONS,
    // Add more dapp actions here as they are implemented
    // ...UNISWAP_ACTIONS,
    // ...OPENSEA_ACTIONS,
} as const; 
import { NATIVE_ACTIONS } from '../apps/native/actions';
import { NADFUN_ACTIONS } from '../apps/nadfun/actions';

// Combine all dapp actions
export const ACTIONS = {
    ...NATIVE_ACTIONS,
    ...NADFUN_ACTIONS,
    // Add more dapp actions here as they are implemented
    // ...UNISWAP_ACTIONS,
    // ...OPENSEA_ACTIONS,
} as const; 
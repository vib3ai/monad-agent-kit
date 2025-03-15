import { NATIVE_ACTIONS } from '../apps/native/actions';
import { NADFUN_ACTIONS } from '../apps/nadfun/actions';
import { KURU_ACTIONS } from '../apps/kuru/actions';

// Combine all dapp actions
export const ACTIONS = {
    ...NATIVE_ACTIONS,
    ...NADFUN_ACTIONS,
    ...KURU_ACTIONS,
    // Add more dapp actions here as they are implemented
    // ...UNISWAP_ACTIONS,
    // ...OPENSEA_ACTIONS,
} as const; 
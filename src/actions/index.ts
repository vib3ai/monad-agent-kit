import { NATIVE_ACTIONS } from '../apps/native/actions';
import { NADFUN_ACTIONS } from '../apps/nadfun/actions';
import { KURU_ACTIONS } from '../apps/kuru/actions';
import { SHMONAD_ACTIONS } from '../apps/shmonad/actions';
import { ENS_ACTIONS } from '../apps/ens/actions';

// Combine all dapp actions
export const ACTIONS = {
    ...NATIVE_ACTIONS,
    ...NADFUN_ACTIONS,
    ...KURU_ACTIONS,
    ...SHMONAD_ACTIONS,
    ...ENS_ACTIONS,
    // Add more dapp actions here as they are implemented
    // ...UNISWAP_ACTIONS,
    // ...OPENSEA_ACTIONS,
} as const; 
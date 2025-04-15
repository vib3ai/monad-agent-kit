import { NATIVE_ACTIONS } from '../apps/native/actions';
import { NADFUN_ACTIONS } from '../apps/nadfun/actions';
import { KURU_ACTIONS } from '../apps/kuru/actions';
import { SHMONAD_ACTIONS } from '../apps/shmonad/actions';
import { ENS_ACTIONS } from '../apps/ens/actions';
import { APRIORI_ACTIONS } from '../apps/apriori/actions';
import { MAGMA_ACTIONS } from '../apps/magma/actions';
import { ERC20_ACTIONS } from '../apps/erc20/actions';

// Combine all dapp actions
export const ACTIONS = {
    ...NATIVE_ACTIONS,
    ...NADFUN_ACTIONS,
    ...KURU_ACTIONS,
    ...SHMONAD_ACTIONS,
    ...ENS_ACTIONS,
    ...APRIORI_ACTIONS,
    ...MAGMA_ACTIONS,
    ...ERC20_ACTIONS,
    // Add more dapp actions here as they are implemented
    // ...UNISWAP_ACTIONS,
    // ...OPENSEA_ACTIONS,
} as const; 
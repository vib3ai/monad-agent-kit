"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIONS = void 0;
const actions_1 = require("../apps/native/actions");
const actions_2 = require("../apps/nadfun/actions");
const actions_3 = require("../apps/kuru/actions");
const actions_4 = require("../apps/shmonad/actions");
const actions_5 = require("../apps/ens/actions");
const actions_6 = require("../apps/apriori/actions");
const actions_7 = require("../apps/magma/actions");
// Combine all dapp actions
exports.ACTIONS = {
    ...actions_1.NATIVE_ACTIONS,
    ...actions_2.NADFUN_ACTIONS,
    ...actions_3.KURU_ACTIONS,
    ...actions_4.SHMONAD_ACTIONS,
    ...actions_5.ENS_ACTIONS,
    ...actions_6.APRIORI_ACTIONS,
    ...actions_7.MAGMA_ACTIONS,
    // Add more dapp actions here as they are implemented
    // ...UNISWAP_ACTIONS,
    // ...OPENSEA_ACTIONS,
};

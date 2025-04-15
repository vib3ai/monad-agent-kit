"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAllTools = createAllTools;
const langchain_1 = require("./native/langchain");
const langchain_2 = require("./nadfun/langchain");
const langchain_3 = require("./erc20/langchain");
const langchain_4 = require("./kuru/langchain");
const langchain_5 = require("./shmonad/langchain");
const langchain_6 = require("./ens/langchain");
const langchain_7 = require("./apriori/langchain");
const langchain_8 = require("./magma/langchain");
/**
 * Create all LangChain tools for all supported dapps
 * @param monadKit - The MonadAgentKit instance
 * @returns An array of LangChain tools
 */
function createAllTools(monadKit) {
    return [
        ...(0, langchain_1.createNativeTools)(monadKit),
        ...(0, langchain_2.createNadfunTools)(monadKit),
        ...(0, langchain_3.createERC20Tools)(monadKit),
        ...(0, langchain_4.createKuruTools)(monadKit),
        ...(0, langchain_5.createShmonadTools)(monadKit),
        ...(0, langchain_6.createENSTools)(monadKit),
        ...(0, langchain_7.createAprioriTools)(monadKit),
        ...(0, langchain_8.createMagmaTools)(monadKit),
        // Add more dapp tools here as they are implemented
        // ...createUniswapTools(monadKit),
        // ...createOpenseaTools(monadKit),
    ];
}

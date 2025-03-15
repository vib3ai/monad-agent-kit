import { MonadAgentKit } from '../agent';
import { createNativeTools } from './native/langchain';
import { createNadfunTools } from './nadfun/langchain';
import { createERC20Tools } from './erc20/langchain';
import { createKuruTools } from './kuru/langchain';
import { createShmonadTools } from './shmonad/langchain';
/**
 * Create all LangChain tools for all supported dapps
 * @param monadKit - The MonadAgentKit instance
 * @returns An array of LangChain tools
 */
export function createAllTools(monadKit: MonadAgentKit) {
    return [
        ...createNativeTools(monadKit),
        ...createNadfunTools(monadKit),
        ...createERC20Tools(monadKit),
        ...createKuruTools(monadKit),
        ...createShmonadTools(monadKit),
        // Add more dapp tools here as they are implemented
        // ...createUniswapTools(monadKit),
        // ...createOpenseaTools(monadKit),
    ];
} 
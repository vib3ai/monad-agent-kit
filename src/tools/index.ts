import { MonadAgentKit } from '../agent';
import { createNativeTools } from './native/langchain';

/**
 * Create all LangChain tools for all supported dapps
 * @param monadKit - The MonadAgentKit instance
 * @returns An array of LangChain tools
 */
export function createAllDappTools(monadKit: MonadAgentKit) {
    return [
        ...createNativeTools(monadKit),
        // Add more dapp tools here as they are implemented
        // ...createUniswapTools(monadKit),
        // ...createOpenseaTools(monadKit),
    ];
} 
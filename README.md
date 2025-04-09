# Monad Agent Kit

An open-source toolkit for connecting AI agents to Monad and other EVM protocols. Inspired by [Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit).

## Features

- Tools for interacting with Monad apps
- LangChain integration for AI agents
- Modular dapp-based architecture for easy extension
- A simple CLI interface to chat with the agent

## Installation

```bash
yarn add monad-agent-kit
```

## Quick Start

```typescript
import { MonadAgentKit, createAllTools } from 'monad-agent-kit';
import { get_balance, transfer } from 'monad-agent-kit/apps/native/tools';

// Initialize with private key
const privateKey = '0x' + 'your-private-key';
const agent = new MonadAgentKit(privateKey);

// Check wallet address
const address = agent.getWalletAddress();
console.log('Wallet address:', address);

// Check balance using native tools
const balanceResult = await get_balance(agent);
console.log('Wallet balance:', balanceResult.balance, 'ETH');

// Transfer tokens using native tools
const transferResult = await transfer(agent, '0x1234567890123456789012345678901234567890', '1.5');
console.log('Transaction hash:', transferResult.txHash);

// Create LangChain tools
const tools = createAllTools(agent);
```

## Chat Interface

The Monad Agent Kit includes an interactive chat interface that allows you to interact with an AI agent that has access to Monad blockchain tools.

To use the chat interface:

1. Set up your environment variables in a `.env` file:
   ```
   WALLET_PRIVATE_KEY=your_private_key_here
   MONAD_RPC_URL=https://rpc.monad.xyz/
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

2. Run the chat interface:
   ```bash
   yarn chat
   ```

3. Choose between chat mode and autonomous mode:
   - **Chat mode**: Interact directly with the AI agent
   - **Autonomous mode**: Let the agent run autonomously at regular intervals

## LangChain Integration

The Monad Agent Kit provides ready-to-use LangChain tools for AI agents:

```typescript
import { MonadAgentKit, createAllTools } from 'monad-agent-kit';
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Initialize the agent
const agent = new MonadAgentKit(privateKey);
const tools = createAllTools(agent);

// Create the LLM
const llm = new ChatOpenAI({ // or new ChatAnthropic({
  temperature: 0,
  modelName: 'gpt-4',
});

// Create the system prompt
const systemPrompt = `You are a helpful assistant that can interact with the Monad blockchain.
You have access to tools that allow you to check balances and transfer ETH.
Always be helpful, concise, and clear in your responses.`;

// Create the prompt template
const prompt = ChatPromptTemplate.fromMessages([
  ["system", systemPrompt],
  ["human", "{input}"],
]);

// Create the agent
const openAIAgent = createOpenAIFunctionsAgent({
  llm,
  tools,
  prompt,
});

const executor = AgentExecutor.fromAgentAndTools({
  agent: openAIAgent,
  tools,
});

// Run the agent
const result = await executor.invoke({
  input: 'What is my wallet balance?',
});

console.log(result.output);
```

## Supported DApps

Currently, the following DApps are supported:

- **Native**: Basic ETH operations (balance checking, transfers)
- **ERC20**: ERC20 operations
- **NadFun**: Create tokens with bonding curves and metadata
- **Kuru Exchange**: Quote price, swap tokens
- **SHMonad (FastLane)**: Stake, unstake MON
- **Nad Name Service**: Name registration, address mapping, and managing name attributes
- **Apriori**: Staking features
- **Magma**: Staking features

Coming soon:
- Uniswap
- OpenSea
- And more...

## Architecture

The project is organized by DApp, making it easy to add support for new protocols:

```
src/
├── agent/           # Core wallet functionality
├── apps/            # DApp implementations
│   ├── native/      # Native ETH operations
│   │   ├── tools/   # Low-level tools
│   │   ├── actions/ # Action definitions
│   │   └── langchain/ # LangChain tool wrappers
│   ├── nadfun/      # NadFun protocol
│   │   ├── tools/   # Low-level tools
│   │   ├── actions/ # Action definitions
│   │   └── langchain/ # LangChain tool wrappers
│   └── ... (other dapps)
├── actions/         # Combined actions from all dapps
├── bin/             # CLI tools and chat interface
└── utils/           # Shared utilities
```

To add a new DApp, create a new folder under `src/apps/` with the same structure.

## Development

1. Clone the repository
2. Install dependencies: `yarn install`
3. Create a `.env` file with your private key (see `.env.example`)
4. Run the test: `yarn test`
5. Try the chat interface: `yarn chat`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 

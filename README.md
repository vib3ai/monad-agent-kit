# Monad Agent Kit

An open-source toolkit for connecting AI agents to Monad and other EVM protocols. Inspired by [Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit) and [EVM Agent Kit](https://github.com/hiero-ai/evm-agent-kit).

## Features

- Check wallet balances
- Transfer native tokens (ETH)
- LangChain integration for AI agents
- Modular dapp-based architecture for easy extension

## Installation

```bash
yarn add monad-agent-kit
```

## Quick Start

```typescript
import { MonadAgentKit, createAllDappTools } from 'monad-agent-kit';

// Initialize with private key
const privateKey = '0x' + 'your-private-key';
const agent = new MonadAgentKit(privateKey);

// Check balance
const balance = await agent.getBalance();
console.log('Wallet balance:', balance, 'ETH');

// Transfer tokens
const txHash = await agent.transfer('0x1234567890123456789012345678901234567890', '1.5');
console.log('Transaction hash:', txHash);

// Create LangChain tools
const tools = createAllDappTools(agent);
```

## LangChain Integration

The Monad Agent Kit provides ready-to-use LangChain tools for AI agents:

```typescript
import { MonadAgentKit, createAllDappTools } from 'monad-agent-kit';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AgentExecutor, createReactAgent } from 'langchain/agents';

// Initialize the agent
const agent = new MonadAgentKit(privateKey);
const tools = createAllDappTools(agent);

// Create the LLM
const llm = new ChatOpenAI({
  temperature: 0,
  modelName: 'gpt-4',
});

// Create the agent
const reactAgent = createReactAgent({
  llm,
  tools,
});

const agentExecutor = AgentExecutor.fromAgentAndTools({
  agent: reactAgent,
  tools,
});

// Run the agent
const result = await agentExecutor.invoke({
  input: 'What is my wallet balance?',
});

console.log(result.output);
```

## Supported DApps

Currently, the following DApps are supported:

- **Native**: Basic ETH operations (balance checking, transfers)

Coming soon:
- Uniswap
- OpenSea
- And more...

## Architecture

The project is organized by DApp, making it easy to add support for new protocols:

```
src/
├── agent/           # Core wallet functionality
├── dapps/           # DApp-specific implementations
│   ├── native/      # Native ETH operations
│   │   ├── tools/   # Low-level tools
│   │   ├── actions/ # Action definitions
│   │   └── langchain/ # LangChain tool wrappers
│   └── ... (other dapps)
├── actions/         # Combined actions from all dapps
└── utils/           # Shared utilities
```

To add a new DApp, create a new folder under `src/dapps/` with the same structure.

## Development

1. Clone the repository
2. Install dependencies: `yarn install`
3. Create a `.env` file with your private key (see `.env.example`)
4. Run the test: `yarn test`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 
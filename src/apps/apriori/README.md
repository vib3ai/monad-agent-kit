# Apriori Staking

This integration allows agents to interact with the Apriori staking contract on Monad.

## Features

- Deposit assets into the Apriori staking contract

## Contract Information

- Staking Contract: `0x1234567890123456789012345678901234567890` (Update with actual contract address)

## Usage

### Deposit Assets

Deposit ETH into the Apriori staking contract to earn rewards:

```typescript
import { MonadAgentKit, monad } from '../../src';
import { APRIORI_ACTIONS } from '../../src/apps/apriori/actions';
import { parseEther } from 'viem';

// Initialize the agent
const agent = new MonadAgentKit(
    process.env.WALLET_PRIVATE_KEY!,
    monad,
    process.env.MONAD_RPC_URL!,
);

// Deposit 0.1 ETH
const amount = parseEther('0.1');
const result = await APRIORI_ACTIONS.deposit(agent, amount);

console.log('Transaction Hash:', result.transactionHash);
console.log('Status:', result.status);
console.log('Amount:', result.amount);
console.log('Receiver:', result.receiver);
```

## AI Agent Chat

In the chat interface, you can use the Apriori staking functionality with commands like:

- "Deposit 0.1 ETH into Apriori staking"
- "Stake 0.5 ETH in Apriori" 
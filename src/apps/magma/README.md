# Magma Staking

This integration allows agents to interact with the Magma staking contract on Monad.

## Features

- Deposit MON into the Magma staking contract to earn gMON tokens

## Contract Information

- Staking Contract: `0xb2f82D0f38dc453D596Ad40A37799446Cc89274A` (Update with actual contract address)

## Usage

### Deposit MON (No Referral)

Deposit MON into the Magma staking contract to earn gMON tokens:

```typescript
import { MonadAgentKit, monad } from '../../src';
import { MAGMA_ACTIONS } from '../../src/apps/magma/actions';
import { parseEther } from 'viem';

// Initialize the agent
const agent = new MonadAgentKit(
    process.env.WALLET_PRIVATE_KEY!,
    monad,
    process.env.MONAD_RPC_URL!,
);

// Deposit 0.1 MON
const amount = parseEther('0.1');
const result = await MAGMA_ACTIONS.depositMon(agent, amount);

console.log('Transaction Hash:', result.transactionHash);
console.log('Status:', result.status);
console.log('Amount:', result.amount);
```

## AI Agent Chat

In the chat interface, you can use the Magma staking functionality with commands like:

- "Deposit 0.1 MON into Magma staking"
- "Stake 0.5 MON in Magma" 
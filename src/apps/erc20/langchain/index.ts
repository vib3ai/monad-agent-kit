import { Tool } from 'langchain/tools';
import { MonadAgentKit } from '../../../agent';
import { erc20Tools } from '../tools';
import { findTokenAddress, getTokenName, getSupportedTokens } from '../utils/token-finder';

/**
 * LangChain tool for getting the balance of an ERC20 token
 */
export class ERC20BalanceTool extends Tool {
    name = 'erc20_balance';
    description = `Get the balance of an ERC20 token for a specific address.
    
    Inputs (input is a JSON string):
    tokenAddress: string (optional) - The address of the ERC20 token
    token: string (optional) - The name or symbol of the token (e.g., "USDT", "USDC")
    ownerAddress: string (optional) - The address to check the balance for (defaults to the wallet address)

    Note: Either tokenAddress or token must be provided. Supported tokens: USDT (Tether), USDC (USD Coin), STIP (Monad Protocol IP).`;

    private agent: MonadAgentKit;

    constructor(agent: MonadAgentKit) {
        super();
        this.agent = agent;
    }

    async _call(args: string): Promise<string> {
        try {
            // Parse the input JSON
            const input = JSON.parse(args);

            // Validate required fields
            if (!input.tokenAddress && !input.token) {
                // List supported tokens in the error message
                const supportedTokens = getSupportedTokens()
                    .map(t => `${t.name} (${t.address})`)
                    .join(', ');

                return JSON.stringify({
                    status: 'error',
                    message: `Missing required field: either tokenAddress or token name/symbol must be provided. Supported tokens: ${supportedTokens}`
                });
            }

            // Find the token address if a name/symbol was provided
            let tokenAddress = input.tokenAddress;
            if (!tokenAddress && input.token) {
                tokenAddress = findTokenAddress(input.token);
                if (!tokenAddress) {
                    // List supported tokens in the error message
                    const supportedTokens = getSupportedTokens()
                        .map(t => `${t.name} (${t.address})`)
                        .join(', ');

                    return JSON.stringify({
                        status: 'error',
                        message: `Unknown token: "${input.token}". Supported tokens: ${supportedTokens}`
                    });
                }
            }

            // Get the token balance
            const balance = await erc20Tools.getTokenBalance(
                this.agent,
                tokenAddress,
                input.ownerAddress
            );

            // Get a human-readable token name
            const tokenName = getTokenName(tokenAddress);

            return JSON.stringify({
                status: 'success',
                balance,
                tokenAddress,
                tokenName,
                ownerAddress: input.ownerAddress || this.agent.getWalletAddress()
            });
        } catch (error: any) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while getting the token balance') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}

/**
 * LangChain tool for transferring ERC20 tokens
 */
export class ERC20TransferTool extends Tool {
    name = 'erc20_transfer';
    description = `Transfer ERC20 tokens to another address.
    
    Inputs (input is a JSON string):
    tokenAddress: string - The address of the ERC20 token
    to: string - The recipient address
    amount: string - The amount to transfer (in token units, not wei)`;

    private agent: MonadAgentKit;

    constructor(agent: MonadAgentKit) {
        super();
        this.agent = agent;
    }

    async _call(args: string): Promise<string> {
        try {
            // Parse the input JSON
            const input = JSON.parse(args);

            // Validate required fields
            if (!input.tokenAddress) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: tokenAddress'
                });
            }

            if (!input.to) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: to'
                });
            }

            if (!input.amount) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: amount'
                });
            }

            // Transfer the tokens
            const txHash = await erc20Tools.transferToken(
                this.agent,
                input.tokenAddress,
                input.to,
                input.amount
            );

            return JSON.stringify({
                status: 'success',
                txHash,
                tokenAddress: input.tokenAddress,
                to: input.to,
                amount: input.amount,
                from: this.agent.getWalletAddress()
            });
        } catch (error: any) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while transferring tokens') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}

/**
 * LangChain tool for approving ERC20 token spending
 */
export class ERC20ApproveTool extends Tool {
    name = 'erc20_approve';
    description = `Approve an address to spend tokens on behalf of the wallet owner.
    
    Inputs (input is a JSON string):
    tokenAddress: string - The address of the ERC20 token
    spender: string - The address to approve
    amount: string - The amount to approve (in token units, not wei)`;

    private agent: MonadAgentKit;

    constructor(agent: MonadAgentKit) {
        super();
        this.agent = agent;
    }

    async _call(args: string): Promise<string> {
        try {
            // Parse the input JSON
            const input = JSON.parse(args);

            // Validate required fields
            if (!input.tokenAddress) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: tokenAddress'
                });
            }

            if (!input.spender) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: spender'
                });
            }

            if (!input.amount) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: amount'
                });
            }

            // Approve the tokens
            const txHash = await erc20Tools.approveToken(
                this.agent,
                input.tokenAddress,
                input.spender,
                input.amount
            );

            return JSON.stringify({
                status: 'success',
                txHash,
                tokenAddress: input.tokenAddress,
                spender: input.spender,
                amount: input.amount,
                owner: this.agent.getWalletAddress()
            });
        } catch (error: any) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while approving tokens') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}

/**
 * LangChain tool for getting ERC20 token allowance
 */
export class ERC20AllowanceTool extends Tool {
    name = 'erc20_allowance';
    description = `Get the allowance of tokens that a spender can use on behalf of the owner.
    
    Inputs (input is a JSON string):
    tokenAddress: string - The address of the ERC20 token
    ownerAddress: string - The address of the token owner
    spenderAddress: string - The address of the spender`;

    private agent: MonadAgentKit;

    constructor(agent: MonadAgentKit) {
        super();
        this.agent = agent;
    }

    async _call(args: string): Promise<string> {
        try {
            // Parse the input JSON
            const input = JSON.parse(args);

            // Validate required fields
            if (!input.tokenAddress) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: tokenAddress'
                });
            }

            if (!input.ownerAddress) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: ownerAddress'
                });
            }

            if (!input.spenderAddress) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: spenderAddress'
                });
            }

            // Get the token allowance
            const allowance = await erc20Tools.getTokenAllowance(
                this.agent,
                input.tokenAddress,
                input.ownerAddress,
                input.spenderAddress
            );

            return JSON.stringify({
                status: 'success',
                allowance,
                tokenAddress: input.tokenAddress,
                ownerAddress: input.ownerAddress,
                spenderAddress: input.spenderAddress
            });
        } catch (error: any) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while getting token allowance') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}

/**
 * LangChain tool for getting ERC20 token information
 */
export class ERC20InfoTool extends Tool {
    name = 'erc20_info';
    description = `Get information about an ERC20 token (name, symbol, decimals, total supply).
    
    Inputs (input is a JSON string):
    tokenAddress: string - The address of the ERC20 token`;

    private agent: MonadAgentKit;

    constructor(agent: MonadAgentKit) {
        super();
        this.agent = agent;
    }

    async _call(args: string): Promise<string> {
        try {
            // Parse the input JSON
            const input = JSON.parse(args);

            // Validate required fields
            if (!input.tokenAddress) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Missing required field: tokenAddress'
                });
            }

            // Get the token info
            const info = await erc20Tools.getTokenInfo(
                this.agent,
                input.tokenAddress
            );

            return JSON.stringify({
                status: 'success',
                info,
                tokenAddress: input.tokenAddress
            });
        } catch (error: any) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while getting token info') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}

/**
 * Create all LangChain tools for ERC20 interactions
 * @param agent - The MonadAgentKit instance
 * @returns An array of LangChain tools for ERC20 interactions
 */
export function createERC20Tools(agent: MonadAgentKit) {
    return [
        new ERC20BalanceTool(agent),
        new ERC20TransferTool(agent),
        new ERC20ApproveTool(agent),
        new ERC20AllowanceTool(agent),
        new ERC20InfoTool(agent),
    ];
}
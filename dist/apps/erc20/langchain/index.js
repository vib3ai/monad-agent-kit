"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20InfoTool = exports.ERC20AllowanceTool = exports.ERC20ApproveTool = exports.ERC20TransferTool = exports.ERC20BalanceTool = void 0;
exports.createERC20Tools = createERC20Tools;
const tools_1 = require("langchain/tools");
const tools_2 = require("../tools");
const token_finder_1 = require("../utils/token-finder");
/**
 * LangChain tool for getting the balance of an ERC20 token
 */
class ERC20BalanceTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.name = 'erc20_balance';
        this.description = `Get the balance of an ERC20 token for a specific address.
    
    Inputs (input is a JSON string):
    tokenAddress: string (optional) - The address of the ERC20 token
    token: string (optional) - The name or symbol of the token (e.g., "USDT", "USDC")
    ownerAddress: string (optional) - The address to check the balance for (defaults to the wallet address)

    Note: Either tokenAddress or token must be provided. Supported tokens: USDT (Tether), USDC (USD Coin), STIP (Monad Protocol IP).`;
        this.agent = agent;
    }
    async _call(args) {
        try {
            // Parse the input JSON
            const input = JSON.parse(args);
            // Validate required fields
            if (!input.tokenAddress && !input.token) {
                // List supported tokens in the error message
                const supportedTokens = (0, token_finder_1.getSupportedTokens)()
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
                tokenAddress = (0, token_finder_1.findTokenAddress)(input.token);
                if (!tokenAddress) {
                    // List supported tokens in the error message
                    const supportedTokens = (0, token_finder_1.getSupportedTokens)()
                        .map(t => `${t.name} (${t.address})`)
                        .join(', ');
                    return JSON.stringify({
                        status: 'error',
                        message: `Unknown token: "${input.token}". Supported tokens: ${supportedTokens}`
                    });
                }
            }
            // Get the token balance
            const balance = await tools_2.erc20Tools.getTokenBalance(this.agent, tokenAddress, input.ownerAddress);
            // Get a human-readable token name
            const tokenName = (0, token_finder_1.getTokenName)(tokenAddress);
            return JSON.stringify({
                status: 'success',
                balance,
                tokenAddress,
                tokenName,
                ownerAddress: input.ownerAddress || this.agent.getWalletAddress()
            });
        }
        catch (error) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while getting the token balance') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}
exports.ERC20BalanceTool = ERC20BalanceTool;
/**
 * LangChain tool for transferring ERC20 tokens
 */
class ERC20TransferTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.name = 'erc20_transfer';
        this.description = `Transfer ERC20 tokens to another address.
    
    Inputs (input is a JSON string):
    tokenAddress: string - The address of the ERC20 token
    to: string - The recipient address
    amount: string - The amount to transfer (in token units, not wei)`;
        this.agent = agent;
    }
    async _call(args) {
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
            const txHash = await tools_2.erc20Tools.transferToken(this.agent, input.tokenAddress, input.to, input.amount);
            return JSON.stringify({
                status: 'success',
                txHash,
                tokenAddress: input.tokenAddress,
                to: input.to,
                amount: input.amount,
                from: this.agent.getWalletAddress()
            });
        }
        catch (error) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while transferring tokens') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}
exports.ERC20TransferTool = ERC20TransferTool;
/**
 * LangChain tool for approving ERC20 token spending
 */
class ERC20ApproveTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.name = 'erc20_approve';
        this.description = `Approve an address to spend tokens on behalf of the wallet owner.
    
    Inputs (input is a JSON string):
    tokenAddress: string - The address of the ERC20 token
    spender: string - The address to approve
    amount: string - The amount to approve (in token units, not wei)`;
        this.agent = agent;
    }
    async _call(args) {
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
            const txHash = await tools_2.erc20Tools.approveToken(this.agent, input.tokenAddress, input.spender, input.amount);
            return JSON.stringify({
                status: 'success',
                txHash,
                tokenAddress: input.tokenAddress,
                spender: input.spender,
                amount: input.amount,
                owner: this.agent.getWalletAddress()
            });
        }
        catch (error) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while approving tokens') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}
exports.ERC20ApproveTool = ERC20ApproveTool;
/**
 * LangChain tool for getting ERC20 token allowance
 */
class ERC20AllowanceTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.name = 'erc20_allowance';
        this.description = `Get the allowance of tokens that a spender can use on behalf of the owner.
    
    Inputs (input is a JSON string):
    tokenAddress: string - The address of the ERC20 token
    ownerAddress: string - The address of the token owner
    spenderAddress: string - The address of the spender`;
        this.agent = agent;
    }
    async _call(args) {
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
            const allowance = await tools_2.erc20Tools.getTokenAllowance(this.agent, input.tokenAddress, input.ownerAddress, input.spenderAddress);
            return JSON.stringify({
                status: 'success',
                allowance,
                tokenAddress: input.tokenAddress,
                ownerAddress: input.ownerAddress,
                spenderAddress: input.spenderAddress
            });
        }
        catch (error) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while getting token allowance') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}
exports.ERC20AllowanceTool = ERC20AllowanceTool;
/**
 * LangChain tool for getting ERC20 token information
 */
class ERC20InfoTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.name = 'erc20_info';
        this.description = `Get information about an ERC20 token (name, symbol, decimals, total supply).
    
    Inputs (input is a JSON string):
    tokenAddress: string - The address of the ERC20 token`;
        this.agent = agent;
    }
    async _call(args) {
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
            const info = await tools_2.erc20Tools.getTokenInfo(this.agent, input.tokenAddress);
            return JSON.stringify({
                status: 'success',
                info,
                tokenAddress: input.tokenAddress
            });
        }
        catch (error) {
            return JSON.stringify({
                status: 'error',
                message: (error.message || 'An error occurred while getting token info') + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code
            });
        }
    }
}
exports.ERC20InfoTool = ERC20InfoTool;
/**
 * Create all LangChain tools for ERC20 interactions
 * @param agent - The MonadAgentKit instance
 * @returns An array of LangChain tools for ERC20 interactions
 */
function createERC20Tools(agent) {
    return [
        new ERC20BalanceTool(agent),
        new ERC20TransferTool(agent),
        new ERC20ApproveTool(agent),
        new ERC20AllowanceTool(agent),
        new ERC20InfoTool(agent),
    ];
}

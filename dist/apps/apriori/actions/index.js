"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APRIORI_ACTIONS = void 0;
exports.deposit = deposit;
const tools_1 = require("../tools");
/**
 * Deposit assets into the Apriori staking contract
 * @param agent The MonadAgentKit instance
 * @param assets The amount of assets to deposit (in wei)
 * @param receiver The address to receive the staking shares (defaults to the sender's address)
 * @returns Transaction hash and deposit details
 */
async function deposit(agent, assets, receiver) {
    try {
        const result = await tools_1.aprioriTools.deposit(agent, assets, receiver);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Export Apriori actions
 */
exports.APRIORI_ACTIONS = {
    deposit
};

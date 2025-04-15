"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAGMA_ACTIONS = void 0;
exports.depositMon = depositMon;
const tools_1 = require("../tools");
/**
 * Deposit MON into the Magma staking contract
 * @param agent The MonadAgentKit instance
 * @param amount The amount of MON to deposit (in wei)
 * @returns Transaction hash and deposit details
 */
async function depositMon(agent, amount) {
    try {
        const result = await tools_1.magmaTools.depositMon(agent, amount);
        return result;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Export Magma actions
 */
exports.MAGMA_ACTIONS = {
    depositMon
};

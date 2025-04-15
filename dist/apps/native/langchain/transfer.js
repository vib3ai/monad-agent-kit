"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeTransferTool = void 0;
const tools_1 = require("langchain/tools");
const tools_2 = require("../tools");
class NativeTransferTool extends tools_1.Tool {
    constructor(monadKit) {
        super();
        this.monadKit = monadKit;
        this.name = 'native_transfer';
        this.description = `Transfer native tokens (ETH) to another address.
  
  Inputs (input is a JSON string):
  to: string - The recipient address
  amount: string - The amount to transfer in ETH`;
    }
    async _call(input) {
        try {
            const params = JSON.parse(input);
            if (!params.to) {
                throw new Error('Recipient address (to) is required');
            }
            if (!params.amount) {
                throw new Error('Amount is required');
            }
            const result = await (0, tools_2.transfer)(this.monadKit, params.to, params.amount);
            return JSON.stringify(result);
        }
        catch (error) {
            return JSON.stringify({
                status: 'error',
                message: error.message + '. DO NOT retry automatically - please report this error to the user.',
                code: error.code || 'UNKNOWN_ERROR',
            });
        }
    }
}
exports.NativeTransferTool = NativeTransferTool;

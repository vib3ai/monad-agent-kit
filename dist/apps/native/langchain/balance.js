"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeBalanceTool = void 0;
const tools_1 = require("langchain/tools");
const tools_2 = require("../tools");
class NativeBalanceTool extends tools_1.Tool {
    constructor(monadKit) {
        super();
        this.monadKit = monadKit;
        this.name = 'native_balance';
        this.description = `Get the balance of a Monad wallet.
  If you want to get the balance of your wallet, you don't need to provide the address.
  
  Inputs (input is a JSON string):
  address: string (optional) - The address to check balance for`;
    }
    async _call(input) {
        try {
            const params = input ? JSON.parse(input) : {};
            const result = await (0, tools_2.get_balance)(this.monadKit, params.address);
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
exports.NativeBalanceTool = NativeBalanceTool;

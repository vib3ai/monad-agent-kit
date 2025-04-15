"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNativeTools = createNativeTools;
const balance_1 = require("./balance");
const transfer_1 = require("./transfer");
function createNativeTools(monadKit) {
    return [
        new balance_1.NativeBalanceTool(monadKit),
        new transfer_1.NativeTransferTool(monadKit),
    ];
}

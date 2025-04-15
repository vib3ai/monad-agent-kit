"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NATIVE_ACTIONS = void 0;
const balance_1 = __importDefault(require("./balance"));
const transfer_1 = __importDefault(require("./transfer"));
exports.NATIVE_ACTIONS = {
    BALANCE: balance_1.default,
    TRANSFER: transfer_1.default,
};

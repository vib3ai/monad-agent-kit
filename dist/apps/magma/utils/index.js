"use strict";
/**
 * Utilities for the Magma staking app
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAKING_ABI = void 0;
const stake_json_1 = __importDefault(require("../abi/stake.json"));
exports.STAKING_ABI = stake_json_1.default;

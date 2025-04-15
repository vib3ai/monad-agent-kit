"use strict";
/**
 * Magma Staking Integration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAGMA_CONTRACTS = exports.createMagmaTools = exports.MAGMA_ACTIONS = exports.magmaTools = void 0;
const tools_1 = require("./tools");
Object.defineProperty(exports, "magmaTools", { enumerable: true, get: function () { return tools_1.magmaTools; } });
const actions_1 = require("./actions");
Object.defineProperty(exports, "MAGMA_ACTIONS", { enumerable: true, get: function () { return actions_1.MAGMA_ACTIONS; } });
const langchain_1 = require("./langchain");
Object.defineProperty(exports, "createMagmaTools", { enumerable: true, get: function () { return langchain_1.createMagmaTools; } });
const constants_1 = require("./constants");
Object.defineProperty(exports, "MAGMA_CONTRACTS", { enumerable: true, get: function () { return constants_1.MAGMA_CONTRACTS; } });

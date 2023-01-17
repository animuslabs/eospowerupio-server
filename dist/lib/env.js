"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const eosio_1 = require("@greymass/eosio");
require("dotenv").config();
const readEnv = (0, fs_extra_1.readJSONSync)("../.env.json");
let useChain = process.env.CHAIN;
if (useChain)
    useChain = useChain.toLowerCase();
if (!useChain)
    useChain = readEnv.default;
const untyped = readEnv.chain[useChain];
const typed = {
    chain: useChain,
    contractAccount: eosio_1.Name.from(untyped.contractAccount),
    endpoints: untyped.endpoints.map(el => new URL(el)),
    keys: untyped.keys.map(el => eosio_1.PrivateKey.from(el)),
    workerAccount: eosio_1.Name.from(untyped.workerAccount),
    workerPermission: eosio_1.Name.from(untyped.workerPermission),
    telegramKey: untyped === null || untyped === void 0 ? void 0 : untyped.telegramKey,
    discordKey: untyped === null || untyped === void 0 ? void 0 : untyped.discordKey,
    nftContract: untyped === null || untyped === void 0 ? void 0 : untyped.nftContract
};
const config = typed;
exports.default = config;
//# sourceMappingURL=env.js.map
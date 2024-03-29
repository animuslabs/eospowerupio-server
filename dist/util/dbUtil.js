"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../lib/db.js"));
async function init() {
    try {
        const oldPowerUps = await db_1.default.transfer.deleteMany();
        console.log("Removed transfer", oldPowerUps.count);
        const rpcErrors = await db_1.default.stats.deleteMany();
        console.log("Removed stats", rpcErrors);
    }
    catch (error) {
        console.log(error.toString());
    }
}
init().finally(db_1.default.$disconnect);
//# sourceMappingURL=dbUtil.js.map
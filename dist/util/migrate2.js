"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const db_1 = __importDefault(require("../lib/db.js"));
async function init() {
    try {
        const sqlite = await (0, sqlite_1.open)({
            filename: "../prisma/dev.db",
            driver: sqlite3_1.default.Database
        });
        const rows = await sqlite.all(`
    SELECT *
    FROM Logbuyram
    `);
        console.log(rows.length);
        console.log(rows[0].txid);
        let i = 0;
        for (let row of rows) {
            i++;
            const result = await db_1.default.logbuyram.create({ data: row });
            console.log(result);
            console.log(i);
        }
    }
    catch (error) {
        console.error(error);
    }
}
init().then(db_1.default.$disconnect);
let allTables = `
SELECT
  name
FROM
  sqlite_schema
WHERE
  type ='table' AND
  name NOT LIKE 'sqlite_%';
`;
//# sourceMappingURL=migrate2.js.map
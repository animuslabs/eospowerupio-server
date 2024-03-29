import sqlite3 from "sqlite3"
import { open } from "sqlite"
import db from "../lib/db"
import { Stats, blacklist, Logbuyram, Logpowerup, Transfer } from "@prisma/client"

async function init() {
  try {
    const sqlite = await open({
      filename: "../prisma/1dev.db",
      driver: sqlite3.Database
    })
    const rows:Stats[] = await sqlite.all(`
    SELECT *
    FROM Stats
    `)
    console.log(rows.length)
    // return
    // console.log(rows[0].txid);
    // const result = await db.logpowerup.createMany({ data: rows, skipDuplicates: true })
    // console.log(result);
    let i = 0
    for (let row of rows) {
      i++
      const result = await db.stats.create({ data: row })
      console.log(result)
      console.log(i)
    }
  } catch (error) {
    console.error(error)
  }
}

init().then(db.$disconnect)


let allTables = `
SELECT
  name
FROM
  sqlite_schema
WHERE
  type ='table' AND
  name NOT LIKE 'sqlite_%';
`

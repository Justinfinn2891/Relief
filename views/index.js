import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

(async () => {
    // open the database
    const db = await open({
      filename: '/database.db',
      driver: sqlite3.Database
    })
})()

db.on('trace', (data) => {})

await db.close()
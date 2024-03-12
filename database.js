import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Crzy12123',
    database: 'Relief'
}).promise()

const result = await pool.query("SELECT *FROM relief_users")
console.log(result)

s
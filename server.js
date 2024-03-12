const express = require('express')
const mysql = require('mysql2')

const server = express()
const port = 3000

var indexPath = require('path')

server.use(express.static(__dirname + '/views'))

server.get('/', (req, res) => {
    res.sendFile(indexPath.resolve('../views/index.html'))
})

server.get('/survey', (req, res) => {
    res.sendFile(indexPath.resolve('views/survey.html'))

})

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

const pool = mysql.createPool({
    host: '208.87.75.10',
    user: 'root',
    password: 'Crzy12123',
    database: 'relief'
}).promise()

const result = await pool.query("SELECT *FROM relief_users")
console.log(result)



// Create connection pool

const express = require('express')
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


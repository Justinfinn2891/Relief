// CHANGED IT FROM CONST EXPRESS TO IMPORT FOR CONSOLE ERRORS (CAN BE CHANGED BACK)
import express from 'express'
const server = express()
const port = 3000

// IMPORTING FUNCTIONS FROM DATABASE.JS FILE 
import {getNote, getNotes, createNote} from './database.js'

var indexPath = require('path')

server.use(express.static(__dirname + '/views'))

server.get('/', (req, res) => {
    res.sendFile(indexPath.resolve('../views/index.html'))
})

server.get('/survey', (req, res) => {
    res.sendFile(indexPath.resolve('views/survey.html'))

})
// EXAMPLE OF DATABASE BEING CONNECTED TO SERVER
server.get("/notes", async (req, res) => {
    const notes = await getNotes()
    res.send(notes)
})

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})


// CHANGED IT FROM CONST EXPRESS TO IMPORT FOR CONSOLE ERRORS (CAN BE CHANGED BACK)
const express = require('express')
const server = express()
const port = 3000

// IMPORTING FUNCTIONS FROM DATABASE.JS FILE 
let {getNote, getNotes, createNote} = require('./database.js')

const indexPath = require('path')

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

server.post("/loginsubmit", (req, res) => {
    let data = req.body;
    console.log(data);
})

/*server.post('/', (req, res) => {
    let data = req.body;
    pool.connect((err) => {
        if (err) throw err;
        pool.query(`INSERT INTO relief_users(username, password) VALUES ('${data.username}', '${data.password}')`, (err) => {
            if (err) throw err;
        });
    });
    pool.connect((err) => {
        if (err) throw err;
        pool.query('SELECT * FROM USERS', (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    });
    res.sendFile(indexPath.resolve(__dirname + '/../dist/index.html'))
});

*/
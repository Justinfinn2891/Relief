// CHANGED IT FROM CONST EXPRESS TO IMPORT FOR CONSOLE ERRORS (CAN BE CHANGED BACK)
const express = require('express')
const server = express()
const port = 3001

// IMPORTING FUNCTIONS FROM DATABASE.JS FILE 
let {getNote, getNotes, createNote, sendLogin, createLogin} = require('./database.js')
const indexPath = require('path')

server.use(express.static(__dirname + '/views'))
server.use(express.json());

server.get('/', (req, res) => {
    res.sendFile(indexPath.resolve('../views/index.html'))
});

// EXAMPLE OF DATABASE BEING CONNECTED TO SERVER


server.listen(port, () => {
    console.log('Listening at http://localhost:${port}')
});

server.post("/loginsubmit", async (req, res) => {
    let { username, password } = req.body;
    const log = await sendLogin(username, password)
    res.json(log);
    console.log(log); 
    console.log(username);
    console.log(password);

});

server.post("/registersubmit", async (req, res) => {
    let { username, password } = req.body;
    const log = await createLogin(username, password);
    res.json(log);
    console.log(log); 
    console.log(username);
    console.log(password);
});


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
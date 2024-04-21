// CHANGED IT FROM CONST EXPRESS TO IMPORT FOR CONSOLE ERRORS (CAN BE CHANGED BACK)
const express = require('express')
const server = express()
const port = 3001

// IMPORTING FUNCTIONS FROM DATABASE.JS FILE 
let {getNote, getNotes, createNote, sendLogin, createLogin, createProfile, findID, findVerification, fetchUserProfile, createSurvey, findSurveyVerification, modifySurvey} = require('./database.js')
const indexPath = require('path')
const { verify } = require('crypto')

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
    let { email, username, password } = req.body;
    const log = await sendLogin(email, username, password)
    const yes = await findID(email);
    res.json({ loginResponse: log, idResponse: yes });
    console.log(yes);
    console.log(log); 
    console.log(email);
    console.log(username);
    console.log(password);

});

server.post("/registersubmit", async (req, res) => {
    let { email, username, password } = req.body;
    const log = await createLogin(email, username, password);
    res.json(log);
    console.log(log); 
    console.log(email);
    console.log(username);
    console.log(password);
});

server.post("/profilesubmit", async (req, res) => {
    console.log("hello");
    try {
        let { age, weight, height, address, zipcode, ssn, login_id, verification, phone, name, eAddress, ePhone, eEmail } = req.body;
        console.log(eAddress);
        console.log(ePhone);
        console.log(eEmail);
        console.log(weight);
        const log = await createProfile(age, weight, height, address, zipcode, ssn, login_id, verification, phone, name, eAddress, ePhone, eEmail);
        res.json(log);
        console.log(age);
        console.log(weight);
    } catch (error) {
        console.error("Error processing profile submission:", error);
        res.status(500).json({ error: "An error occurred while processing your profile submission." });
    }
});

server.post("/profile", async (req, res) => {
    let { id } = req.body;
    const log = await findVerification(id);
    res.json(log); 
});


server.post('/profileinfo', (req, res) => {
    // Get the login_id from the request body
    const loginId = req.body.login_id;
    
    console.log("hola");
    // Call the fetchUserProfile function to get the user profile
    fetchUserProfile(loginId, (error, userProfile) => {
      if (error) {
        // If there's an error, send a 404 status and error message
        return res.status(404).json({ error: 'User not found' });
      }
      // If successful, send the user profile data as a JSON response
      res.json(userProfile);
    });
  });

  server.post("/surveysubmit", async (req, res) => {
    let { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId} = req.body;
    {
            let verification = await findSurveyVerification(loginId);
            console.log("yes");
            console.log(verification);
            if(verification === 0)
            {
            const log = await createSurvey(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId, verification); 
            res.json(log);
            }

            if(verification >= 1){
            const log = await modifySurvey(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId, verification); 
            res.json(log);
    
            }
        }
    

        
       
    /*
    else{
        const log = await createSurvey(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId, verification);
    }
    */


   
    
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
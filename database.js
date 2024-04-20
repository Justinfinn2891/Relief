let mysql = require('mysql2')

 
// ADDS SECURITY TO POOL VARAIBLE 
let dotenv = require('dotenv')
dotenv.config()

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

con.connect(function(err) {
    if(err) throw err;
    con.query("SELECT * FROM relief_users", function (err, result, fields) {
        if(err) throw err;
        console.log(result);
    });
});



async function sendLogin(Email, Username, Password, res){
    try {
        
        const [rows] = await con.promise().query('SELECT * FROM relief_login WHERE Email = ? AND Username = ? AND Password = ?', [Email, Username, Password]);
        if (rows.length === 1) {
            
            return 1; 
        } else {
            return 0; 
            
        }
    } catch (error) {
        console.error('Error executing query:', error);
        
    }
}
async function createLogin(email, username, password){
    try {
        const[result] = await con.promise().query(
            `INSERT INTO relief_login(email, username, password)
            VALUES (?,?,?)`
        , [email, username, password]);
        return 1; // Successfully inserted
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return 0; // Duplicate entry
        } else {
            throw error; // Other errors
        }
    }
}

async function findID(email) {
    try {
        const [rows, fields] = await con.promise().query(
            'SELECT login_id FROM relief_login WHERE email = ?', [email]);
        // Extract the login_id value from the first row, if available
        const loginId = rows.length > 0 ? rows[0].login_id : null;
        return loginId; // Return the login_id value
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to handle it at the caller level
    }
}

async function createProfile(age, weight, height, address, zipcode, ssn, login_id, verification, phone, name) {
    try {
        const [result] = await con.promise().query(
            `INSERT INTO relief_users(Age, Weight, Height, Address, Zipcode, SSN, login_id, verification, phone, name)
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [age, weight, height, address, zipcode, ssn, login_id, verification, phone, name]
        );
        return 1; // Successfully inserted
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return 0; // Duplicate entry
        } else {
            throw error; // Other errors
        }
    }
}
async function findVerification(id)
{
    try {
        const [rows, fields] = await con.promise().query(
            'SELECT verification FROM relief_users WHERE login_id = ?', [id]);
        // Extract the login_id value from the first row, if available
        const verification = rows.length > 0 ? rows[0].verification : null;
        console.log(verification);
        return verification; // Return the login_id value
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to handle it at the caller level
    }
}

async function findSurveyVerification(id)
{
    try {
        const [rows, fields] = await con.promise().query(
            'SELECT verification FROM relief_answers WHERE login_id = ?', [id]);
        // Extract the login_id value from the first row, if available
        const verification = rows.length > 0 ? rows[0].verification : null;
        console.log(verification);
        return verification; // Return the login_id value
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to handle it at the caller level
    }
}

async function fetchUserProfile(loginId, callback) {
    // Execute the SQL query to select user profile data along with username, email, and address
    const query = `
    SELECT r.age, r.weight, r.height, r.address, r.zipcode, r.ssn, r.phone, r.name, l.username, l.email
    FROM relief_users AS r
    INNER JOIN relief_login AS l ON r.login_id = l.login_id
    WHERE r.login_id = ?`;
    
    con.query(query, [loginId], (error, results) => {
      if (error) {
        // If there's an error, call the callback with the error
        return callback(error, null);
      }
      // If successful, call the callback with the user profile data
      if (results.length > 0) {
        const userProfile = results[0]; // Assuming only one row will be returned
        callback(null, userProfile);
      } else {
        // If no user found with the provided login_id
        callback(new Error('User not found'), null);
      }
    });
}

async function createSurvey(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId, verification) {
    try {
        
        const [result] = await con.promise().query(
            `INSERT INTO relief_answers(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, user_id, verification)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId, verification]
            
        );
        return user_healthcare; // Successfully inserted
        
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return 0; // Duplicate entry
        } else {
            throw error; // Other errors
        }
    }
}

async function modifySurvey(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, loginId, verification) {
    try {     
            const [result] = await con.promise().query(
                `UPDATE relief_answers 
                 SET q1 = ?, q2 = ?, q3 = ?, q4 = ?, q5 = ?, q6 = ?, q7 = ?, q8 = ?, q9 = ?, q10 = ?, user_healthcare = ?, verification = ?
                 WHERE user_id = ?`,
                [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, user_healthcare, verification, loginId]
            );
            return user_healthcare; // Successfully inserted

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return 0; // Duplicate entry
        } else {
            throw error; // Other errors
        }
    }
}
/*async function createLogin(Username, Password){
    const[result] = await con.promise().query(`
    INSERT INTO relief_login(Username, Password)
    Values(?,?)
    `, [Username, Password])
    return 1; 
}
*/

// GET ACCESS TO ALL INFORMATION FOR THAT TABLE
async function getNotes(){
    const [rows] = await con.query("SELECT * FROM relief_users")
    return rows
}

// GET ACCESS TO PARTIAL INFORMATION FROM THAT TABLE

async function getNote(User_id){
    const[rows] = await con.query(`
    SELECT *
    FROM relief_users
    WHERE User_id = ?
    `, [User_id])
    return rows[0]
}



// ADDING INFORMATION TO A TABLE

async function createNote(Username, Password, Address, SSN, Zipcode){
    const[result] = await con.query(`
    INSERT INTO relief_users(Username, Password, Address, SSN, Zipcode)
    Values(?,?,?,?,?)
    `, [Username, Password, Address, SSN, Zipcode])
    return result
}

//const newNote = await createNote('Peterpan', 'A1e424255f', '844 Bearfeet DR', '552051333', '95100')


module.exports = {
    getNotes,
    getNote,
    createNote,
    sendLogin,
    createLogin,
    createProfile,
    findID,
    findVerification,
    fetchUserProfile,
    createSurvey,
    findSurveyVerification,
    modifySurvey
};



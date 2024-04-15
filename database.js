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



async function sendLogin(Username, Password, res){
    try {
        
        const [rows] = await con.promise().query('SELECT * FROM relief_login WHERE Username = ? AND Password = ?', [Username, Password]);
        if (rows.length === 1) {
            
            return 1; 
        } else {
            return 0; 
            
        }
    } catch (error) {
        console.error('Error executing query:', error);
        
    }
}


async function createLogin(Username, Password){
    const[result] = await con.promise().query(`
    INSERT INTO relief_login(Username, Password)
    Values(?,?)
    `, [Username, Password])
    return result
}


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
    createLogin
};



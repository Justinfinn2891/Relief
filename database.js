import mysql from 'mysql2'
 
// ADDS SECURITY TO POOL VARAIBLE 
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// GET ACCESS TO ALL INFORMATION FOR THAT TABLE
export async function getNotes(){
    const [rows] = await pool.query("SELECT * FROM relief_users")
    return rows
}

const notes = await getNotes()
console.log(notes)

// GET ACCESS TO PARTIAL INFORMATION FROM THAT TABLE

export async function getNote(User_id){
    const[rows] = await pool.query(`
    SELECT *
    FROM relief_users
    WHERE User_id = ?
    `, [User_id])
    return rows[0]
}

const note = await getNote(3)
console.log(note)

// ADDING INFORMATION TO A TABLE

export async function createNote(Username, Password, Address, SSN, Zipcode){
    const[result] = await pool.query(`
    INSERT INTO relief_users(Username, Password, Address, SSN, Zipcode)
    Values(?,?,?,?,?)
    `, [Username, Password, Address, SSN, Zipcode])
    return result
}

//const newNote = await createNote('Peterpan', 'A1e424255f', '844 Bearfeet DR', '552051333', '95100')
console.log(notes)





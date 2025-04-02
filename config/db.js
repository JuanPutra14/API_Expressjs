const mysql = require('mysql2')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'juan_db'
})
module.exports = db
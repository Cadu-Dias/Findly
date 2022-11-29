const mysql = require('mysql2/promise')

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ca864263',
    database: 'findly'
})


module.exports = pool;
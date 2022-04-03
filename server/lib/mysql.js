const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kym5957',
    database: 'baleum',
    multipleStatements: true
});

module.exports = connection
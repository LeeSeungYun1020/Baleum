const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'leeseungyun',
    password: 'lsy1020',
    database: 'baleum',
    multipleStatements: true
});

module.exports = connection
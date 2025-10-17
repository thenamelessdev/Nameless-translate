const mysql2 = require("mysql2/promise");
const db = process.env.db;
const host = process.env.dbHost
const passw = process.env.dbPassw;
const user = process.env.dbUser;

const dbConn = new mysql2.createPool({
    host: host,
    user: user,
    password: passw,
    database: db,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = dbConn;
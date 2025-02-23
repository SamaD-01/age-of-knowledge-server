const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "samad01",
    host: "localhost",
    port: 5432,
    database: "ageofknowledge"
});

module.exports = pool;

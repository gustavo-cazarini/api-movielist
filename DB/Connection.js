require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
    ssl: {
        require: JSON.parse(process.env.SSLREQ),
        rejectUnauthorized: JSON.parse(process.env.SSLREJECT)
    }
});

module.exports = pool;
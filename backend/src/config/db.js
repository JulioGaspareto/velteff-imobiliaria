const { Pool, types } = require('pg');
require('dotenv').config();

types.setTypeParser(1700, (valor) => parseFloat(valor));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;

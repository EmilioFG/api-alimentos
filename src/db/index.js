const { Pool } = require("pg");

const CONFIG = require('../config');


const POOL = new Pool({
  user: CONFIG.DB_USER,
  host: CONFIG.DB_HOST,
  database: CONFIG.DB_DATABASE,
  password: CONFIG.DB_PASSWORD,
  port: CONFIG.DB_PORT,
});

if (CONFIG.NODE_ENV !== 'development') {
  POOL.options.ssl = { rejectUnauthorized: false };
}

module.exports = POOL;
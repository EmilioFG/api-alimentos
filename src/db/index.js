const { Pool } = require("pg");


const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "alimentos",
  password: "zp@10s7gnrEms0d1s",
  port: 5432,
});

module.exports = pool;
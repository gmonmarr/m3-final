const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true // Set to true for local dev; false for production
  }
};

// Create and connect the pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// Export
module.exports = {
  sql,
  pool,
  poolConnect
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { poolConnect, pool, sql } = require('../models/db');

async function registerUser(username, password) {
  await poolConnect;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.request()
    .input('username', sql.VarChar, username)
    .input('password', sql.VarChar, hashedPassword)
    .query('INSERT INTO dbo.memo_Users (username, password_hash) VALUES (@username, @password)');

  return result;
}

async function loginUser(username, password) {
  await poolConnect;

  const result = await pool.request()
    .input('username', sql.VarChar, username)
    .query('SELECT * FROM dbo.memo_Users WHERE username = @username');

  const user = result.recordset[0];
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET);
  return token;
}

module.exports = { registerUser, loginUser };

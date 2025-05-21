const { poolConnect, pool, sql } = require('../models/db');

async function getMovies(userId) {
  await poolConnect;
  const result = await pool.request()
    .input('userId', sql.Int, userId)
    .query('SELECT * FROM dbo.memo_Movies WHERE user_id = @userId');
  return result.recordset;
}

async function addMovie(userId, title, director, year) {
  await poolConnect;
  await pool.request()
    .input('userId', sql.Int, userId)
    .input('title', sql.VarChar, title)
    .input('director', sql.VarChar, director)
    .input('year', sql.Int, year)
    .query('INSERT INTO dbo.memo_Movies (user_id, title, director, year) VALUES (@userId, @title, @director, @year)');
}

async function updateMovie(movieId, title, director, year) {
  await poolConnect;
  await pool.request()
    .input('movieId', sql.Int, movieId)
    .input('title', sql.VarChar, title)
    .input('director', sql.VarChar, director)
    .input('year', sql.Int, year)
    .query('UPDATE dbo.memo_Movies SET title = @title, director = @director, year = @year WHERE id = @movieId');
}

async function deleteMovie(movieId) {
  await poolConnect;
  await pool.request()
    .input('movieId', sql.Int, movieId)
    .query('DELETE FROM dbo.memo_Movies WHERE id = @movieId');
}

module.exports = { getMovies, addMovie, updateMovie, deleteMovie };

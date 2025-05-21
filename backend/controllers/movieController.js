const movieService = require('../services/movieService');

async function getAll(req, res) {
  const userId = req.user.userId;
  const movies = await movieService.getMovies(userId);
  res.json(movies);
}

async function add(req, res) {
  const userId = req.user.userId;
  const { title, director, year } = req.body;
  await movieService.addMovie(userId, title, director, year);
  res.status(201).json({ message: 'Movie added' });
}

async function update(req, res) {
  const { id } = req.params;
  const { title, director, year } = req.body;
  await movieService.updateMovie(id, title, director, year);
  res.json({ message: 'Movie updated' });
}

async function remove(req, res) {
  const { id } = req.params;
  await movieService.deleteMovie(id);
  res.json({ message: 'Movie deleted' });
}

module.exports = { getAll, add, update, remove };

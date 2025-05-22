// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const { getAll, add, update, remove } = require('../controllers/movieController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie CRUD operations
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies for the logged-in user
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get('/', getAll);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               director:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Movie created
 */
router.post('/', add);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update an existing movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               director:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Movie updated
 *       404:
 *         description: Movie not found
 */
router.put('/:id', update);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 */
router.delete('/:id', remove);

module.exports = router;

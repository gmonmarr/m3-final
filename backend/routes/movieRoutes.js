const express = require('express');
const router = express.Router();
const { getAll, add, update, remove } = require('../controllers/movieController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', getAll);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;

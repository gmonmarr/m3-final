const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middleware/validation");
const handleValidation = require("../middleware/handleValidation");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/register", validateRegister, handleValidation, register);
router.post("/login", validateLogin, handleValidation, login);
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;
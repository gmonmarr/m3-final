const authService = require('../services/authService');

async function register(req, res) {
  const { username, password } = req.body;
  try {
    await authService.registerUser(username, password);
    res.status(201).json({ message: 'User registered' });
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const token = await authService.loginUser(username, password);
    if (!token) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ token });
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { register, login };

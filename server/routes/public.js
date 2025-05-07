// routes/public.js
const express = require('express');
const router = express.Router();

// Define public routes
router.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

router.get('/about', (req, res) => {
  res.send('About us page');
});

module.exports = router;

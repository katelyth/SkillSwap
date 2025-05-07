// routes/requests.js
const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// Create a new request
router.post('/', async (req, res) => {
  const { skill } = req.body;
  const userId = req.user.id; // Assumes you have a user ID from session or JWT
  try {
    const newRequest = await prisma.request.create({
      data: {
        skill,
        userId,
      },
    });
    res.json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Request creation failed', error: err });
  }
});

// Get all requests for a user
router.get('/', async (req, res) => {
  const userId = req.user.id; // Assumes you have a user ID from session or JWT
  try {
    const requests = await prisma.request.findMany({
      where: { userId },
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Request retrieval failed', error: err });
  }
});

module.exports = router;

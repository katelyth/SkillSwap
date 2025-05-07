// routes/profile.js
const express = require('express');
const prisma = require('../prismaClient'); // Import Prisma Client
const router = express.Router();

// Get user profile
router.get('/', async (req, res) => {
  const userId = req.user.id; // Assumes you have a user ID from session or JWT
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Profile retrieval failed', error: err });
  }
});

// Update user profile
router.put('/', async (req, res) => {
  const { firstName, lastName, bio, skills } = req.body;
  const userId = req.user.id; // Assumes you have a user ID from session or JWT
  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        firstName,
        lastName,
        bio,
        skills: skills ? skills.split(',') : [],
      },
    });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: 'Profile update failed', error: err });
  }
});

module.exports = router;

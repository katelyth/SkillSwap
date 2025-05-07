// routes/skills.js
const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// Post a new skill
router.post('/', async (req, res) => {
  const { skillName } = req.body;
  const userId = req.user.id; // Assumes you have a user ID from session or JWT
  try {
    const newSkill = await prisma.skill.create({
      data: {
        skillName,
        userId,
      },
    });
    res.json(newSkill);
  } catch (err) {
    res.status(500).json({ message: 'Skill posting failed', error: err });
  }
});

// Get skills for a user
router.get('/', async (req, res) => {
  const userId = req.user.id; // Assumes you have a user ID from session or JWT
  try {
    const skills = await prisma.skill.findMany({
      where: { userId },
    });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Skills retrieval failed', error: err });
  }
});

module.exports = router;

// server/routes/teachers.js
const express = require('express');
const router = express.Router();
const { Teacher } = require('../models/userModel');

router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({}, 'firstName lastName');
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

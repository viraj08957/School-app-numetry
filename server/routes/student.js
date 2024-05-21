
const express = require('express');
const router = express.Router();
const { User, Student } = require('../models/userModel'); // Adjust the path as needed

// Route to fetch the list of students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({}, 'firstName lastName grade parentName'); // Include the 'parentName' field
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

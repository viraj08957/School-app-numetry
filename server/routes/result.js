const express = require('express');
const router = express.Router();
const { Student } = require('../models/userModel');
const Result = require('../models/resultModel');
const cors = require('cors');

router.use(express.json());


// Route to get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific student by ID
router.get('/result/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to post student results
router.post('/results', async (req, res) => {
  try {
    const { studentId, subject, result } = req.body;

    if (!studentId || !subject || !result) {
      return res.status(400).json({ error: 'Invalid request. Provide studentId, subject, and result.' });
    }

    // Log the received data
    console.log('Received result submission:', { studentId, subject, result });

    // Ensure that the student exists
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Save the result to the Result model
    const newResult = new Result({
      studentId,
      subject,
      result,
    });

    const savedResult = await newResult.save();

    // Respond with the saved result
    res.json(savedResult);
  } catch (error) {
    console.error('Error in handling result submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch results for a specific student
router.get('/result/students/:id/results', async (req, res) => {
  try {
    const studentId = req.params.id;
    const results = await Result.find({ studentId });
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

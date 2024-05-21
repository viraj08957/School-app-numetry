const express = require('express');
const router = express.Router();
const FeedbackTeacher = require('../models/feedbackTeacherModel');
const { Student, Parent } = require('../models/userModel'); // Updated import statement

// Endpoint to fetch all students
router.get('/students', async (req, res) => {
  try {
    // Fetch all students
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all parents
router.get('/parents', async (req, res) => {
  try {
    // Fetch all parents
    const parents = await Parent.find();

    res.json(parents);
  } catch (error) {
    console.error('Error fetching parents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Endpoint to submit feedback from teacher to student/parent
router.post('/submit/:teacherId', async (req, res) => {
    try {
      const { student, parent, message } = req.body;
      const teacherId = req.params.teacherId;
  
      // Check if teacherId is valid (you might want to add more validation logic)
      if (!teacherId) {
        return res.status(400).json({ error: 'Invalid teacherId' });
      }
  
      const feedbackData = {
        teacher: teacherId,
        student,
        message,
      };
  
      // Include parent field only if it's not an empty string
      if (parent !== '') {
        feedbackData.parent = parent;
      }
  
      const feedback = new FeedbackTeacher(feedbackData);
      await feedback.save();
  
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  


//////////////////////////Student Fetch

router.get('/:studentId', async (req, res) => {
    try {
      const studentId = req.params.studentId;
  
      // Fetch feedback data for the specific student
      const feedbackData = await FeedbackTeacher.find({ student: studentId }).populate('teacher', 'name');
  
      res.json(feedbackData);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



  
router.get('/get/:parentId', async (req, res) => {
    try {
      const parentId = req.params.parentId;
  
      // Fetch feedback data for the specific student
      const feedbackData = await FeedbackTeacher.find({ parent: parentId }).populate('teacher', 'name');
  
      res.json(feedbackData);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  
module.exports = router;






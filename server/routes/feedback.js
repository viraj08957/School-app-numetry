// routes/feedback.js
const express = require('express');
const router = express.Router();
const { StudentFeedback , ParentFeedback, Feedback} = require('../models/feedbackModel');



////////////////Student Feedback/////////////////


// Endpoint to submit feedback from a student
router.post('/submit/student', async (req, res) => {
  try {
    const { teacher, message, student } = req.body;

    // Ensure that student information is provided
    if (!student || !student._id) {
      console.error('Student information is required');
      return res.status(400).json({ error: 'Student information is required' });
    }

    // Create a new student feedback document
    const feedback = new StudentFeedback({
      teacher,
      message,
      student: student._id, // Assuming _id is the student ID
    });

    // Save the feedback to the database
    await feedback.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting student feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//////////////////Parent feedback ////////////////////////////



// Endpoint to submit feedback from a parent
router.post('/submit/parent', async (req, res) => {
  try {
    const { teacher, message, parent } = req.body;
// Ensure that student information is provided
      if (!parent || !parent._id) {
        console.error('Parent information is required');
        return res.status(400).json({ error: 'Parent information is required' });
      }

    // Create a new parent feedback document
    const feedback = new ParentFeedback({
      teacher,
      message,
      parent:parent._id,
    });

    // Save the feedback to the database
    await feedback.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting parent feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



////////////////////////////teacher fetching feedback ///////////////////////


router.get('/teacher/:teacherId', async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // Fetch feedback for the specified teacher from the database
    const feedback = await Feedback.find({ teacher: teacherId })
      .select('timestamp userType message') // Select only the fields you want to send to the frontend
      .populate('teacher', 'firstName lastName'); // If you want to include teacher details, adjust accordingly

    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;









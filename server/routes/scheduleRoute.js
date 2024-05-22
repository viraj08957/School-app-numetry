// scheduleRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Schedule = require('../models/scheduleModel');
const { Student } = require('../models/userModel'); 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploadedfiles/schedule');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/post-schedule', upload.array('files'), async (req, res) => {
  try {
    const { grade } = req.body;
    const files = req.files.map(file => file.filename);

    const newSchedule = new Schedule({
      grade,
      files,
    });

    await newSchedule.save();

    res.status(201).json({ message: 'Schedule posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Fetch schedules based on student's grade
router.get('/get-schedules/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    // Retrieve the student's grade from the student model
    const student = await Student.findById(studentId);
    const studentGrade = student.grade;

    // Fetch schedules based on the student's grade
    const schedules = await Schedule.find({ grade: studentGrade });

    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../public/uploadedfiles/schedule', filename);
  res.sendFile(filePath);
});





module.exports = router;

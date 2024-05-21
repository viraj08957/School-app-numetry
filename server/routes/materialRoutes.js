// materialRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Material = require('../models/materialModel');
const { Student } = require('../models/userModel'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploadedfiles/material');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/post-material', upload.single('file'), async (req, res) => {
  try {
    const { title, description, subject, grade } = req.body;
    const file = req.file.filename;

    const newMaterial = new Material({
      title,
      description,
      subject,
      grade,
      file,
    });

    await newMaterial.save();

    res.status(201).json({ message: 'Material posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch materials based on student's grade
router.get('/get-materials/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    // Retrieve the student's grade from the student model
    const student = await Student.findById(studentId);
    const studentGrade = student.grade;

    // Fetch materials based on the student's grade
    const materials = await Material.find({ grade: studentGrade });

    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/files/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../public/uploadedfiles/material', filename);
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(filePath);
});

module.exports = router;

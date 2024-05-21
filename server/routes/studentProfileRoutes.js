
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { User, Student } = require('../models/userModel');
const handleFileUpload = require('../public/uploads/fileUpload');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

router.use('/profile', express.static(path.join(__dirname, '../public/uploads')));


router.get('/student/:studentId', async (req, res) => {
    try {
      const studentId = req.params.studentId;
  
      // Fetch teacher data from both User and Teacher models using discriminator key
      const student = await Student.findOne({ _id: studentId }) // Use the Student model directly
            .populate({
                path: '_id',
                model: 'User',
                select: 'firstName lastName username password country city address userType',
            });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      console.log('Fetched Student Data:', student.toObject());
  
      res.json(student.toObject()); // Convert to plain JavaScript object for better serialization
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
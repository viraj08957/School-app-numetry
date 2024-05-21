
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { User, Teacher } = require('../models/userModel');
const handleFileUpload = require('../public/uploads/fileUpload');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

router.use('/profile', express.static(path.join(__dirname, '../public/uploads')));


router.get('/teacher/:teacherId', async (req, res) => {
    try {
      const teacherId = req.params.teacherId;
  
      // Fetch teacher data from both User and Teacher models using discriminator key
      const teacher = await Teacher.findOne({ _id: teacherId }) // Use the Teacher model directly
            .populate({
                path: '_id',
                model: 'User',
                select: 'firstName lastName email username password country city address userType',
            });
  
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      console.log('Fetched Teacher Data:', teacher.toObject());
  
      res.json(teacher.toObject()); // Convert to plain JavaScript object for better serialization
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});



// PUT Update Teacher Profile Route
router.put('/teacher/:teacherId', async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const { age, phoneNumber, teacherPhoto , firstName ,
        lastName,
         email,
         username,
          password, 
          country,
           city,
            address } = req.body;

    // Update fields in both User and Teacher models
    const updatedTeacher = await User.findOneAndUpdate(
      { _id: teacherId, userType: 'teacher' },
      {
        $set: {
          
          firstName ,
          lastName,
           email,
           username,
            password, 
            country,
             city,
              address
        },
      },
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update additional fields in the Teacher model
    const updatedTeacherProfile = await Teacher.findOneAndUpdate(
      { _id: updatedTeacher.teacherProfile },
      {
        $set: {
          teacherPhoto,
          age,
          phoneNumber,
        },
      },
      { new: true, runValidators: true }
    ).select('-__v');

    res.json({ ...updatedTeacher.toObject(), ...updatedTeacherProfile.toObject() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;











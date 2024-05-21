
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Notification = require('../models/notificationModel');
const { User, Student , Parent} = require('../models/userModel'); // Import the User and Student models

router.use(cors())
// Route to handle form submissions
router.post('/send-notification', async (req, res) => {
  try {
    const { title, message, studentId, parentName } = req.body;

    // Retrieve student details from the database using the User model
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create a new appointment instance with student details
    const newNotification = new Notification({
      title,
      message,
      studentId,
      studentName: `${student.firstName} ${student.lastName}`,
      grade: student.grade,
      parentName,
    });

    // Save the appointment to the database
    await newNotification.save();

    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    console.error('Error creating notification:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






// Route to fetch notifications based on criteria
router.get('/send-notification', async (req, res) => {
  try {
    const { firstName, lastName } = req.query;

    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'Both first and last names are required' });
    }

    const parent = await Parent.findOne({ firstName, lastName });

    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    const childrenInfo = parent.childInfo;

    const notifications = await Notification.find({
      $or: [
        { parentName: `${firstName} ${lastName}` },
        {
          $and: [
            { studentName: { $in: childrenInfo.map(child => child.childName) } },
            { grade: { $in: childrenInfo.map(child => child.childGrade) } }
          ]
        }
      ]
    });

    if (notifications.length === 0) {
      return res.status(200).json({ message: 'No Notifications!' });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;

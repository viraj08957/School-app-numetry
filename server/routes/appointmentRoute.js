// routes/appointments.js
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Appointment = require('../models/appointmentModel');
const { User, Student , Parent} = require('../models/userModel'); // Import the User and Student models

router.use(cors())
// Route to handle form submissions
router.post('/set-appointment', async (req, res) => {
  try {
    const { date, time, studentId, parentName, description } = req.body;

    // Retrieve student details from the database using the User model
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create a new appointment instance with student details
    const newAppointment = new Appointment({
      date,
      time,
      studentId,
      studentName: `${student.firstName} ${student.lastName}`,
      grade: student.grade,
      parentName,
      description,
    });

    // Save the appointment to the database
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error('Error creating appointment:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





// ...

// Route to fetch appointments based on criteria
// Route to fetch appointments based on criteria
router.get('/check-appointments', async (req, res) => {
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

    const appointments = await Appointment.find({
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

    if (appointments.length === 0) {
      return res.status(200).json({ message: 'No appointments!' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;

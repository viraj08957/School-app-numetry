
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  grade: { type: String, required: true },
  parentName: { type: String, required: true },
  description: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

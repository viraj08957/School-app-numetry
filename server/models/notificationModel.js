// models/notificationModel.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  grade: { type: String, required: true },
  parentName: { type: String, required: true }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

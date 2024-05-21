// scheduleModel.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
  },
  files: [
    {
      type: String,
      required: true,
    },
  ],
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;

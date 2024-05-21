const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  subject: String,
  result: Number,
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;

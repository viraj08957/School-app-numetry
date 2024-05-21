
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);





const StudentFeedback = Feedback.discriminator(
  'StudentFeedback',
  new mongoose.Schema({
    userType: { type: String, default: 'student' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  })
);






const ParentFeedback = Feedback.discriminator(
  'ParentFeedback',
  new mongoose.Schema({
    userType: { type: String, default: 'parent' },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', required: true },
  })
);

module.exports = { Feedback, StudentFeedback , ParentFeedback};







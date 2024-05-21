const mongoose = require('mongoose');

const feedbackTeacherSchema = new mongoose.Schema({
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const FeedbackTeacher = mongoose.model('FeedbackTeacher', feedbackTeacherSchema);

module.exports = FeedbackTeacher;

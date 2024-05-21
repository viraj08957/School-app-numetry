//userModel.js

const mongoose = require('mongoose');

// Common Fields
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  userType: { type: String, required: true },
  teacherProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // 'teacher', 'student', or 'parent'
});

// Student-Specific Fields
const studentSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  grade: { type: String, required: true },
  parentName: { type: String, required: true },
  studentPhoto: { type: String }, // You can store the file path or URL
});

// Parent-Specific Fields
const parentSchema = new mongoose.Schema({
  phoneNumber: { type: Number, required: true },
  childInfo: [{
    childName: { type: String, required: true },
    childGrade: { type: String, required: true },
  }],
  parentPhoto: { type: String }, // You can store the file path or URL
});

// Teacher-Specific Fields
const teacherSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  educationalBackground: { type: String, required: true },
  teachingExperience: { type: Number, required: true },
  teacherPhoto: { type: String }, // You can store the file path or URL
});

// Create models for each user type
const User = mongoose.model('User', userSchema);
const Student = User.discriminator('Student', studentSchema);
const Parent = User.discriminator('Parent', parentSchema);
const Teacher = User.discriminator('Teacher', teacherSchema);

module.exports = { User, Student, Parent, Teacher };

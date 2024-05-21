// materialModel.js
const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  file: {
    type: String, 
    required: true,
  }
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;

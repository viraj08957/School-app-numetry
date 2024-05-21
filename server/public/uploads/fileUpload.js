const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); // Use the original filename
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileName = req.file.filename;
    res.json({ fileName });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
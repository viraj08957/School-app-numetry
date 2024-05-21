
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { User, Parent } = require('../models/userModel');
const handleFileUpload = require('../public/uploads/fileUpload');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

router.use('/profile', express.static(path.join(__dirname, '../public/uploads')));


router.get('/parent/:parentId', async (req, res) => {
    try {
      const parentId = req.params.parentId;
  

      const parent = await Parent.findOne({ _id: parentId })
            .populate({
                path: '_id',
                model: 'User',
                select: 'firstName lastName email age phoneNumber username password country city address userType',
            });
  
      if (!parent) {
        return res.status(404).json({ message: 'Parent not found' });
      }

      console.log('Fetched Parent Data:', parent.toObject());

  
      res.json(parent.toObject()); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
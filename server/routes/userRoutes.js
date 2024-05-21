const express = require("express");
const router = express.Router();
const path = require("path");
const { User, Student, Parent, Teacher } = require("../models/userModel");
const handleFileUpload = require("../public/uploads/fileUpload");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ); // Use the original filename
  },
});

const upload = multer({ storage });

// Registration Route with multer middleware
router.post("/register", upload.single("file"), async (req, res) => {
  try {
    console.log("Request received:", req.body); // Log the request body for debugging

    const userType = req.body.userType;

    if (userType === "teacher" && req.file) {
      const photoFileName = await handleFileUpload(req.file, "teacherPhoto");
      req.body.teacherPhoto = photoFileName;
    } else if (userType === "student" && req.file) {
      const photoFileName = await handleFileUpload(req.file, "studentPhoto");
      req.body.studentPhoto = photoFileName;
    } else if (userType === "parent" && req.file) {
      const photoFileName = await handleFileUpload(req.file, "parentPhoto");
      req.body.parentPhoto = photoFileName;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    let user;

    switch (userType) {
      case "student":
        user = new Student({ ...req.body, password: hashedPassword });
        break;
      case "parent":
        user = new Parent({ ...req.body, password: hashedPassword });
        break;
      case "teacher":
        user = new Teacher({ ...req.body, password: hashedPassword });
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    res.json({ token, userType: user.userType, _id: user._id }); // Include user ID in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

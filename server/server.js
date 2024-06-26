//server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

const upload = multer();
// Import models and routes
const { User, Student, Parent, Teacher } = require("./models/userModel"); // Adjust the path as needed
const { Appointment } = require("./models/appointmentModel");
const userRoutes = require("./routes/userRoutes"); // Adjust the path as needed

// profiles
const teacherProfileRoutes = require("./routes/teacherProfileRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes");
const parentProfileRoutes = require("./routes/parentProfileRoute");
const fileUpload = require("./public/uploads/fileUpload");

//appointment
const studentRoutes = require("./routes/student");
const appointmentRoutes = require("./routes/appointmentRoute"); // Add this line for appointment routes

//notification
const notificationRoutes = require("./routes/notificationRoute");

//result
const resultRoutes = require("./routes/result");

//material
const materialRoutes = require("./routes/materialRoutes");

//schedule

const scheduleRoutes = require("./routes/scheduleRoute");

//feedback
const teachersRouter = require("./routes/fetchTeachers");
const feedbackRouter = require("./routes/feedback");

const feedbackTeacherRoute = require("./routes/feedbackTeacher");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

// Add this middleware to serve static image files from the 'public/uploads' directory
app.use("/profile", express.static("public/uploads"));

//materails
const absolutePath = path.join(
  __dirname,
  "public",
  "uploadedfiles",
  "material"
);
app.use("/materials", express.static(absolutePath));

//schedule
const absolutePath1 = path.join(
  __dirname,
  "public",
  "uploadedfiles",
  "schedule"
);
app.use("/schedule", express.static(absolutePath1));

mongoose.connect("mongodb://0.0.0.0:27017/task22", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use userRoutes
app.use("/", userRoutes);
app.use("/profile", teacherProfileRoutes);
app.use("/profile", studentProfileRoutes);
app.use("/profile", parentProfileRoutes);

app.use("/", fileUpload);

// Use studentRoutes
app.use("/students", studentRoutes);

// Use appointmentRoutes
app.use("/appointments", appointmentRoutes);

//Use notificationRoutes
app.use("/notifications", notificationRoutes);

//Use reults
app.use("/result", resultRoutes);

// Use materialRoutes
app.use("/materials", materialRoutes);

//use scheduleRoutes
app.use("/schedule", scheduleRoutes);

//feedback
app.use("/teachers", teachersRouter);
app.use("/feedback", feedbackRouter);

app.use("/feedbackTeacher", feedbackTeacherRoute);

app.listen(5000, () => {
  console.log("Server is listening at port 5000");
});

/* eslint-disable no-unused-vars */
// App.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Registration from "./Registration";
import Login from "./Login";
import TeacherDashboard from "./components/TeacherComponent/TeacherDashboard";
import StudentDashboard from "./components/StudentComponent/StudentDashboard";
import ParentDashboard from "./components/ParentsComponent/ParentDashboard";
import Footer from "./Footer";

import PostResults from "./components/TeacherComponent/subpages/PostResults";
import PostMaterials from "./components/TeacherComponent/subpages/PostMaterials";
import PostSchedules from "./components/TeacherComponent/subpages/PostSchedules";
import SetAppointment from "./components/TeacherComponent/subpages//SetAppointment";
import SendNotification from "./components/TeacherComponent/subpages/SendNotification";
import SendFeedback from "./components/TeacherComponent/subpages/SendFeedback";
import ViewFeedback from "./components/TeacherComponent/subpages/ViewFeedback";
import Profile from "./components/TeacherComponent/subpages/Profile";

// student routes

import ViewResults from "./components/StudentComponent/subpages/ViewResults";
import ViewMaterials from "./components/StudentComponent/subpages/ViewMaterials";
import ViewSchedule from "./components/StudentComponent/subpages/ViewSchedule";
import ViewFeedbackStudent from "./components/StudentComponent/subpages/ViewFeedbackStudent";
import SendFeedbackStudent from "./components/StudentComponent/subpages/SendFeedbackStudent";
import StudentProfile from "./components/StudentComponent/subpages/StudentProfile";

// parent routes

import CheckAppointments from "./components/ParentsComponent/subpages/CheckAppointments";
import CheckNotifications from "./components/ParentsComponent/subpages/CheckNotifications";
import SendFeedbackToTeachers from "./components/ParentsComponent/subpages/SendFeedbackToTeachers";
import ViewFeedbackParent from "./components/ParentsComponent/subpages/ViewFeedbackParent";
import ViewProfile from "./components/ParentsComponent/subpages/ViewProfile";
import Awards from "./components/ParentsComponent/subpages/Awards";
import Career from "./components/ParentsComponent/subpages/Career";

const ConditionalNavbar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  // Check if the path is for Login or Register
  if (
    path === "/login" ||
    path === "/register" ||
    path === "/teacher-dashboard/:teacherId" ||
    path === "/student-dashboard" ||
    path === "/parent-dashboard"
  ) {
    return null; // Render nothing for Login and Register pages
  }

  return <Navbar />;
};

const ConditionalFooter = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  // Check if the path is for Login or Register
  if (
    path === "/teacher-dashboard/:teacherId" ||
    path === "/student-dashboard" ||
    path === "/parent-dashboard"
  ) {
    return null; // Render nothing for Login and Register pages
  }

  return <Footer />;
};

const App = () => {
  return (
    <Router>
      <div>
        {/* Conditionally render Navbar */}
        <ConditionalNavbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/career" element={<Career />} />

          {/* teacher routes */}

          <Route
            path="/teacher-dashboard/:teacherId"
            element={<TeacherDashboard />}
          />

          <Route
            path="/teacher-dashboard/post-results/:teacherId"
            element={<PostResults />}
          />
          <Route
            path="/teacher-dashboard/post-materials/:teacherId"
            element={<PostMaterials />}
          />
          <Route
            path="/teacher-dashboard/post-schedules/:teacherId"
            element={<PostSchedules />}
          />
          <Route
            path="/teacher-dashboard/set-appointment/:teacherId"
            element={<SetAppointment />}
          />
          <Route
            path="/teacher-dashboard/send-notification/:teacherId"
            element={<SendNotification />}
          />
          <Route
            path="/teacher-dashboard/send-feedback/:teacherId"
            element={<SendFeedback />}
          />
          <Route
            path="/teacher-dashboard/view-feedback/:teacherId"
            element={<ViewFeedback />}
          />
          <Route
            path="/teacher-dashboard/profile/:teacherId"
            element={<Profile />}
          />

          {/* student routes */}

          <Route
            path="/student-dashboard/:studentId"
            element={<StudentDashboard />}
          />

          <Route
            path="/student-dashboard/view-results/:studentId"
            element={<ViewResults />}
          />
          <Route
            path="/student-dashboard/view-materials/:studentId"
            element={<ViewMaterials />}
          />
          <Route
            path="/student-dashboard/view-schedule/:studentId"
            element={<ViewSchedule />}
          />
          <Route
            path="/student-dashboard/view-feedback/:studentId"
            element={<ViewFeedbackStudent />}
          />
          <Route
            path="/student-dashboard/send-feedback/:studentId"
            element={<SendFeedbackStudent />}
          />
          <Route
            path="/student-dashboard/student-profile/:studentId"
            element={<StudentProfile />}
          />

          {/* parent routes */}

          <Route
            path="/parent-dashboard/:parentId"
            element={<ParentDashboard />}
          />

          <Route
            path="/parent-dashboard/check-appointments/:parentId"
            element={<CheckAppointments />}
          />
          <Route
            path="/parent-dashboard/check-notifications/:parentId"
            element={<CheckNotifications />}
          />
          <Route
            path="/parent-dashboard/send-feedback-to-teachers/:parentId"
            element={<SendFeedbackToTeachers />}
          />
          <Route
            path="/parent-dashboard/view-feedback/:parentId"
            element={<ViewFeedbackParent />}
          />
          <Route
            path="/parent-dashboard/view-profile/:parentId"
            element={<ViewProfile />}
          />
        </Routes>
      </div>
      {/* Footer */}
      <ConditionalFooter />
    </Router>
  );
};

export default App;

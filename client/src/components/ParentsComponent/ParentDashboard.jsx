/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CheckAppointments from "./subpages/CheckAppointments";
import CheckNotifications from "./subpages/CheckNotifications";
import SendFeedbackToTeachers from "./subpages/SendFeedbackToTeachers";
import ViewFeedbackParent from "./subpages/ViewFeedbackParent";
import ViewProfile from "./subpages/ViewProfile";
import Awards from "./subpages/Awards";

const ParentDashboard = () => {
  const { parentId } = useParams();
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "check-appointments":
        return <CheckAppointments />;
      case "check-notifications":
        return <CheckNotifications />;
      case "send-feedback-to-teachers":
        return <SendFeedbackToTeachers />;
      case "view-feedback":
        return <ViewFeedbackParent />;
      case "view-profile":
        return <ViewProfile />;
      case "awards-certifcation":
        return <Awards />;
      default:
        return <div>Select a menu item to view content.</div>;
    }
  };

  return (
    <div className="parent-dashboard">
      {/* Top Navbar */}
      <nav
        className="navbar navbar-dark bg-dark fixed-top"
        style={{ height: "100px" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand">Parent's Dashboard</span>
          <div className="d-flex">
            <span className="navbar-text me-3">Welcome, ParentName</span>
            <Link to="/login" className="btn btn-outline-light">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 sidebar">
            <ul>
              <li>
                <Link
                  to={`/parent-dashboard/check-appointments/${parentId}`}
                  className={`nav-link ${
                    selectedMenuItem === "check-appointments" ? "active" : ""
                  }`}
                  onClick={() => setSelectedMenuItem("check-appointments")}
                >
                  Check Appointments
                </Link>
              </li>
              <li>
                <Link
                  to={`/parent-dashboard/check-notifications/${parentId}`}
                  className={`nav-link ${
                    selectedMenuItem === "check-notifications" ? "active" : ""
                  }`}
                  onClick={() => setSelectedMenuItem("check-notifications")}
                >
                  Check Notifications
                </Link>
              </li>
              <li>
                <Link
                  to={`/parent-dashboard/send-feedback-to-teachers/${parentId}`}
                  className={`nav-link ${
                    selectedMenuItem === "send-feedback-to-teachers"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedMenuItem("send-feedback-to-teachers")
                  }
                >
                  Send Feedback to Teachers
                </Link>
              </li>
              <li>
                <Link
                  to={`/parent-dashboard/view-feedback/${parentId}`}
                  className={`nav-link ${
                    selectedMenuItem === "view-feedback" ? "active" : ""
                  }`}
                  onClick={() => setSelectedMenuItem("view-feedback")}
                >
                  View Feedback
                </Link>
              </li>
              <li>
                <Link
                  to={`/parent-dashboard/view-profile/${parentId}`}
                  className={`nav-link ${
                    selectedMenuItem === "view-profile" ? "active" : ""
                  }`}
                  onClick={() => setSelectedMenuItem("view-profile")}
                >
                  View Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-9 main-content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;

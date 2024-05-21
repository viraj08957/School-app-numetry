// StudentDashboard.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ViewResults from './subpages/ViewResults';
import ViewMaterials from './subpages/ViewMaterials';
import ViewSchedule from './subpages/ViewSchedule';
import ViewFeedbackStudent from './subpages/ViewFeedbackStudent';
import SendFeedbackStudent from './subpages/SendFeedbackStudent';
import StudentProfile from './subpages/StudentProfile';
import "../../assets/css/StudentDashboard.css";

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [selectedMenuItem, setSelectedMenuItem] = useState('');


  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'view-results':
        return <ViewResults studentId={studentId} />;
      case 'view-materials':
        return <ViewMaterials studentId={studentId}  />;
      case 'view-schedule':
        return <ViewSchedule />;
      case 'view-feedback':
        return <ViewFeedbackStudent />;
      case 'send-feedback':
        return <SendFeedbackStudent />;
      case 'student-profile':
        return <StudentProfile />;
        
      default:
        return <div>Select a menu item to view content.</div>;
    }
  };

  return (
    <div className="student-dashboard">
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-dark fixed-top" style={{ height: "100px" }}>
        <div className="container-fluid">
          <span className="navbar-brand">Student's Dashboard</span>
          <div className="d-flex">
            <span className="navbar-text me-3">Welcome, StudentName</span>
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
                 <Link to={`/student-dashboard/view-results/${studentId}`} className={`nav-link ${selectedMenuItem === 'view-results' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('view-results')}>
                View Results
              </Link>
              </li>

              <li>
              <Link to={`/student-dashboard/view-materials/${studentId}`} className={`nav-link ${selectedMenuItem === 'view-materials' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('view-materials')}>
                View Materials
              </Link>
              </li>

              <li>
              <Link to={`/student-dashboard/view-schedule/${studentId}`} className={`nav-link ${selectedMenuItem === 'view-schedule' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('view-schedule')}>
                View Schedule
              </Link>
              </li>

              <li>
              <Link to={`/student-dashboard/view-feedback/${studentId}`} className={`nav-link ${selectedMenuItem === 'view-feedback' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('view-feedback')}>
                View Feedback
              </Link>
              </li>

              <li>
              <Link to={`/student-dashboard/send-feedback/${studentId}`} className={`nav-link ${selectedMenuItem === 'send-feedback' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('send-feedback')}>
                Send Feedback
              </Link>
              </li>

              <li>
              <Link to={`/student-dashboard/student-profile/${studentId}`} className={`nav-link ${selectedMenuItem === 'student-profile' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('student-profile')}>
                Student Profile
              </Link>
              </li>

            </ul>
          </div>
          <div className="col-md-9 main-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

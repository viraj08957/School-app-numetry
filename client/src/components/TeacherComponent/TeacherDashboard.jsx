// TeacherDashboard.jsx
import React, { useState, useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import PostResults from './subpages/PostResults';
import PostMaterials from './subpages/PostMaterials';
import PostSchedules from './subpages/PostSchedules';
import SetAppointment from './subpages/SetAppointment';
import SendNotification from './subpages/SendNotification';
import SendFeedback from './subpages/SendFeedback';
import ViewFeedback from './subpages/ViewFeedback';
import Profile from './subpages/Profile';
import "../../assets/css/TeacherDashboard.css"
import axios from 'axios';




const TeacherDashboard = () => {
  const { teacherId } = useParams();
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const [teacherProfile, setTeacherProfile] = useState({
    firstName: '',
    lastName: '',
    profilePhoto: '[ProfilePhotoURL]',
  });

  useEffect(() => {
    // Fetch teacher data when the component mounts
    console.log('teacherId:', teacherId);
    console.log('teacherProfile:', teacherProfile); // Log the teacherProfile object
    fetchTeacherData();
  }, [teacherId]); // Re-fetch data when teacherId changes

  
  const fetchTeacherData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/teacher/${teacherId}`);
      console.log('Response Data:', response.data); // Log the entire response data
      const fetchedTeacherData = response.data;
  
      console.log('Fetched Teacher Data:', fetchedTeacherData);
  
      // Update the state with the fetched data
      setTeacherProfile(fetchedTeacherData);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };




  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'post-results':
        return <PostResults teacherId ={teacherId}/>;
      case 'post-materials':
        return <PostMaterials teacherId ={teacherId} />;
      case 'post-schedules':
        return <PostSchedules teacherId ={teacherId} />;
      case 'set-appointment':
        return <SetAppointment  teacherId ={teacherId}/>;
      case 'send-notification':
        return <SendNotification teacherId ={teacherId} />;
      case 'send-feedback':
        return <SendFeedback teacherId ={teacherId} />;
      case 'view-feedback':
        return <ViewFeedback teacherId ={teacherId} />;
      case 'profile':
        return <Profile  teacherId ={teacherId}/>;
      default:
        return <div>Select a menu item to view content.</div>;
    }
  };

  return (
    <div className="teacher-dashboard">
         <nav className="navbar navbar-dark bg-dark fixed-top" style={{ height: "100px" }}>
      <div className="container-fluid">
        <span className="navbar-brand">Teacher's Dashboard</span>
        <div className="d-flex align-items-center"> {/* Added align-items-center for vertical centering */}
          <div className="me-3">
            <img
            src={`http://localhost:5000/profile/${teacherProfile.teacherPhoto}`}// Replace with the actual path to your image
              alt="Teacher Avatar"
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} // Adjust width, height, and other styles as needed
            />
          </div>
          <span className="navbar-text me-3"> Welcome, {teacherProfile.firstName} {teacherProfile.firstName}</span>
          <Link to="/login" className="btn btn-outline-light">
            Logout
          </Link>
        </div>
      </div>
    </nav>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar">
            <ul className="nav flex-column">
            <li className="nav-item">
                  <Link to={`/teacher-dashboard/post-results/${teacherId}`} className={`nav-link ${selectedMenuItem === 'post-results' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('post-results')}>
                    Post Results
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/teacher-dashboard/post-materials/${teacherId}`}  className={`nav-link ${selectedMenuItem === 'post-materials' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('post-materials')}>
                    Post Materials
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/teacher-dashboard/post-schedules/${teacherId}`} className={`nav-link ${selectedMenuItem === 'post-schedules' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('post-schedules')}>
                    Post Schedules
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/teacher-dashboard/set-appointment/${teacherId}`} className={`nav-link ${selectedMenuItem === 'set-appointment' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('set-appointment')}>
                    Set Appointment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/teacher-dashboard/send-notification/${teacherId}`} className={`nav-link ${selectedMenuItem === 'send-notification' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('send-notification')}>
                    Send Notification
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/teacher-dashboard/send-feedback/${teacherId}`}  className={`nav-link ${selectedMenuItem === 'send-feedback' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('send-feedback')}>
                    Send Feedback
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/teacher-dashboard/view-feedback/${teacherId}`} className={`nav-link ${selectedMenuItem === 'view-feedback' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('view-feedback')}>
                    View Feedback
                  </Link>
                </li>
                <li className="nav-item">
                <Link to={`/teacher-dashboard/profile/${teacherId}`} className={`nav-link ${selectedMenuItem === 'profile' ? 'active' : ''}`} onClick={() => setSelectedMenuItem('profile')}>
                  Profile
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

export default TeacherDashboard;

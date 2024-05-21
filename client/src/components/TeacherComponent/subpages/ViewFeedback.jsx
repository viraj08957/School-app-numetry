// ViewFeedback.jsx
import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const formatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(timestamp).toLocaleDateString('en-US', options);
};

const formatTime = (timestamp) => {
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(timestamp).toLocaleTimeString('en-US', options);
};

const ViewFeedback = () => {
  const { teacherId } = useParams();
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
  
    axios.get(`http://localhost:5000/feedback/teacher/${teacherId}`)
      .then(response => {
        console.log('Fetched feedback:', response.data);
        setFeedbackData(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  const studentFeedback = feedbackData.filter((feedback) => feedback.userType === 'student');
  const parentFeedback = feedbackData.filter((feedback) => feedback.userType === 'parent');


  return (
    <div className="teacher-dashboard">
    <nav className="navbar navbar-dark bg-dark fixed-top" style={{height: "100px"}}  >
     <div className="container-fluid">
       <span className="navbar-brand">Teacher's Dashboard</span>
       <div className="d-flex">
         <span className="navbar-text me-3">Welcome, TeacherName</span>
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
               <Link to={`/teacher-dashboard/post-results/${teacherId}`} className = 'nav-link'>
                 Post Results
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/post-materials/${teacherId}`} className = 'nav-link'>
                 Post Materials
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/post-schedules/${teacherId}`} className = 'nav-link'>
                 Post Schedules
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/set-appointment/${teacherId}`} className = 'nav-link'>
                 Set Appointment
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/send-notification/${teacherId}`} className = 'nav-link '>
                 Send Notification
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/send-feedback/${teacherId}`} className = 'nav-link'>
                 Send Feedback
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/view-feedback/${teacherId}` } className = 'nav-link active'>
                 View Feedback
               </Link>
             </li>
             <li className="nav-item">
             <Link to={`/teacher-dashboard/profile/${teacherId}`} className = 'nav-link'>
               Profile
             </Link>


             </li>
         </ul>
       </div>

       <div className="col-md-9 main-content">
    
            <Card className="shadow p-3 mb-5 bg-white rounded">
            <Row>
              <Col>
                <Card className="shadow p-3 mb-5 bg-white rounded">
                  <div>
                    <h2>Student Feedback</h2>
                    <div className="card-container">
                      {studentFeedback.map((feedback, index) => (
                        <Card
                          key={index}
                          className="feedback-card student-feedback"
                          style={{ width: '100%', marginBottom: '20px' }}
                        >
                          <Card.Body>
                            {/* <Card.Title>{feedback.userType}</Card.Title> */}
                            <Card.Subtitle className="mb-2 text-muted">
                              <div>Date: {formatDate(feedback.timestamp)}</div>
                              <div>Time: {formatTime(feedback.timestamp)}</div>
                            </Card.Subtitle>
                            <Card.Text><strong>Feedback Message: {feedback.message}</strong></Card.Text>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Card>
              </Col>

              <Col>
                <Card className="shadow p-3 mb-5 bg-white rounded">
                  <div>
                    <h2>Parent Feedback</h2>
                    <div className="card-container">
                      {parentFeedback.map((feedback, index) => (
                        <Card
                          key={index}
                          className="feedback-card parent-feedback"
                          style={{ width: '100%', marginBottom: '20px' }}
                        >
                          <Card.Body>
                            {/* <Card.Title>{feedback.userType}</Card.Title> */}
                            <Card.Subtitle className="mb-2 text-muted">
                              <div>Date: {formatDate(feedback.timestamp)}</div>
                              <div>Time: {formatTime(feedback.timestamp)}</div>
                            </Card.Subtitle>
                            <Card.Text><strong>Feedback Message: {feedback.message}</strong></Card.Text>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewFeedback;

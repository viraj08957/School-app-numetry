import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../../../assets/css/ViewFeedback.css';

const ViewFeedback = () => {
  const {parentId} = useParams();
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/feedbackTeacher/get/${parentId}`);
        setFeedbackData(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, [parentId]);

  return (
    <div className="parent-dashboard">
    {/* Top Navbar */}
    <nav className="navbar navbar-dark bg-dark fixed-top" style={{ height: "100px" }}>
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
            <Link to={`/parent-dashboard/check-appointments/${parentId}`} className= 'nav-link ' >
              Check Appointments
            </Link>
            </li>
            
            <li>
            <Link to={`/parent-dashboard/check-notifications/${parentId}`} className="nav-link" >
              Check Notifications
            </Link>
            </li>

            <li>
            <Link to={`/parent-dashboard/send-feedback-to-teachers/${parentId}`} className= 'nav-link '  >
              Send Feedback to Teachers
            </Link>
            </li>

            <li>
            <Link to={`/parent-dashboard/view-feedback/${parentId}`} className= 'nav-link active'>
              View Feedback
            </Link>
            </li>

            <li>
            <Link to={`/parent-dashboard/view-profile/${parentId}`}  className= 'nav-link'>
              View Profile
            </Link>
            </li>

          </ul>
        </div>
        <div className="col-md-9 main-content">
          <Card>
          <Card.Body>
      <h2>View Feedback</h2>
      <Row className="card-container">
      {feedbackData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((feedback, index) => (
          <Col key={index} md={12}>
            <Card className="feedback-card" style={{ width: '50%' }}>
              <Card.Body>
                {/* <Card.Title>Teacher</Card.Title> */}
                <Card.Subtitle className="mb-2 text-muted">
                  {feedback.teacher.name}
                </Card.Subtitle>
                <Card.Text className="mb-2 text-muted">
                  Date and Time:{' '}
                  {new Date(feedback.timestamp).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                  })}
                </Card.Text>
                <Card.Text>
                  <strong>Feedback Message:</strong> {feedback.message}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Card.Body>
      </Card>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ViewFeedback;

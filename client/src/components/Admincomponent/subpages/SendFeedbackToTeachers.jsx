// SendFeedbackToTeachers.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap'; // Added Alert for user feedback
import axios from 'axios';
import { useParams , Link} from 'react-router-dom';

const SendFeedbackToTeachers = () => {
  const { parentId } = useParams();
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Track success message state

  useEffect(() => {
    // Fetch teachers when the component mounts
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/teachers');
        console.log('Fetched teachers:', response.data);
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers();
  }, []);

  const handleSendFeedback = async () => {
    try {
      // Ensure a teacher is selected
      if (!selectedTeacher) {
        console.error('Please select a teacher');
        return;
      }
  
      // Ensure student information is available (replace with your actual student information)
      const parentInfo = {
        _id: `${parentId}`, // Replace with the actual student ID
        // Add other student information if required
      };
  
      // Send feedback to the server
      await axios.post('http://localhost:5000/feedback/submit/parent', {
        teacher: selectedTeacher,
        message: feedbackMessage,
        parent: parentInfo, // Include student information in the request
      });
  
      

      // Clear form fields after submitting feedback
      setSelectedTeacher('');
      setFeedbackMessage('');
      setShowSuccessAlert(true); // Show success message

      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

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
            <Link to={`/parent-dashboard/send-feedback-to-teachers/${parentId}`} className= 'nav-link active'  >
              Send Feedback to Teachers
            </Link>
            </li>

            <li>
            <Link to={`/parent-dashboard/view-feedback/${parentId}`} className= 'nav-link'>
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
      <h2>Send Feedback</h2>
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          Feedback submitted successfully!
        </Alert>
      )}
      <Form>
        <Form.Group className="mb-3" controlId="teacherSelect">
          <Form.Label>Select Teacher</Form.Label>
          <Form.Control
            as="select"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="" disabled>Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>{`${teacher.firstName} ${teacher.lastName}`}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="feedbackMessage">
          <Form.Label>Feedback Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSendFeedback}>
          Send Feedback
        </Button>
      </Form>
      </Card.Body>
      </Card>
    </div>
    </div>
    </div>
    </div>
  );
};


export default SendFeedbackToTeachers;


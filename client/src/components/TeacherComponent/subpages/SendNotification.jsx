// SendNotification.jsx

import React, { useState , useEffect} from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SendNotification = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    studentId: '',
    parentName: '',
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedNotification = { ...notification };

    updatedNotification[name] = value;
      
    // Fetch and set the parent's name when a student is selected
    if (name === 'studentId') {
      const selectedStudent = students.find((student) => student._id === value);
      if (selectedStudent) {
        console.log('Selected Student:', selectedStudent);

        // Check if the student object has a 'parentName' property
        if ('parentName' in selectedStudent) {
          console.log('Parent Name:', selectedStudent.parentName);

          // Update the parentName property
          updatedNotification.parentName = selectedStudent.parentName;
        } else {
          console.log('parentName not found for the selected student.');
          // Optionally set parentName to an empty string or handle it in another way
          updatedNotification.parentName = '';
        }
      } else {
        console.log('Selected Student not found:', value);
      }
    }

    // Set the updated state
    setNotification(updatedNotification);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API endpoint
      const response = await axios.post('http://localhost:5000/notifications/send-notification', notification);

      // Handle the response as needed
      
      console.log('Notification created successfully:', response.data);
      alert('Notification is sent!')
      navigate(`/teacher-dashboard/${teacherId}`)
      // Optionally, you can redirect the user or perform other actions after successful submission
    } catch (error) {
      console.error('Error creating appointment:', error.message);
      // Handle errors, show an alert, or perform other actions
    }
  };


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
               <Link to={`/teacher-dashboard/send-notification/${teacherId}`} className = 'nav-link active'>
                 Send Notification
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/send-feedback/${teacherId}`} className = 'nav-link'>
                 Send Feedback
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/view-feedback/${teacherId}` } className = 'nav-link'>
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
        <Card.Body>
      <h2>Send Notification to Parents</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={notification.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={notification.message}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStudentId">
              <Form.Label>Student's Name</Form.Label>
              <Form.Control
                as="select"
                name="studentId"
                value={notification.studentId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {`${student.firstName} ${student.lastName} - ${student.grade}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formParentName">
              <Form.Label>Parent's Name</Form.Label>
              <Form.Control
                type="text"
                name="parentName"
                value={notification.parentName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Send Notification
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

export default SendNotification;








import React, { useState, useEffect } from 'react';
import { Form, Button, Nav, Alert , Card} from 'react-bootstrap';
import axios from 'axios';
import {useParams, Link} from "react-router-dom"
import '../../../assets/css/SendFeedback.css';


const SendFeedback = () => {
  const {teacherId} = useParams();
  const [feedbackType, setFeedbackType] = useState('student');
  const [feedback, setFeedback] = useState({
    studentName: '',
    grade: '',
    parentName: '',
    parentStudentName: '',
    message: '',
  });

  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedbackTeacher/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchParents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedbackTeacher/parents');
        setParents(response.data);
      } catch (error) {
        console.error('Error fetching parents:', error);
      }
    };

    fetchStudents();
    fetchParents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  
    if (name === 'studentName') {
      const selectedStudent = students.find((student) => student._id === value);
      if (selectedStudent) {
        setFeedback({
          ...feedback,
          studentName: selectedStudent._id, // Update the selected student's _id
          grade: selectedStudent.grade,
        });
      }
    }
  
    if (name === 'parentName') {
      const selectedParent = parents.find((parent) => parent._id === value);
      if (selectedParent) {
        // Assuming childInfo is an array of child information
        const firstChild = selectedParent.childInfo[0];
        if (firstChild) {
          setFeedback({
            ...feedback,
            parentName: selectedParent._id, // Update the selected parent's _id
            parentStudentName: `${firstChild.childName} - ${firstChild.childGrade}`,
          });
        }
      }
    }
  };
  

  const handleFeedbackTypeChange = (type) => {
    setFeedbackType(type);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send feedback to the server
      // Include the teacherId in the request payload
      await axios.post(`http://localhost:5000/feedbackTeacher/submit/${teacherId}`, {
        student: feedback.studentName !== '' ? feedback.studentName : null,
        parent: feedback.parentName !== '' ? feedback.parentName : null,
        message: feedback.message,
      });
  
      // Reset the form
      setFeedback({
        studentName: '',
        grade: '',
        parentName: '',
        parentStudentName: '',
        message: '',
      });

      setShowSuccessAlert(true); 
      // You can also show a success message to the user
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
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
            {/* < Card.body> */}
    <div>
        {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          Feedback submitted successfully!
        </Alert>
      )}
      <h2>Send Feedback</h2>
      <Nav
        variant="tabs"
        activeKey={feedbackType}
        onSelect={(type) => handleFeedbackTypeChange(type)}
        className="feedback-nav"
      >
        <Nav.Item>
          <Nav.Link eventKey="student">To Student</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="parent">To Parent</Nav.Link>
        </Nav.Item>
      </Nav>

      <Form onSubmit={handleSubmit}>
        {feedbackType === 'student' ? (
          <>
            <Form.Group controlId="formStudentName">
              <Form.Label>Select Student</Form.Label>
              <Form.Control
                as="select"
                name="studentName"
                value={feedback.studentName}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {`${student.firstName} ${student.lastName}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                name="grade"
                value={feedback.grade}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
          </>
        ) : (
          <>
            <Form.Group controlId="formParentName">
              <Form.Label>Select Parent</Form.Label>
              <Form.Control
                as="select"
                name="parentName"
                value={feedback.parentName}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Parent</option>
                {parents.map((parent) => (
                  <option key={parent._id} value={parent._id}>
                    {`${parent.firstName} ${parent.lastName}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formParentStudentName">
              <Form.Label>Student's Name</Form.Label>
              <Form.Control
                type="text"
                name="parentStudentName"
                value={feedback.parentStudentName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </>
        )}

        <Form.Group controlId="formMessage">
          <Form.Label>Feedback Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={feedback.message}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Send Feedback
        </Button>
      </Form>
  
    </div>
   {/* </ Card.body> */}
    </Card>
    </div>

    </div>

    </div>
    </div>

  );
};

export default SendFeedback;























// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     let feedbackData = {
//       message: feedback.message,
//     };

//     // Add logic to handle feedback submission (e.g., send to the backend)
//     if (feedbackType === 'student') {
//       feedbackData = {
//         ...feedbackData,
//         student: feedback.studentName,
//         grade: feedback.grade,
//       };
//     } else if (feedbackType === 'parent') {
//       feedbackData = {
//         ...feedbackData,
//         parent: feedback.parentName,
//         student: feedback.parentStudentName,
//       };
//     }

//     await axios.post('/feedback/submit', feedbackData);

//     // Reset the form
//     setFeedback({
//       studentName: '',
//       grade: '',
//       parentName: '',
//       parentStudentName: '',
//       message: '',
//     });

//     // You can also show a success message to the user
//     console.log('Feedback submitted successfully');
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//   }
// };

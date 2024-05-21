// PostSchedules.jsx
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate , useParams, Link} from 'react-router-dom';

const PostSchedules = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const [schedule, setSchedule] = useState({
    grade: 'Select Grade',
    files: null,
  });

  const handleInputChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSchedule({ ...schedule, files: e.target.files });
  };

  const handlePostSchedules = async () => {
    const formData = new FormData();
    formData.append('grade', schedule.grade);

    for (let i = 0; i < schedule.files.length; i++) {
      formData.append('files', schedule.files[i]);
    }

    try {
      await axios.post('http://localhost:5000/schedule/post-schedule', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show alert if the schedule is posted successfully
      alert('Schedule posted successfully');

      // Navigate to another route after successful submission
      navigate(`/teacher-dashboard/${teacherId}`)// Replace '/target-route' with the desired route

    } catch (error) {
      console.error('Error posting schedule:', error);
      // Optionally, you can add logic here to handle errors (e.g., show an error message).
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
               <Link to={`/teacher-dashboard/post-schedules/${teacherId}`} className = 'nav-link active'>
                 Post Schedules
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/set-appointment/${teacherId}`} className = 'nav-link'>
                 Set Appointment
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/send-notification/${teacherId}`} className = 'nav-link'>
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
      <h2>Post Schedules</h2>
        <Card.Body>
          <Form>
            <Form.Group controlId="formGrade" className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                as="select"
                name="grade"
                required
                defaultValue="Select Grade"
                onChange={handleInputChange}
              >
                <option value="Select Grade" disabled>Select Grade</option>
                <option value="grade1">Grade 1</option>
                <option value="grade2">Grade 2</option>
                <option value="grade3">Grade 3</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image and Document (PDF/Word)</Form.Label>
              <Form.Control
                type="file"
                name="files"
                accept="image/*,.pdf, .doc, .docx"
                required
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              onClick={handlePostSchedules}
              className="mt-3"
            >
              Submit
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

export default PostSchedules;

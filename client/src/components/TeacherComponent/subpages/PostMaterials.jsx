 
// PostMaterials.jsx
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

const PostMaterials = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState({
    title: '',
    description: '',
    subject: 'Select Subject',
    grade: 'Select Grade',
    file: null,
  });

  const handleInputChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setMaterial({ ...material, file: e.target.files[0] });
  };

  const handlePostMaterial = async () => {
    const formData = new FormData();
    formData.append('title', material.title);
    formData.append('description', material.description);
    formData.append('subject', material.subject);
    formData.append('grade', material.grade);
    formData.append('file', material.file);

    try {
      await axios.post('http://localhost:5000/materials/post-material', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Material posted successfully');
      navigate(`/teacher-dashboard/${teacherId}`)
      // Optionally, you can add logic here to handle success (e.g., show a success message).
    } catch (error) {
      console.error('Error posting material:', error);
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
               <Link to={`/teacher-dashboard/post-materials/${teacherId}`} className = 'nav-link active'>
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
    <Card.Body>
      <h2>Post Study Materials</h2>
      <Form className="registration-form">
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter material title"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Enter material description"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subject:</label>
          <select
            name="subject"
            className="form-select"
            required
            defaultValue="Select Subject"
            onChange={handleInputChange}
          >
            <option value="Select Subject" disabled>Select Subject</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Biology">Biology</option>
            <option value="History">History</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Grade:</label>
          <select
            name="grade"
            className="form-select"
            required
            defaultValue="Select Grade"
            onChange={handleInputChange}
          >
            <option value="Select Grade" disabled>Select Grade</option>
            <option value="grade1">Grade 1</option>
            <option value="grade2">Grade 2</option>
            <option value="grade3">Grade 3</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Material:</label>
          <input
            type="file"
            name="file"
            accept="application/pdf"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-end">
            <Button variant="primary" onClick={handlePostMaterial}>
              Post Material
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    </div>
    </div>
    </div>
    </div>
  );
};

export default PostMaterials;

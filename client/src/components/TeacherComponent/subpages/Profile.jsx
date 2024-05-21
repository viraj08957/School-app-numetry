// Profile.jsx

import React, { useState,useEffect } from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import '../../../assets/css/Profile.css'; // Import the CSS file for custom styling
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../../../assets/css/TeacherDashboard.css"

const Profile = () => {
  const { teacherId } = useParams();
  const [teacherProfile, setTeacherProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    phoneNumber: '',
    username: '',
    password: '',
    country: '',
    city: '',
    address: '',
    profilePhoto: '[ProfilePhotoURL]',
  });
  const [editing, setEditing] = useState(false);


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


  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Assuming you have an API endpoint for updating teacher data
      await axios.put(`http://localhost:5000/profile/teacher/${teacherId}`, teacherProfile);

      // After saving changes, switch back to view mode
      setEditing(false);
    } catch (error) {
      console.error('Error saving teacher data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherProfile({ ...teacherProfile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setTeacherProfile({ ...teacherProfile, teacherPhoto: file.name }); // Update to the correct property
    };
  
    if (file) {
      reader.readAsDataURL(file);
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
             <Link to={`/teacher-dashboard/profile/${teacherId}`} className = 'nav-link active'>
               Profile
             </Link>


             </li>
         </ul>
       </div>

       <div className="col-md-9 main-content">
    <Card className="shadow" style={{width:"700px"}}>
      <Card.Body >
        <Card.Title style={{marginLeft: "600px"}}>
          {editing ? (
            <Button variant="secondary" onClick={handleSaveClick}>
              Save
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </Card.Title>

        <div>
          {/* Conditional rendering of profile photo */}
{/* Conditional rendering of profile photo */}
       {editing ? (
  <Form.Group controlId="formProfilePhoto">
    <Form.Label>Change Profile Photo</Form.Label>
    <Form.Control type="file" name="profilePhoto" accept="image/*" onChange={handlePhotoChange} />
  </Form.Group>
) : (
  <Image src={`http://localhost:5000/profile/${teacherProfile.teacherPhoto}`} className="profile-photo" alt="Profile Photo" roundedCircle />
)}




          {editing ? (
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={teacherProfile.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={teacherProfile.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={teacherProfile.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={teacherProfile.age}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  name="phoneNumber"
                  value={teacherProfile.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={teacherProfile.username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={teacherProfile.country}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={teacherProfile.city}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={teacherProfile.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          ) : (
            <div>
              <p>
                <strong>Name:</strong> {`${teacherProfile.firstName} ${teacherProfile.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {teacherProfile.email}
              </p>
              <p>
                <strong>Age:</strong> {teacherProfile.age}
              </p>
              <p>
                <strong>Phone Number:</strong> {teacherProfile.phoneNumber}
              </p>
              <p>
                <strong>Username:</strong> {teacherProfile.username}
              </p>
              <p>
                <strong>Password:</strong> ********
              </p>
              <p>
                <strong>Country:</strong> {teacherProfile.country}
              </p>
              <p>
                <strong>City:</strong> {teacherProfile.city}
              </p>
              <p>
                <strong>Address:</strong> {teacherProfile.address}
              </p>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;






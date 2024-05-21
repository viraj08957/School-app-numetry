// StudentProfile.jsx
import React, { useState , useEffect} from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import { useParams , Link} from 'react-router-dom';
import '../../../assets/css/Profile.css'; // Import the CSS file for custom styling
import axios from 'axios';



const StudentProfile = () => {
  const { studentId } = useParams();
  // Sample student profile data (replace with actual data or fetch from an API)
  const [studentProfile, setStudentProfile] = useState({
    firstName: '',
    lastName: '',
    email: 'student@example.com',
    age: 18,
    phoneNumber: '123-456-7890',
    username: 'student_username',
    password: '********', // Placeholder for password (not recommended in a real application)
    country: 'United States',
    city: 'Cityville',
    address: '456 Campus Street',
    profilePhoto: '[ProfilePhotoURL]', // Replace with the URL of the default profile photo
    // Add more profile fields as needed
  });

  const [editing, setEditing] = useState(false);


  useEffect(() => {
    // Fetch stuednt data when the component mounts
    console.log('studentId:', studentId);
    console.log('studentProfile:', studentProfile); // Log the studentProfile object
    fetchStudentData();
  }, [studentId]); // Re-fetch data when studentId changes
  

 

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/student/${studentId}`);
      console.log('Response Data:', response.data); // Log the entire response data
      const fetchStudentData = response.data;
  
      console.log('Fetched Student Data:', fetchStudentData);
  
      // Update the state with the fetched data
      setStudentProfile(fetchStudentData);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };





  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Add logic to save the edited profile data (e.g., send to the backend)
    // For simplicity, I'm just toggling the editing state in this example
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentProfile({ ...studentProfile, [name]: value });
  };

  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setStudentProfile({ ...studentProfile, studentPhoto: file.name }); // Update to the correct property
    };
  
    if (file) {
      reader.readAsDataURL(file);
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
               <Link to={`/student-dashboard/view-results/${studentId}`} className= 'nav-link '>
              View Results
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/view-materials/${studentId}`} className= 'nav-link ' >
              View Materials
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/view-schedule/${studentId}`} className= 'nav-link' >
              View Schedule
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/view-feedback/${studentId}`} className= 'nav-link'>
              View Feedback
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/send-feedback/${studentId}`} className= 'nav-link '>
              Send Feedback
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/student-profile/${studentId}`} className= 'nav-link active' >
              Student Profile
            </Link>
            </li>

          </ul>
        </div>
        <div className="col-md-9 main-content">
    <Card className="shadow" style={{ width: "700px" }}>
      <Card.Body>
        <Card.Title style={{ marginLeft: "600px" }}>
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
          {editing ? (
            <Form.Group controlId="formProfilePhoto">
              <Form.Label>Change Profile Photo</Form.Label>
              <Form.Control type="file" name="profilePhoto" accept="image/*" onChange={handlePhotoChange} />
            </Form.Group>
          ) : (
            <Image src={`http://localhost:5000/profile/${studentProfile.studentPhoto}`} className="profile-photo" alt="Profile Photo" roundedCircle />
          )}

          {editing ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={studentProfile.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={studentProfile.age}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={studentProfile.username}
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
                  value={studentProfile.country}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={studentProfile.city}
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
                  value={studentProfile.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          ) : (
            <div>
              <p>
                <strong>Name:</strong>  {`${studentProfile.firstName} ${studentProfile.lastName}`}
              </p>
              <p>
                <strong>Age:</strong> {studentProfile.age}
              </p>
              <p>
                <strong>Username:</strong> {studentProfile.username}
              </p>
              <p>
                <strong>Password:</strong> ********
              </p>
              <p>
                <strong>Country:</strong> {studentProfile.country}
              </p>
              <p>
                <strong>City:</strong> {studentProfile.city}
              </p>
              <p>
                <strong>Address:</strong> {studentProfile.address}
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

export default StudentProfile;

// ViewProfile.jsx
import React, { useState, useEffect} from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import '../../../assets/css/Profile.css'; // Import the CSS file for custom styling
import axios from 'axios';



const ViewProfile = () => {
  const {parentId} = useParams();

  // Sample parent profile data (replace with actual data or fetch from an API)
  const [parentProfile, setParentProfile] = useState({
    firstName: '',
    lastName: '',
    email: 'john.doe@example.com',
    age: 40, // Updated age for a parent
    phoneNumber: '123-456-7890',
    username: 'john_doe_parent', // Updated username for a parent
    password: '********', // Placeholder for password (not recommended in a real application)
    country: 'United States',
    city: 'New York',
    address: '123 Main Street',
    profilePhoto: '[ProfilePhotoURL]', // Replace with the URL of the default profile photo
    // Add more profile fields as needed
  });

  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  
  useEffect(() => {
    // Fetch stuednt data when the component mounts
    console.log('parentId:', parentId);
    console.log('parentProfile:', parentProfile); // Log the ParentProfile object
    fetchParentData();
  }, [parentId]); // Re-fetch data when parentId changes
  


  
  const fetchParentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/parent/${parentId}`);
      console.log('Response Data:', response.data); // Log the entire response data
      const parentData = response.data;
  
      console.log('Fetched Parent Data:', parentData);
  
      // Update the state with the fetched data
      setParentProfile(parentData);
    } catch (error) {
      console.error('Error fetching parent data:', error);
    }
  };
  




  const handleSaveClick = () => {
    // Add logic to save the edited profile data (e.g., send to the backend)
    // For simplicity, I'm just toggling the editing state in this example
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParentProfile({ ...parentProfile, [name]: value });
  };


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setParentProfile({ ...parentProfile, parentPhoto: file.name }); // Update to the correct property
    };
  
    if (file) {
      reader.readAsDataURL(file);
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
            <Link to={`/parent-dashboard/send-feedback-to-teachers/${parentId}`} className= 'nav-link '  >
              Send Feedback to Teachers
            </Link>
            </li>

            <li>
            <Link to={`/parent-dashboard/view-feedback/${parentId}`} className= 'nav-link '>
              View Feedback
            </Link>
            </li>

            <li>
            <Link to={`/parent-dashboard/view-profile/${parentId}`}  className= 'nav-link active'>
              View Profile
            </Link>
            </li>

          </ul>
        </div>
        <div className="col-md-9 main-content">
          
    <Card className="shadow p-3 mb-5 bg-white rounded" style={{ width: '700px' }}>
      <Card.Body>
        <Card.Title style={{ marginLeft: '600px' }}>
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
            <Image src={`http://localhost:5000/profile/${parentProfile.parentPhoto}`} className="profile-photo" alt="Profile Photo" roundedCircle />

          )}

          {editing ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={parentProfile.name} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={parentProfile.email} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" name="age" value={parentProfile.age} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" name="phoneNumber" value={parentProfile.phoneNumber} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={parentProfile.username} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter new password" onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" name="country" value={parentProfile.country} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" value={parentProfile.city} onChange={handleInputChange} required />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" rows={3} name="address" value={parentProfile.address} onChange={handleInputChange} required />
              </Form.Group>
            </Form>
          ) : (
            <div>
              <p>
              <strong>Name:</strong>  {`${parentProfile.firstName} ${parentProfile.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {parentProfile.email}
              </p>
              <p>
                <strong>Age:</strong> {parentProfile.age}
              </p>
              <p>
                <strong>Phone Number:</strong> {parentProfile.phoneNumber}
              </p>
              <p>
                <strong>Username:</strong> {parentProfile.username}
              </p>
              <p>
                <strong>Password:</strong> ********
              </p>
              <p>
                <strong>Country:</strong> {parentProfile.country}
              </p>
              <p>
                <strong>City:</strong> {parentProfile.city}
              </p>
              <p>
                <strong>Address:</strong> {parentProfile.address}
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

export default ViewProfile;

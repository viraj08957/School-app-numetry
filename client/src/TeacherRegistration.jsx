import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: 'teacher',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    country: '',
    city: '',
    address: '',
    age: '',
    phoneNumber: '',
    educationalBackground: '',
    teachingExperience: '',
    teacherPhoto: null, // Assuming you're handling file uploads separately
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create FormData object
      const formDataToSend = new FormData();
  
      // Append each form field to FormData
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
  
      // Send a POST request to the server with FormData
      const response = await axios.post('http://localhost:5000/register', formDataToSend);
      alert('Successfully Registered');
      navigate('/login');
      console.log('Registration successful', response.data);
     
    } catch (error) {
      console.error('Error during registration:', error);
      console.error('Error details:', error.response);
    }
  };
  

  const handleFileUpload = async (file, fieldName) => {
    try {
      // Send the file to the server for processing
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
  
      // Assuming the server responds with the file name
      const fileName = response.data.fileName; // Update the key based on your server response
  
      // Use fieldName if needed
      console.log(`File uploaded for ${fieldName}: ${fileName}`);
  
      return fileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Propagate the error to the caller
    }
  };
  
  
  
  
// ...
const handleFileChange = (e) => {
  const file = e.target.files[0];

  handleFileUpload(file, 'teacherPhoto')
    .then((photoFileName) => {
      setFormData((prevData) => ({ ...prevData, teacherPhoto: photoFileName }));
    })
    .catch((error) => {
      console.error('Error during file upload:', error);
    });
};

// ...

  
  

  return (
    <div className="card shadow p-4">
      <form onSubmit={handleSubmit}>
      
          <input
            type="hidden"
            value={formData.userType}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, userType: e.target.value }))}
          />
        
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input type="text" className="form-control" name="firstName"
             onChange={(e) => setFormData((prevData) => ({ ...prevData, firstName: e.target.value }))} 
           value={formData.firstName} placeholder="Enter your first name" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input type="text" className="form-control" name="lastName" 
            onChange={(e) => setFormData((prevData) => ({ ...prevData, lastName: e.target.value }))} 
           value={formData.lastName} placeholder="Enter your last name" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input type="text" className="form-control" name="age" 
            onChange={(e) => setFormData((prevData) => ({ ...prevData, age: e.target.value }))} 
          value={formData.age} placeholder="Enter your age" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" name="email" 
            onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))} 
          placeholder="Enter your email" required />
        </div>
        <div>

          <label>Username:</label>
          <input type="text" name="username" 
            onChange={(e) => setFormData((prevData) => ({ ...prevData, username: e.target.value }))} 
          value={formData.username} placeholder="Choose a username" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" name="password" 
            onChange={(e) => setFormData((prevData) => ({ ...prevData, password: e.target.value }))} 
          value={formData.password} placeholder="Enter your password" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input type="text" className="form-control" name="phoneNumber"
             onChange={(e) => setFormData((prevData) => ({ ...prevData, phoneNumber: e.target.value }))} 
           value={formData.phoneNumber} placeholder="Enter your phone number" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Country:</label>
          <select className="form-select" name="country" 
            onChange={(e) => setFormData((prevData) => ({ ...prevData, country: e.target.value }))} 
          value={formData.country} placeholder="Select your country" required>
            <option value="" disabled>Select Country</option>
            <option value="country1">Country 1</option>
            <option value="country2">Country 2</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">City:</label>
          <select className="form-select" name="city" 
            onChange={(e) => setFormData((prevData) => ({ ...prevData, city: e.target.value }))} 
          value={formData.city} placeholder="Select your city" required>
            <option value="" disabled>Select City</option>
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input type="text" className="form-control" name="address" 
           onChange={(e) => setFormData((prevData) => ({ ...prevData, address: e.target.value }))} 
          value={formData.address} placeholder="Enter your address" />
        </div>

        <div className="mb-3">
          <label className="form-label">Educational Background:</label>
          <select className="form-select" name="educationalBackground" 
           onChange={(e) => setFormData((prevData) => ({ ...prevData, educationalBackground: e.target.value }))} 
          value={formData.educationalBackground} placeholder="Select your educational background">
            <option value="" disabled>Select Educational Background</option>
            <option value="highSchool">High School</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">Ph.D.</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Years of teaching Experience:</label>
          <input type="number" className="form-control" name="teachingExperience" 
           onChange={(e) => setFormData((prevData) => ({ ...prevData, teachingExperience: e.target.value }))}
          value={formData.teachingExperience} placeholder="Enter your teaching experience" />
        </div>
        
        <div className="mb-3">
        <label htmlFor="teacherPhoto" className="form-label">
          Teacher Photo
        </label>
        <input
          type="file"
          className="form-control"
          id="teacherPhoto"
          name="file"
          onChange={handleFileChange}
          accept="image/*" 
        />
      </div>

        <div className="text-end">
        <button type="button" className="btn btn-primary" 
        onClick={handleSubmit}>Register</button>
        </div>
      </form>
    </div>
  );
};


// TeacherRegistration.propTypes = {
//   handleChange: PropTypes.func.isRequired,
//   formData: PropTypes.object.isRequired,
//   handlePhotoUpload: PropTypes.func.isRequired
//   // handleSubmit: PropTypes.func.isRequired,
// };


export default TeacherRegistration;
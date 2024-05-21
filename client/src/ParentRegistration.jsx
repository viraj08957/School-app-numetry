import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ParentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: 'parent',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
    country: '',
    city: '',
    address: '',
    childInfo: [{ childName: '', childGrade: '' }],
    parentPhoto: null,
  });

 



  const handleChildInfoChange = (index, field, value) => {
    const updatedChildInfo = [...formData.childInfo];
    updatedChildInfo[index][field] = value;
    setFormData((prevData) => ({ ...prevData, childInfo: updatedChildInfo }));
  };

  const handleAddChild = () => {
    setFormData((prevData) => ({
      ...prevData,
      childInfo: [...prevData.childInfo, { childName: '', childGrade: '' }],
    }));
  };

  const handleRemoveChild = (index) => {
    const updatedChildInfo = [...formData.childInfo];
    updatedChildInfo.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, childInfo: updatedChildInfo }));
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
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    handleFileUpload(file, 'parentPhoto')
      .then((photoFileName) => {
        setFormData((prevData) => ({ ...prevData, parentPhoto: photoFileName }));
      })
      .catch((error) => {
        console.error('Error during file upload:', error);
      });
  };
  




  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      alert('Successfully Registered');
      navigate('/login');
      console.log('Registration successful', response.data);
      
    } catch (error) {
      console.error('Error during registration:', error);
      console.error('Error details:', error.response);
    }
  };

  
  return (
    <div className="card shadow p-4">
      <form onSubmit={handleSubmit}className="registration-form">
      <input
            type="hidden"
            value={formData.userType}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, userType: e.target.value }))}
          />
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            name="firstName"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, firstName: e.target.value }))}
            value={formData.firstName}
            className="form-control"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, lastName: e.target.value }))}
            value={formData.lastName}
            className="form-control"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, phoneNumber: e.target.value }))}
            value={formData.phoneNumber}
            className="form-control"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))}
            value={formData.email}
            className="form-control"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, username: e.target.value }))}
            value={formData.username}
            className="form-control"
            placeholder="Choose a username"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, password: e.target.value }))}
            value={formData.password}
            className="form-control"
            placeholder="Choose a password"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <select
            name="country"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, country: e.target.value }))}
            value={formData.country}
            className="form-select"
            placeholder="Select your country"
            required
          >
            <option value="" disabled>Select Country</option>
            <option value="country1">Country 1</option>
            <option value="country2">Country 2</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">City:</label>
          <select
            name="city"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, city: e.target.value }))}
            value={formData.city}
            className="form-select"
            placeholder="Select your city"
            required
          >
            <option value="" disabled>Select City</option>
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            onChange={(e) => setFormData((prevData) => ({ ...prevData, address: e.target.value }))}
            value={formData.address}
            className="form-control"
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Child Information:</label>
          {formData.childInfo.map((child, index) => (
            <div key={index} className="child-info mb-2">
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Child's Full Name"
                  value={child.childName}
                  onChange={(e) => handleChildInfoChange(index, 'childName', e.target.value)}
                  className="form-control me-2"
                />
                <select
                  placeholder="Child's Grade"
                  value={child.childGrade}
                  onChange={(e) => handleChildInfoChange(index, 'childGrade', e.target.value)}
                  className="form-select me-2"
                >
                  <option value="" disabled>Select Grade</option>
                  <option value="grade1">Grade 1</option>
                  <option value="grade2">Grade 2</option>
                </select>
                <button type="button" onClick={() => handleRemoveChild(index)} className="btn btn-danger">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddChild} className="btn btn-success mt-2">
            Add Child
          </button>
        </div>
        <div className="mb-3">
        <label className="form-label">Upload Your Photo:</label>
        <input
          type="file"
          name="parentPhoto"
          onChange={handleFileChange}
          accept="image/*"
          className="form-control"
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

export default ParentRegistration;

// Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  // const { teacherId } = useParams();
  const [isRedirecting, setRedirecting] = useState(false);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', loginData);
      const userData = response.data;
  
      console.log('Login successful', userData);
  
      setRedirecting(true);
  
      redirectBasedOnUserType(userData.userType, userData._id); // Assuming _id is present in the server response
    } catch (error) {
      console.error('Error during login:', error);
      console.error('Error details:', error.response);
    }
  };
  
  const redirectBasedOnUserType = (userType, userId) => {
    switch (userType) {
      case 'student':
        navigate(`/student-dashboard/${userId}`);
        break;
      case 'parent':
        navigate(`/parent-dashboard/${userId}`);
        break;
      case 'teacher':
        navigate(`/teacher-dashboard/${userId}`);
        break;
      default:
        console.error('Invalid user type');
    }
  };
  

  useEffect(() => {
    if (isRedirecting) {
      setRedirecting(false);
    }
  }, [isRedirecting]);

  return (
    <div className="container mt-5" style={{ marginBottom: "150px" }}>
      <Link to="/" className="btn" style={{ position: "absolute", top: "20px", right: "250px", backgroundColor: "black", color: "white" }}>
        Back to Home
      </Link>
      <h2 className="text-center">Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={handleChange}
                  value={loginData.username}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  value={loginData.password}
                  required
                />
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

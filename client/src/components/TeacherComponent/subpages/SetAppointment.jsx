import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import "../../../assets/css/TeacherDashboard.css"

const SetAppointment = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    studentId: '',
    parentName: '',
    description: '',
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

    // Copy the existing appointment state
    const updatedAppointment = { ...appointment };

    // Update the specific property
    updatedAppointment[name] = value;

    // Fetch and set the parent's name when a student is selected
    if (name === 'studentId') {
      const selectedStudent = students.find((student) => student._id === value);
      if (selectedStudent) {
        console.log('Selected Student:', selectedStudent);

        // Check if the student object has a 'parentName' property
        if ('parentName' in selectedStudent) {
          console.log('Parent Name:', selectedStudent.parentName);

          // Update the parentName property
          updatedAppointment.parentName = selectedStudent.parentName;
        } else {
          console.log('parentName not found for the selected student.');
          // Optionally set parentName to an empty string or handle it in another way
          updatedAppointment.parentName = '';
        }
      } else {
        console.log('Selected Student not found:', value);
      }
    }

    // Set the updated state
    setAppointment(updatedAppointment);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API endpoint
      const response = await axios.post('http://localhost:5000/appointments/set-appointment', appointment);

      // Handle the response as needed
      
      console.log('Appointment created successfully:', response.data);
      alert('Appointement is set!')
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
                  <Link to={`/teacher-dashboard/set-appointment/${teacherId}`} className = 'nav-link active'>
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
      <h2>Set Appointment with Parents</h2>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={appointment.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={appointment.time}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStudentId">
              <Form.Label>Student's Name</Form.Label>
              <Form.Control
                as="select"
                name="studentId"
                value={appointment.studentId}
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
                value={appointment.parentName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={appointment.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
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

export default SetAppointment;

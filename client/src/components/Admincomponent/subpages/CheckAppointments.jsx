import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams , Link} from 'react-router-dom';


const CheckAppointments = () => {
  const {parentId} = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCheckAppointments = async () => {
    try {
      if (!firstName || !lastName) {
        console.error('Both first and last names are required');
        return;
      }
      

      const response = await axios.get('http://localhost:5000/appointments/check-appointments', {
        params: { firstName, lastName },
      });

      const data = response.data;

      if (response.status === 200) {
        setFilteredAppointments(data);
      } else {
        console.error('Error fetching appointments:', data.message);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };

  const handleAcceptAppointment = (appointmentId) => {
    // Implement logic to accept the appointment (e.g., Axios request)
    console.log(`Appointment ${appointmentId} accepted`);
    // Close the modal
    setShowModal(false);
  };

  const handleRescheduleAppointment = (appointmentId) => {
    // Implement logic to reschedule the appointment (e.g., navigate to reschedule page)
    console.log(`Reschedule appointment ${appointmentId}`);
    // Close the modal
    setShowModal(false);
  };

  const handleCloseModal = () => {
    // Clear selected appointment when closing the modal
    setSelectedAppointment(null);
    setShowModal(false);
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
              <Link to={`/parent-dashboard/check-appointments/${parentId}`} className= 'nav-link active' >
                Check Appointments
              </Link>
              </li>
              
              <li>
              <Link to={`/parent-dashboard/check-notifications/${parentId}`} className="nav-link" >
                Check Notifications
              </Link>
              </li>

              <li>
              <Link to={`/parent-dashboard/send-feedback-to-teachers/${parentId}`} className= 'nav-link'  >
                Send Feedback to Teachers
              </Link>
              </li>

              <li>
              <Link to={`/parent-dashboard/view-feedback/${parentId}`} className= 'nav-link'>
                View Feedback
              </Link>
              </li>

              <li>
              <Link to={`/parent-dashboard/view-profile/${parentId}`}  className= 'nav-link'>
                View Profile
              </Link>
              </li>

            </ul>
          </div>
          <div className="col-md-9 main-content">
            <Card>
            <Card.Body>

      <h2>Check Appointments</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button variant="primary" onClick={handleCheckAppointments}>
          Check Appointments
        </Button>
      </div>

      {/* Display filtered appointments */}
      {filteredAppointments.length > 0 ? (
        <div className="card-container">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="appointment-card">
              <Card.Body>
                <Card.Title>{`Date: ${appointment.date}, Time: ${appointment.time}`}</Card.Title>
                <Card.Text>{`Reason: ${appointment.description}`}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowModal(true);
                  }}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No appointments!</p>
      )}

      {/* Modal for appointment details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>{`Date: ${selectedAppointment.date}`}</p>
              <p>{`Time: ${selectedAppointment.time}`}</p>
              <p>{`Reason: ${selectedAppointment.description}`}</p>
              <Button
                variant="success"
                onClick={() => handleAcceptAppointment(selectedAppointment.id)}
              >
                Accept Appointment
              </Button>
              <Button
                variant="warning"
                onClick={() => handleRescheduleAppointment(selectedAppointment.id)}
              >
                Reschedule Appointment
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
      </Card.Body>
      </Card>
    </div>
    </div>
    </div>
    </div>
  );
};

export default CheckAppointments;

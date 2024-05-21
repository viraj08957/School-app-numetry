import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams , Link} from 'react-router-dom';


const CheckNotifications = () => {
  const {parentId} = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filteredNotification, setFilteredNotification] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCheckNotifications = async () => {
    try {
      if (!firstName || !lastName) {
        console.error('Both first and last names are required');
        return;
      }
      

      const response = await axios.get('http://localhost:5000/notifications/send-notification', {
        params: { firstName, lastName },
      });

      const data = response.data;

      if (response.status === 200) {
        setFilteredNotification(data);
      } else {
        console.error('Error fetching notification:', data.message);
      }
    } catch (error) {
      console.error('Error fetching notification:', error.message);
    }
  };

  const handleCloseModal = () => {
    // Clear selected notification when closing the modal
    setSelectedNotification(null);
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
            <Link to={`/parent-dashboard/check-appointments/${parentId}`} className= 'nav-link ' >
              Check Appointments
            </Link>
            </li>
            
            <li>
            <Link to={`/parent-dashboard/check-notifications/${parentId}`} className="nav-link active" >
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
      <h2>Check Notifications</h2>
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
        <Button variant="primary" onClick={handleCheckNotifications}>
          Check Appointments
        </Button>
      </div>

      {/* Display filtered appointments */}

        <div className="card-container">
          {filteredNotification.map((notification) => (
            <Card key={notification.id} className="notification-card">
              <Card.Body>
                <Card.Title>{`Title: ${notification.title}`}</Card.Title>
                <Card.Text>{`Message: ${notification.message}`}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedNotification(notification);
                    setShowModal(true);
                  }}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
   
      {/* Modal for Notification details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotification && (
            <>
              <p>{`Title: ${selectedNotification.title}`}</p>
              <p>{`Message: ${selectedNotification.message}`}</p>
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

export default CheckNotifications;

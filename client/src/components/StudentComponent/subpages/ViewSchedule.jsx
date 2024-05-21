// ViewSchedules.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';

import '@react-pdf-viewer/core/lib/styles/index.css';

const ViewSchedules = () => {
  const { studentId } = useParams();
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/schedule/get-schedules/${studentId}`);
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, [studentId]);

  const handleDownload = async (filename, preview = false) => {
    try {
      const downloadUrl = `http://localhost:5000/schedule/files/${filename}`;
      const response = await axios.get(downloadUrl, { responseType: 'blob' });

      if (preview) {
        setShowModal(true);
        setSelectedSchedule({
          filename,
          content: URL.createObjectURL(response.data),
        });
      } else {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSchedule(null);
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
            <Link to={`/student-dashboard/view-materials/${studentId}`} className= 'nav-link' >
              View Materials
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/view-schedule/${studentId}`} className= 'nav-link active' >
              View Schedule
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/view-feedback/${studentId}`} className= 'nav-link'>
              View Feedback
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/send-feedback/${studentId}`} className= 'nav-link'>
              Send Feedback
            </Link>
            </li>

            <li>
            <Link to={`/student-dashboard/student-profile/${studentId}`} className= 'nav-link' >
              Student Profile
            </Link>
            </li>

          </ul>
        </div>
        <div className="col-md-9 main-content">
    <div className="view-materials-container">
      <h2>View Schedules</h2>
      {schedules.length === 0 ? (
        <p>No schedules available</p>
      ) : (
        <div>
          {schedules.map((schedule) => (
            <Card key={schedule._id} className="m-2 shadow">
              <div className="row">
                {/* Left column for the image */}
                <div className="col-md-4">
                  <Card.Img variant="top" src={`http://localhost:5000/schedule/files/${schedule.files[1]}`} />
                </div>
                {/* Right column for other elements */}
                <div className="col-md-8">
                  <Card.Body>
                    <Card.Title>{schedule.grade} schedule is here below</Card.Title>
                    <div className="d-flex justify-content-between" style={{marginTop: "50px"}}>
                      <Button variant="primary" onClick={() => handleDownload(schedule.files[0], true)}>
                        <FontAwesomeIcon icon={faEye} /> Preview
                      </Button>
                      <Button variant="secondary" onClick={() => handleDownload(schedule.files[0])}>
                        <FontAwesomeIcon icon={faDownload} /> Download
                      </Button>
                    </div>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>File Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSchedule && (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
              <Viewer fileUrl={selectedSchedule.content} />
            </Worker>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleDownload(selectedSchedule.filename)}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ViewSchedules;


import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '../../../assets/css/ViewMaterials.css';

const ViewMaterials = () => {
  const { studentId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/materials/get-materials/${studentId}`);
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, [studentId]);

  const handleDownload = async (filename, preview = false) => {
    try {
      const downloadUrl = `http://localhost:5000/materials/files/${filename}`;
      const response = await axios.get(downloadUrl, { responseType: 'blob' });

      if (preview) {
        setShowModal(true);
        setSelectedMaterial({
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
    setSelectedMaterial(null);
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
            <Link to={`/student-dashboard/view-materials/${studentId}`} className= 'nav-link active' >
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
      <h2>Explore Educational Materials</h2>
      {materials.length === 0 ? (
        <p>No educational materials are currently available for your grade level.</p>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Materials for Your Grade</Card.Title>
            <ListGroup>
              {materials.map((material) => (
                <ListGroup.Item key={material._id} className="material-item">
                  <div className="material-info">
                    <h3>{material.title}</h3>
                    <p><strong>Description:</strong> {material.description}</p>
                    <p><strong>Subject:</strong> {material.subject}</p>
                    <p><strong>Grade:</strong> {material.grade}</p>
                  </div>
                  <div className="material-actions">
                    <Button variant="secondary" onClick={() => handleDownload(material.file, true)}>
                      <FontAwesomeIcon icon={faEye} /> Preview
                    </Button>
                    <Button variant="danger" onClick={() => handleDownload(material.file)}>
                      <FontAwesomeIcon icon={faDownload} /> Download
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>File Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMaterial && (
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
              <Viewer fileUrl={selectedMaterial.content} />
            </Worker>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleDownload(selectedMaterial.filename)}>
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

export default ViewMaterials;

// ViewResults.jsx
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useParams , Link} from 'react-router-dom';

const ViewResults = () => {

  const { studentId } = useParams();
  const [studentResults, setStudentResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/result/result/students/${studentId}/results`);
        if (!response.ok) {
          throw new Error(`Failed to fetch results for student ${studentId}`);
        }

        const data = await response.json();
        setStudentResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [studentId]);

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
                 <Link to={`/student-dashboard/view-results/${studentId}`} className= 'nav-link active'>
                View Results
              </Link>
              </li>

              <li>
              <Link to={`/student-dashboard/view-materials/${studentId}`} className= 'nav-link' >
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
      <h2>Your Results</h2>
      {studentResults.length === 0 ? (
        <p>No results available</p>
      ) : (
        <Card>
          <Card.Body>
           
            <ListGroup>
              {studentResults.map((result) => (
                <ListGroup.Item
                  key={result._id}
                  className={`d-flex justify-content-between align-items-center fs-5 ${result.result < 50 ? 'bg-danger' : ''}`}
                >
                  <span>
                    <strong>Subject:</strong> {result.subject}
                  </span>
                  <span className={`badge rounded-pill fs-5 ${result.result < 50 ? 'bg-danger' : 'bg-success'}`}>
                    Result: {result.result}
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </div>
    </div>
    </div>
    </div>
  );
};

export default ViewResults;

import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const PostResults = () => {
  const { teacherId } = useParams();
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState({});
  const [editedStudents, setEditedStudents] = useState({});
  const [changesSubmitted, setChangesSubmitted] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    if (!changesSubmitted) {
      const storedResults = JSON.parse(localStorage.getItem('editedStudents')) || {};
      setEditedStudents(storedResults);
    }

    fetchStudents();
  }, [changesSubmitted]);

  useEffect(() => {
    // localStorage.setItem('editedStudents', JSON.stringify(editedStudents));
  }, [editedStudents]);

  const filterStudentsByGrade = (grade) => {
    setSearchInput(grade); // Update search input state
    if (grade === '') {
      setFilteredStudents(students); // Set to the entire list when search input is empty
    } else {
      const filtered = students.filter((student) =>
        student.grade.toLowerCase().includes(grade.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };
  

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/result/students');
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const subjects = ['Math', 'Science', 'History', 'English'];




  const handleInputChange = (e, studentId) => {
    const { name, value } = e.target;
    setEditedStudents((prevEditedStudents) => ({
      ...prevEditedStudents,
      [studentId]: {
        ...prevEditedStudents[studentId],
        [name]: value,
      },
    }));
  };

  const handleSave = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === studentId ? { ...student, ...editedStudents[studentId] } : student
      )
    );
    handleClose(studentId);
  };

  const handleSubmit = async (studentId) => {
    try {
      const student = students.find((student) => student._id === studentId);

      if (!student) {
        console.error('Student not found');
        return;
      }

      const { subject, result } = student;

      console.log('Submitting result:', { studentId, subject, result });

      if (!subject || result === undefined) {
        console.error('Subject and result are required.');
        return;
      }

      const response = await fetch(`http://localhost:5000/result/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          subject,
          result,
        }),
      });

      if (response.ok) {
        console.log('Result submitted successfully');
        setChangesSubmitted(true);

        // Update local state to reflect the changes
        setStudents((prevStudents) =>
          prevStudents.map((prevStudent) =>
            prevStudent._id === studentId ? { ...prevStudent, subject, result } : prevStudent
          )
        );
      } else {
        console.error('Failed to submit result');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }

    handleClose(studentId);
  };

  const handleClose = (studentId) => {
    setShowModal((prevShowModal) => ({ ...prevShowModal, [studentId]: false }));
    
    // Save the editedStudents state in localStorage
    localStorage.setItem('editedStudents', JSON.stringify(editedStudents));
    
    setChangesSubmitted(false);
  };
  

  const handleEdit = async (studentId) => {
    setShowModal((prevShowModal) => ({ ...prevShowModal, [studentId]: true }));
    try {
      const response = await fetch(`http://localhost:5000/result/result/students/${studentId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch student data for ID ${studentId}`);
      }

      const data = await response.json();
      setEditedStudents((prevEditedStudents) => ({
        ...prevEditedStudents,
        [studentId]: { ...data },
      }));
    } catch (error) {
      console.error('Error in handleEdit:', error);
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
               <Link to={`/teacher-dashboard/post-results/${teacherId}`} className = 'nav-link active'>
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
               <Link to={`/teacher-dashboard/set-appointment/${teacherId}`} className = 'nav-link'>
                 Set Appointment
               </Link>
             </li>
             <li className="nav-item">
               <Link to={`/teacher-dashboard/send-notification/${teacherId}`} className = 'nav-link '>
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
      <h2>Post Results</h2>
      <div className="input-group">
            <div className="form-outline" style={{marginLeft:"300px"}} data-mdb-input-init>
              <input
                type="search"
                id="form1"
                placeholder='Search by Grade'
                className="form-control"
                value={searchInput}
                onChange={(e) => filterStudentsByGrade(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-secondary"  style={{height:"40px"}} data-mdb-ripple-init>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <Card.Body>
            {filteredStudents.length === 0 ? (
              <p>No results for the current search.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Grade</th>
                    <th>Subject</th>
                    <th>Result</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.username}</td>
                      <td>{student.grade}</td>
                      <td>{editedStudents[student._id]?.subject || student.subject}</td>
                      <td>{editedStudents[student._id]?.result || student.result}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(student._id)}
                          style={{ marginRight: '10px' }}
                        >
                          Edit
                        </Button>
                        <Button variant="success" onClick={() => handleSubmit(student._id)}>
                          Submit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          {Object.keys(editedStudents).map((studentId) => (
            <Modal key={studentId} show={showModal[studentId]} onHide={() => handleClose(studentId)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Student Result</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={editedStudents[studentId]?.firstName || ''}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
      <Form.Label>Last Name</Form.Label>
      <Form.Control
        type="text"
        name="lastName"
        value={editedStudents[studentId]?.lastName || ''}
        disabled
      />
    </Form.Group>
    <Form.Group controlId="formUsername">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        name="username"
        value={editedStudents[studentId]?.username || ''}
        disabled
      />
    </Form.Group>
    <Form.Group controlId="formGrade">
      <Form.Label>Grade</Form.Label>
      <Form.Control
        type="text"
        name="grade"
        value={editedStudents[studentId]?.grade || ''}
        disabled
      />
    </Form.Group>
    <Form.Group controlId="formSubject">
  <Form.Label>Subject</Form.Label>
  <Form.Control
    as="select"
    name="subject"
    value={editedStudents[studentId]?.subject || ''}
    onChange={(e) => handleInputChange(e, studentId)}
    required // This makes the field required
  >
    <option value="">Select Subject</option>
    {subjects.map((subject) => (
      <option key={subject} value={subject}>
        {subject}
      </option>
    ))}
  </Form.Control>
</Form.Group>

<Form.Group controlId="formResult">
  <Form.Label>Result</Form.Label>
  <Form.Control
    type="number"
    name="result"
    value={editedStudents[studentId]?.result || ''}
    onChange={(e) => handleInputChange(e, studentId)}
    required // This makes the field required
  />
</Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(studentId)}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(studentId)}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          ))}
        </Card.Body>
      </Card>
    </div>
    </div>
    </div>
    </div>
  );
};

export default PostResults;





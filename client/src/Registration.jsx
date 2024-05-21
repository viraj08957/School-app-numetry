/* eslint-disable no-unused-vars */
// Registration.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TeacherRegistration from "./TeacherRegistration";
import StudentRegistration from "./StudentRegistration";
import ParentRegistration from "./ParentRegistration";

const Registration = () => {
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    country: "",
    city: "",
    address: "",
    grade: "",
    parentsName: "",
    educationalBackground: "",
    teachingExperience: "",
    childInfo: [{ childName: "", childGrade: "" }],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5" style={{ marginBottom: "150px" }}>
      <h1 className="text-center">Registration</h1>
      <Link
        to="/"
        className="btn"
        style={{
          position: "absolute",
          top: "20px",
          right: "250px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Back to Home
      </Link>
      <div className="row justify-content-center" style={{ marginTop: "50px" }}>
        <div className="col-md-6">
          <div className="card shadow p-4">
            {/* <form onSubmit={handleSubmit}> */}
            <div className="mb-3">
              <label
                className="form-label"
                style={{ fontFamily: "Caveat, cursive", fontSize: "28px" }}
              >
                Register as a:
              </label>

              <div className="row">
                <div className="col">
                  <div className="form-check d-flex align-items-center">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="userType"
                      value="teacher"
                      onChange={handleChange}
                      checked={formData.userType === "teacher"}
                    />
                    <label
                      className="form-check-label ms-2"
                      style={{
                        fontFamily: "Caveat, cursive",
                        fontSize: "24px",
                        color: "grey",
                      }}
                    >
                      Admin
                    </label>
                  </div>
                </div>

                <div className="col">
                  <div className="form-check d-flex align-items-center">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="userType"
                      value="teacher"
                      onChange={handleChange}
                      checked={formData.userType === "teacher"}
                    />
                    <label
                      className="form-check-label ms-2"
                      style={{
                        fontFamily: "Caveat, cursive",
                        fontSize: "24px",
                        color: "grey",
                      }}
                    >
                      Teacher
                    </label>
                  </div>
                </div>

                <div className="col">
                  <div className="form-check d-flex align-items-center">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="userType"
                      value="student"
                      onChange={handleChange}
                      checked={formData.userType === "student"}
                    />
                    <label
                      className="form-check-label ms-2"
                      style={{
                        fontFamily: "Caveat, cursive",
                        fontSize: "24px",
                        color: "grey",
                      }}
                    >
                      Student
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-check d-flex align-items-center">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="userType"
                      value="parent"
                      onChange={handleChange}
                      checked={formData.userType === "parent"}
                    />
                    <label
                      className="form-check-label ms-2"
                      style={{
                        fontFamily: "Caveat, cursive",
                        fontSize: "24px",
                        color: "grey",
                      }}
                    >
                      Parent
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* </form> */}

            {/* <form> */}
            {/* Existing form code... */}
            {formData.userType === "teacher" && <TeacherRegistration />}
            {formData.userType === "student" && <StudentRegistration />}
            {formData.userType === "parent" && <ParentRegistration />}
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

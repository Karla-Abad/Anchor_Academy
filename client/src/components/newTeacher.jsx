import { useState } from "react";
import axios from "axios";

const NewTeacher = ({ onOpenNewForm }) => {
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    section: "",
    salary: 0,
  });
  const [confirmTeacher, setConfirmTeacher] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    let tempNewTeacher = { ...newTeacher };
    tempNewTeacher[e.target.name] = e.target.value;
    setNewTeacher(tempNewTeacher);
  };

  const handleCreateTeacher = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/teachers", newTeacher, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setConfirmTeacher("You have created a new teacher.");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="register__container">
      <form className="register__form" onSubmit={handleCreateTeacher}>
        <div className="register__flex">
          <h1 className="register__title">New Teacher</h1>
          <p className="register__close" onClick={onOpenNewForm}>
            X
          </p>
        </div>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={newTeacher.firstName}
          onChange={(e) => handleInputChange(e)}
        />
        {/* {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )} */}
        <input
          type="text"
          placeholder="Middle Name"
          name="middleName"
          value={newTeacher.middleName}
          onChange={(e) => handleInputChange(e)}
        />
        {/* {errors.middleName && (
          <p className="error">{errors.middleName.message}</p>
        )} */}
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={newTeacher.lastName}
          onChange={(e) => handleInputChange(e)}
        />
        {/* {errors.lastName && <p className="error">{errors.lastName.message}</p>} */}
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          name="dateOfBirth"
          value={newTeacher.dateOfBirth}
          onChange={(e) => handleInputChange(e)}
        />
        {/* {errors.dateOfBirth && (
          <p className="error">{errors.dateOfBirth.message}</p>
        )} */}
        <select
          name="section"
          value={newTeacher.section}
          onChange={(e) => handleInputChange(e)}
        >
          <option>Select a section</option>
          <option>Early Education</option>
          <option>Elementary</option>
          <option>Middle School</option>
          <option>High School</option>
        </select>
        {/* {errors.section && <p className="error">{errors.section.message}</p>} */}
        <input
          type="number"
          placeholder="Salary"
          name="salary"
          value={newTeacher.salary}
          onChange={(e) => handleInputChange(e)}
        />
        {/* {errors.salary && <p className="error">{errors.salary.message}</p>} */}
        {confirmTeacher && <p className="success">{confirmTeacher}</p>}
        <button className="btn btn--stretched btn--green">New Teacher</button>
      </form>
    </div>
  );
};

export default NewTeacher;

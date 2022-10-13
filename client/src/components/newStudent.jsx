import axios from "axios";
import { useState } from "react";
import { options } from "../utils/grades";

const NewStudent = ({ onOpenNewForm }) => {
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    grade: "",
    accountStanding: "",
    mothersName: "",
    fathersName: "",
    legalGuardiansName: "",
  });

  const [confirmStudent, setConfirmStudent] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    let tempNewStudent = { ...newStudent };
    tempNewStudent[e.target.name] = e.target.value;
    setNewStudent(tempNewStudent);
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/students", newStudent, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setErrors({});
        setConfirmStudent("You have created a new student.");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };

  return (
    <div className="register__container">
      <form className="register__form" onSubmit={handleCreateStudent}>
        <div className="register__flex">
          <h1 className="register__title">New Student</h1>
          <p className="register__close" onClick={onOpenNewForm}>
            X
          </p>
        </div>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={newStudent.firstName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
        <input
          type="text"
          placeholder="Middle Name"
          name="middleName"
          value={newStudent.middleName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.middleName && (
          <p className="error">{errors.middleName.message}</p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={newStudent.lastName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          name="dateOfBirth"
          value={newStudent.dateOfBirth}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.dateOfBirth && (
          <p className="error">{errors.dateOfBirth.message}</p>
        )}
        <select
          name="grade"
          value={newStudent.grade}
          onChange={(e) => handleInputChange(e)}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {errors.grade && <p className="error">{errors.grade.message}</p>}
        <select
          name="accountStanding"
          value={newStudent.accountStanding}
          onChange={(e) => handleInputChange(e)}
        >
          <option>Select options</option>
          <option>Current</option>
          <option>Late</option>
        </select>
        {errors.accountStanding && (
          <p className="error">{errors.accountStanding.message}</p>
        )}
        <input
          type="text"
          placeholder="Mother's Name"
          name="mothersName"
          value={newStudent.mothersName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.mothersName && (
          <p className="error">{errors.mothersName.message}</p>
        )}
        <input
          type="text"
          placeholder="Father's Name"
          name="fathersName"
          value={newStudent.fathersName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.fathersName && (
          <p className="error">{errors.fathersName.message}</p>
        )}
        <input
          type="text"
          placeholder="Legal Guardian's Name"
          name="legalGuardiansName"
          value={newStudent.legalGuardiansName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.legalGuardiansName && (
          <p className="error">{errors.legalGuardiansName.message}</p>
        )}
        {confirmStudent && <p className="success">{confirmStudent}</p>}
        <button className="btn btn--stretched btn--green">New Student</button>
      </form>
    </div>
  );
};

export default NewStudent;

import { useEffect, useState } from "react";
import { options } from "../utils/grades";
import axios from "axios";

const UpdateStudent = ({ onOpenUpdateForm, studentToUpdate }) => {
  const [errors, setErrors] = useState({});
  const [student, setStudent] = useState(studentToUpdate);
  const [confirmUpdate, setConfirmUpdate] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}api/student/${studentToUpdate._id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    let tempStudent = { ...student };
    tempStudent[e.target.name] = e.target.value;
    setStudent(tempStudent);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}api/student/${student._id}`, {
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth,
        grade: student.grade,
        accountStanding: student.accountStanding,
        mothersName: student.mothersName,
        fathersName: student.fathersName,
        legalGuardiansName: student.legalGuardiansName,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setConfirmUpdate("You have successfully updated this record.");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };

  return (
    <div className="register__container">
      <form onSubmit={handleUpdate} className="register__form">
        <div className="register__flex">
          <h1 className="register__title">Update Student</h1>
          <p className="register__close" onClick={onOpenUpdateForm}>
            X
          </p>
        </div>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={student.firstName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
        <input
          type="text"
          placeholder="Middle Name"
          name="middleName"
          value={student.middleName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.middleName && (
          <p className="error">{errors.middleName.message}</p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={student.lastName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          name="dateOfBirth"
          value={student.dateOfBirth.substr(0, 10)}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.dateOfBirth && (
          <p className="error">{errors.dateOfBirth.message}</p>
        )}
        <select
          name="grade"
          value={student.grade}
          onChange={(e) => handleInputChange(e)}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {errors.grade && <p className="error">{errors.grade.message}</p>}
        <select
          name="accountStanding"
          value={student.accountStanding}
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
          value={student.mothersName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.mothersName && (
          <p className="error">{errors.mothersName.message}</p>
        )}
        <input
          type="text"
          placeholder="Father's Name"
          name="fathersName"
          value={student.fathersName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.fathersName && (
          <p className="error">{errors.fathersName.message}</p>
        )}
        <input
          type="text"
          placeholder="Legal Guardian's Name"
          name="legalGuardiansName"
          value={student.legalGuardiansName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.legalGuardiansName && (
          <p className="error">{errors.legalGuardiansName.message}</p>
        )}
        {confirmUpdate && <p className="success">{confirmUpdate}</p>}
        <p className="footer">Created By: {studentToUpdate.createdBy.email}</p>
        <button className="btn btn--stretched btn--green">Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;

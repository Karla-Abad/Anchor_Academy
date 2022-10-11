import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateTeacher = ({
  onOpenUpdateForm,
  teachers,
  teacherToUpdate,
  setTeacherToUpdate,
}) => {
  const [errors, setErrors] = useState({});
  const [teacher, setTeacher] = useState(teacherToUpdate);
  const [confirmUpdate, setConfirmUpdate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/teacher/${teacherToUpdate._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setTeacher(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    let tempTeacher = { ...teacher };
    tempTeacher[e.target.name] = e.target.value;
    setTeacher(tempTeacher);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/teacher/${teacher._id}`, {
        firstName: teacher.firstName,
        middleName: teacher.middleName,
        lastName: teacher.lastName,
        dateOfBirth: teacher.dateOfBirth,
        section: teacher.section,
        salary: teacher.salary,
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
          <h1 className="register__title">Update Teacher</h1>
          <p className="register__close" onClick={onOpenUpdateForm}>
            X
          </p>
        </div>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={teacher.firstName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
        <input
          type="text"
          placeholder="Middle Name"
          name="middleName"
          value={teacher.middleName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.middleName && (
          <p className="error">{errors.middleName.message}</p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={teacher.lastName}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        <input
          type="text"
          placeholder="Date of Birth"
          name="dateOfBirth"
          value={teacher.dateOfBirth}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.dateOfBirth && (
          <p className="error">{errors.dateOfBirth.message}</p>
        )}
        <select
          name="section"
          value={teacher.section}
          onChange={(e) => handleInputChange(e)}
        >
          <option>Early Education</option>
          <option>Elementary</option>
          <option>Middle School</option>
          <option>High School</option>
        </select>
        {errors.section && <p className="error">{errors.section.message}</p>}
        <input
          type="number"
          placeholder="Salary"
          name="salary"
          value={teacher.salary}
          onChange={(e) => handleInputChange(e)}
        />
        {errors.salary && <p className="error">{errors.salary.message}</p>}
        {confirmUpdate && <p className="success">{confirmUpdate}</p>}
        <button className="btn btn--stretched btn--green">Update</button>
        <p className="footer">Created By: {teacherToUpdate.createdBy.email}</p>
      </form>
    </div>
  );
};

export default UpdateTeacher;

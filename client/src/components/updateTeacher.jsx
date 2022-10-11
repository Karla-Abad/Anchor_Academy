import { useEffect } from "react";
import axios from "axios";

const UpdateTeacher = ({
  onOpenUpdateForm,
  teachers,
  teacherToUpdate,
  setTeacherToUpdate,
}) => {
  console.log(teacherToUpdate);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/teacher/${teacherToUpdate._id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="register__container">
      <form className="register__form">
        <div className="register__flex">
          <h1 className="register__title">
            Update {teacherToUpdate.firstName}!
          </h1>
          <p className="register__close" onClick={onOpenUpdateForm}>
            X
          </p>
        </div>
        <input
          type="text"
          placeholder="First Name"
          value={teacherToUpdate.firstName}
          onChange={(e) => setTeacherToUpdate.firstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Middle Name"
          value={teacherToUpdate.middleName}
          onChange={(e) => setTeacherToUpdate.middleName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={teacherToUpdate.lastName}
          onChange={(e) => setTeacherToUpdate.lastName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Date of Birth"
          value={teacherToUpdate.dateOfBirth}
          onChange={(e) => setTeacherToUpdate.dateOfBirth(e.target.value)}
        />
        {/* This should be multiple options */}
        <input
          type="text"
          placeholder="Section"
          value={teacherToUpdate.section}
          onChange={(e) => setTeacherToUpdate.section(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salary"
          value={teacherToUpdate.salary}
          onChange={(e) => setTeacherToUpdate.salary(e.target.value)}
        />

        <button className="btn btn--stretched btn--green">Update</button>
      </form>
    </div>
  );
};

export default UpdateTeacher;

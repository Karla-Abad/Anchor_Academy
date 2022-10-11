const NewTeacher = ({ onOpenNewForm }) => {
  return (
    <div className="register__container">
      <form className="register__form">
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
          //   value={teacher.firstName}
          //   onChange={(e) => handleInputChange(e)}
        />
        {/* {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )} */}
        <input
          type="text"
          placeholder="Middle Name"
          name="middleName"
          //   value={teacher.middleName}
          //   onChange={(e) => handleInputChange(e)}
        />
        {/* {errors.middleName && (
          <p className="error">{errors.middleName.message}</p>
        )} */}
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          //   value={teacher.lastName}
          //   onChange={(e) => handleInputChange(e)}
        />
        {/* {errors.lastName && <p className="error">{errors.lastName.message}</p>} */}
        <input type="text" placeholder="YYYY-MM-DD" name="dateOfBirth" />
        {/* {errors.dateOfBirth && (
          <p className="error">{errors.dateOfBirth.message}</p>
        )} */}
        <select name="section">
          <option>Select a section</option>
          <option>Early Education</option>
          <option>Elementary</option>
          <option>Middle School</option>
          <option>High School</option>
        </select>
        {/* {errors.section && <p className="error">{errors.section.message}</p>} */}
        <input type="number" placeholder="Salary" name="salary" />
        {/* {errors.salary && <p className="error">{errors.salary.message}</p>} */}

        <button className="btn btn--stretched btn--green">New Teacher</button>
      </form>
    </div>
  );
};

export default NewTeacher;

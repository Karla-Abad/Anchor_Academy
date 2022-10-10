import { useEffect, useState } from "react";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/teachers")
      .then((res) => {
        console.log(res.data.allTeachers);
        setTeachers(res.data.allTeachers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <button className="btn btn--green">New Teacher</button>
      <table>
        <thead>
          <tr>
            <th>First</th>
            <th>Middle</th>
            <th>Last</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.firstName}</td>
              <td>{teacher.middleName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.section}</td>
              <td>
                <button className="btn btn--blue btn--table">Update</button>
                <button className="btn btn--red btn--table">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Teachers;

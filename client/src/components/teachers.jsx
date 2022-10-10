import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const count = teachers.length;

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (count === 0)
    return <p className="error">There are no Teachers in the Database.</p>;

  const paginatedTeachers = paginate(teachers, currentPage, pageSize);

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
          {paginatedTeachers.map((teacher) => (
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
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </section>
  );
};

export default Teachers;

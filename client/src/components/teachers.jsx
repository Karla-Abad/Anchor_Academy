import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [selectedSection, setSelectedSection] = useState("");
  const sections = [
    "All Sections",
    "Early Education",
    "Elementary",
    "Middle School",
    "High School",
  ];
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

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setCurrentPage(1);
  };

  const filtered =
    selectedSection && selectedSection !== "All Sections"
      ? teachers.filter((t) => t.section === selectedSection)
      : teachers;

  const paginatedTeachers = paginate(filtered, currentPage, pageSize);

  return (
    <section>
      <div>
        <button className="btn btn--green">New Teacher</button>
        <ListGroup
          items={sections}
          onItemSelect={handleSectionSelect}
          selectedItem={selectedSection}
        />
      </div>
      <div>
        <p>Showing {filtered.length} teacher(s) in the database.</p>
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
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default Teachers;

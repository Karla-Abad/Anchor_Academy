import { useEffect, useState } from "react";
import { paginate } from "../utils/paginate";
import axios from "axios";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
// import TeachersTable from "./teachersTable";
import UpdateTeacher from "./updateTeacher";
import NewTeacher from "./newTeacher";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherToUpdate, setTeacherToUpdate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [selectedSection, setSelectedSection] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const sections = [
    "All Sections",
    "Early Education",
    "Elementary",
    "Middle School",
    "High School",
  ];

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
  }, [updateForm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setCurrentPage(1);
  };

  const handleDelete = (teacher) => {
    const originalTeachers = teachers;

    axios
      .delete(`http://localhost:8000/api/teacher/${teacher._id}`)
      .then((res) => {
        const allTeachers = originalTeachers.filter(
          (t) => t._id !== teacher._id
        );
        setTeachers(allTeachers);
        console.log(teachers);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenUpdateForm = (teacher) => {
    setTeacherToUpdate(teacher);
    setUpdateForm(!updateForm);
  };

  const handleOpenNewForm = () => {
    setNewForm(!newForm);
  };
  console.log(newForm);

  const filtered =
    selectedSection && selectedSection !== "All Sections"
      ? teachers.filter((t) => t.section === selectedSection)
      : teachers;

  const paginatedTeachers = paginate(filtered, currentPage, pageSize);

  if (!updateForm && !newForm) {
    return (
      <section>
        <div>
          <button className="btn btn--green" onClick={handleOpenNewForm}>
            New Teacher
          </button>
          <ListGroup
            items={sections}
            onItemSelect={handleSectionSelect}
            selectedItem={selectedSection}
          />
        </div>
        <div>
          <p className="message">
            Showing <span>{filtered.length}</span> teacher(s) in the database.
          </p>
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
                    <button
                      className="btn btn--blue btn--table"
                      onClick={() => handleOpenUpdateForm(teacher)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn--red btn--table"
                      onClick={() => handleDelete(teacher)}
                    >
                      Delete
                    </button>
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
  }

  if (updateForm) {
    return (
      <section>
        <UpdateTeacher
          onOpenUpdateForm={handleOpenUpdateForm}
          teacherToUpdate={teacherToUpdate}
        />
        <div>
          <button className="btn btn--green" onClick={handleOpenNewForm}>
            New Teacher
          </button>
          <ListGroup
            items={sections}
            onItemSelect={handleSectionSelect}
            selectedItem={selectedSection}
          />
        </div>
        <div>
          <p className="success message">
            Showing {filtered.length} teacher(s) in the database.
          </p>
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
                    <button
                      className="btn btn--blue btn--table"
                      onClick={() => handleOpenUpdateForm(teacher)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn--red btn--table"
                      onClick={() => handleDelete(teacher)}
                    >
                      Delete
                    </button>
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
  }
  if (newForm) {
    return (
      <section>
        <NewTeacher onOpenNewForm={handleOpenNewForm} />
        <div>
          <button className="btn btn--green" onClick={handleOpenNewForm}>
            New Teacher
          </button>
          <ListGroup
            items={sections}
            onItemSelect={handleSectionSelect}
            selectedItem={selectedSection}
          />
        </div>
        <div>
          <p className="success message">
            Showing {filtered.length} teacher(s) in the database.
          </p>
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
                    <button
                      className="btn btn--blue btn--table"
                      onClick={() => handleOpenUpdateForm(teacher)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn--red btn--table"
                      onClick={() => handleDelete(teacher)}
                    >
                      Delete
                    </button>
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
  }
};

export default Teachers;

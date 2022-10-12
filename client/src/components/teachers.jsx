import { useEffect, useState } from "react";
import { paginate } from "../utils/paginate";
import axios from "axios";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import UpdateTeacher from "./updateTeacher";
import NewTeacher from "./newTeacher";
import TeachersTable from "./teachersTable";
import _ from "lodash";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherToUpdate, setTeacherToUpdate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedSection, setSelectedSection] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    path: "firstName",
    order: "asc",
  });

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
  }, [updateForm, newForm]);

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

  const handleSort = (column) => {
    setSortColumn({ path: column.path, order: column.order });
  };

  const filtered =
    selectedSection && selectedSection !== "All Sections"
      ? teachers.filter((t) => t.section === selectedSection)
      : teachers;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedTeachers = paginate(sorted, currentPage, pageSize);

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
          <TeachersTable
            teachers={paginatedTeachers}
            sortColumn={sortColumn}
            onOpenUpdateForm={handleOpenUpdateForm}
            onDelete={handleDelete}
            onSort={handleSort}
          />
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
          <TeachersTable
            teachers={paginatedTeachers}
            sortColumn={sortColumn}
            onOpenUpdateForm={handleOpenUpdateForm}
            onDelete={handleDelete}
          />
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
          <TeachersTable
            teachers={paginatedTeachers}
            sortColumn={sortColumn}
            onOpenUpdateForm={handleOpenUpdateForm}
            onDelete={handleDelete}
          />
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

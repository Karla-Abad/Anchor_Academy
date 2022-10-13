import { useEffect, useState } from "react";
import { paginate } from "../utils/paginate";
import axios from "axios";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import UpdateTeacher from "./updateTeacher";
import NewTeacher from "./newTeacher";
import TeachersTable from "./teachersTable";
import SearchBox from "./common/searchBox";
import { sections } from "../utils/sections";
import _ from "lodash";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherToUpdate, setTeacherToUpdate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedSection, setSelectedSection] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "firstName",
    order: "asc",
  });

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
    setSearchQuery("");
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

  const handleSearch = (query) => {
    setCurrentPage(1);
    setSelectedSection("");
    setSearchQuery(query);
  };

  let filtered = teachers;
  if (searchQuery)
    filtered = teachers.filter((t) =>
      t.lastName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else if (selectedSection && selectedSection !== "All Sections")
    filtered = teachers.filter((t) => t.section === selectedSection);

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedTeachers = paginate(sorted, currentPage, pageSize);

  return (
    <section>
      {updateForm && (
        <UpdateTeacher
          onOpenUpdateForm={handleOpenUpdateForm}
          teacherToUpdate={teacherToUpdate}
        />
      )}
      {newForm && <NewTeacher onOpenNewForm={handleOpenNewForm} />}
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
        <SearchBox value={searchQuery} onChange={handleSearch} />
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
};

export default Teachers;

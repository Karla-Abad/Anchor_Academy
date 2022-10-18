import { useEffect, useState } from "react";
import { paginate } from "../utils/paginate";
import axios from "axios";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import UpdateStudent from "./updateStudent";
import NewStudent from "./newStudent";
import StudentsTable from "./studentsTable";
import SearchBox from "./common/searchBox";
import { grades } from "../utils/grades";
import _ from "lodash";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [studentToUpdate, setStudentToUpdate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "firstName",
    order: "asc",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/students`)
      .then((res) => {
        console.log(res.data.allStudents);
        setStudents(res.data.allStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateForm, newForm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleDelete = (student) => {
    const originalStudents = students;

    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}api/student/${student._id}`)
      .then((res) => {
        const allStudents = originalStudents.filter(
          (s) => s._id !== student._id
        );
        setStudents(allStudents);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenUpdateForm = (student) => {
    setStudentToUpdate(student);
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
    setSelectedGrade("");
    setSearchQuery(query);
  };

  let filtered = students;
  if (searchQuery)
    filtered = students.filter((t) =>
      t.lastName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else if (selectedGrade && selectedGrade !== "All Grades")
    filtered = students.filter((s) => s.grade === selectedGrade);

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedStudents = paginate(sorted, currentPage, pageSize);

  return (
    <section>
      {updateForm && (
        <UpdateStudent
          onOpenUpdateForm={handleOpenUpdateForm}
          studentToUpdate={studentToUpdate}
        />
      )}
      {newForm && <NewStudent onOpenNewForm={handleOpenNewForm} />}
      <div>
        <button className="btn btn--green" onClick={handleOpenNewForm}>
          New Student
        </button>
        <ListGroup
          items={grades}
          onItemSelect={handleGradeSelect}
          selectedItem={selectedGrade}
        />
      </div>
      <div>
        <p className="message">
          Showing <span>{filtered.length}</span> student(s) in the database.
        </p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <StudentsTable
          students={paginatedStudents}
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

export default Students;

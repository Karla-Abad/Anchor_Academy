const TeachersTable = ({ teachers, onOpenUpdateForm, onDelete, onSort }) => {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("firstName")}>First</th>
          <th onClick={() => onSort("middleName")}>Middle</th>
          <th onClick={() => onSort("lastName")}>Last</th>
          <th onClick={() => onSort("section")}>Section</th>
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
              <button
                className="btn btn--blue btn--table"
                onClick={() => onOpenUpdateForm(teacher)}
              >
                Update
              </button>
              <button
                className="btn btn--red btn--table"
                onClick={() => onDelete(teacher)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeachersTable;

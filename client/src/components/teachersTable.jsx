const TeachersTable = ({ paginatedTeachers }) => {
  return (
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
  );
};

export default TeachersTable;

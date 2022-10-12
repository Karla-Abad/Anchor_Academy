import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
class TeachersTable extends Component {
  columns = [
    { path: "firstName", label: "First" },
    { path: "middleName", label: "Middle" },
    { path: "lastName", label: "Last" },
    { path: "section", label: "Section" },
    { key: "actions", label: "Actions" },
  ];
  render() {
    const { teachers, onDelete, onOpenUpdateForm, onSort, sortColumn } =
      this.props;

    return (
      <table>
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={teachers} columns={this.columns} />
        {/* <tbody>
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
        </tbody> */}
      </table>
    );
  }
}

export default TeachersTable;

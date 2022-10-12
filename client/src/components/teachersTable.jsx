import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
class TeachersTable extends Component {
  columns = [
    { path: "firstName", label: "First" },
    { path: "middleName", label: "Middle" },
    { path: "lastName", label: "Last" },
    { path: "section", label: "Section" },
    {
      key: "update",
      label: "Actions",
      content: (teacher) => (
        <button
          className="btn btn--blue btn--table"
          onClick={() => this.props.onOpenUpdateForm(teacher)}
        >
          Update
        </button>
      ),
    },
    {
      key: "delete",
      content: (teacher) => (
        <button
          className="btn btn--red btn--table"
          onClick={() => this.props.onDelete(teacher)}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { teachers, onSort, sortColumn } = this.props;

    return (
      <table>
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={teachers} columns={this.columns} />
      </table>
    );
  }
}

export default TeachersTable;

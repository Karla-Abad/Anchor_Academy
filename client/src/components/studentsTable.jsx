import React, { Component } from "react";
import Table from "./common/table";

class StudentsTable extends Component {
  columns = [
    { path: "firstName", label: "First" },
    { path: "middleName", label: "Middle" },
    { path: "lastName", label: "Last" },
    { path: "grade", label: "Grade" },
    { path: "accountStanding", label: "Account" },
    {
      key: "update",
      label: "Actions",
      content: (student) => (
        <button
          className="btn btn--blue btn--table"
          onClick={() => this.props.onOpenUpdateForm(student)}
        >
          Update
        </button>
      ),
    },
    {
      key: "delete",
      content: (student) => (
        <button
          className="btn btn--red btn--table"
          onClick={() => this.props.onDelete(student)}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { students, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={students}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default StudentsTable;

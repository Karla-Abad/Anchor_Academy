import React, { Component } from "react";
import Table from "./common/table";

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
      <Table
        columns={this.columns}
        data={teachers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default TeachersTable;

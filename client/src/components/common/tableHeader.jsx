import React, { Component } from "react";
import { ReactComponent as SortUp } from "../../images/sortUp.svg";
import { ReactComponent as SortDown } from "../../images/sortDown.svg";

class TableHeader extends Component {
  raiseSort = (path) => {
    const column = { ...this.props.sortColumn };
    if (column.path === path) {
      column.order = column.order === "asc" ? "desc" : "asc";
    } else {
      column.path = path;
      column.order = "asc";
    }
    this.props.onSort(column);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path || column.key) return null;
    if (sortColumn.order === "asc") return <SortUp />;
    return <SortDown />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

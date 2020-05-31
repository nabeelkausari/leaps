import React, { Component } from "react";

class TableSkeleton extends Component {
  rows = [];

  renderRows = () => {
    this.rows = [];
    for (let i = 0; i < 25; i++) {
      this.rows.push(
        <li className="table-skeleton__row" key={i}>
          <span className="table-skeleton__cell">
            <span className="table-skeleton__line"></span>
          </span>
          <span className="table-skeleton__cell">
            <span className="table-skeleton__line"></span>
          </span>
          <span className="table-skeleton__cell">
            <span className="table-skeleton__line"></span>
          </span>
          <span className="table-skeleton__cell">
            <span className="table-skeleton__line"></span>
          </span>
          {!this.props.is_steps_open && (
            <span className="table-skeleton__cell">
              <span className="table-skeleton__line"></span>
            </span>
          )}
        </li>
      );
    }

    return this.rows;
  };

  render() {
    const { is_steps_open } = this.props;
    return (
      <div className="table-skeleton">
        <ul className="table-skeleton__header">
          <li className="table-skeleton__header-row">
            <span className="table-skeleton__cell table-skeleton__cell--header">
              <span className="table-skeleton__line"></span>
            </span>
            <span className="table-skeleton__cell table-skeleton__cell--header">
              <span className="table-skeleton__line"></span>
            </span>
            <span className="table-skeleton__cell table-skeleton__cell--header">
              <span className="table-skeleton__line"></span>
            </span>
            <span className="table-skeleton__cell table-skeleton__cell--header">
              <span className="table-skeleton__line"></span>
            </span>

            {!is_steps_open && (
              <span className="table-skeleton__cell table-skeleton__cell--header">
                <span className="table-skeleton__line"></span>
              </span>
            )}
          </li>
        </ul>

        <ul className="table-skeleton__rows-container">{this.renderRows()}</ul>
      </div>
    );
  }
}

export default TableSkeleton;

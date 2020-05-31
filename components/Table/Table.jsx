import React, { Component } from "react";
import Tooltip from "../Tooltip/Tooltip";
class Table extends Component {
  render() {
    const { headers, rows } = this.props;
    // const {rows} = this.state

    return (
      <div className="table-wrapper">
        <table className="table">
          <tr className="table__header-row">
            {headers.map(header => (
              <Tooltip placement="bottom" text={header}>
                <th className="table__header-cell">{header}</th>
              </Tooltip>
            ))}
          </tr>

          {rows.map(row => {
            return (
              <tr className="table__row">
                {row.map(cell => (
                  <td className="table__cell">{cell}</td>
                ))}
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default Table;

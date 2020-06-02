import React, { Component } from "react";
import Table from "../../../../../../components/Table/Table";
import { warning_triangle_icon } from "../../../../../../../common/images";

class AutoRenameDetails extends Component {
  render() {
    const {
      modifiedColumnData: { data }
    } = this.props;
    const header_list = ["Old Column", "New Column", "Description"];
    const row_list = data.map(d => [
      d.oldColumnName,
      d.newColumnName,
      d.description
    ]);
    return (
      <div className="auto-rename">
        <h3 className="auto-rename__tilte">
          The Following are the auto generated name with respect to the upload
          instructions
        </h3>
        <Table headers={header_list} rows={row_list} />
        <div className="auto-rename__warning">
          <img
            src={warning_triangle_icon}
            className="auto-rename__warning--icon"
            alt=""
          />
          <h4 className="auto-rename__warning--message">
            Note: Auto Rename feature works only when the dataset column names
            fail to satisfy all the instructions{" "}
          </h4>
        </div>
      </div>
    );
  }
}

export default AutoRenameDetails;

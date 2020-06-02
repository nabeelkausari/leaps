import React, { Component } from "react";
import { StepDatasetContainer } from "../containers/stepDataset";
import { Table } from "react-bootstrap";
import isEqual from "lodash/isEqual";

class StepDataset extends Component {
  state = {
    tables: []
  };
  componentDidMount() {
    if (this.props.output_csv_results[this.props.csv] !== undefined) {
      return this.setState({
        tables: this.props.output_csv_results[this.props.csv]
      });
    }
    this.props.fetchStepDetailsCsv(this.props.csv);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(this.props.output_csv_results, prevProps.output_csv_results)) {
      this.setState({ tables: this.props.output_csv_results[this.props.csv] });
    }
  }

  render() {
    const { tables } = this.state;
    return (
      <div>
        {tables !== undefined &&
          tables.map((table, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              {table.name && <h5>{table.name}</h5>}
              <Table
                striped
                bordered
                variant={"dark"}
                style={{ position: "relative", zIndex: 1 }}
              >
                <thead>
                  <tr>
                    {table.headers.map((head, i) => (
                      <th key={i}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, ci) => (
                        <td key={ci}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
      </div>
    );
  }
}

export default StepDatasetContainer(StepDataset);

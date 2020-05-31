import React, { Component } from "react";
import get from "lodash/get";
import Material from "../../../material/components/CaseMaterial";
import Table from "../../../../components/Table/Table";
import Papa from "papaparse";
import { downloadFileFromServer } from "../../../../../common/utils/downloadFile";

class Home extends Component {
  state = {
    data_dict: {
      headers: [],
      rows: []
    }
  };

  componentDidMount() {
    const { current_hackathon } = this.props;
    if (current_hackathon) {
      this.fetchDataDictionary(
        get(current_hackathon, "solve_details[0].data_dictionar_link")
      );
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fetch_hackathon_list_succeeded, current_hackathon } = this.props;
    if (
      fetch_hackathon_list_succeeded &&
      fetch_hackathon_list_succeeded !==
        prevProps.fetch_hackathon_list_succeeded
    ) {
      this.fetchDataDictionary(
        get(current_hackathon, "solve_details[0].data_dictionar_link")
      );
    }
  }

  fetchDataDictionary = csv_url => {
    Papa.parse(csv_url || "", {
      download: true,
      delimiter: ";",
      complete: results => {
        const [headers, ...rows] = results.data;
        this.setState({
          data_dict: {
            headers,
            rows
          }
        });
      }
    });
  };

  render() {
    const { current_hackathon } = this.props;
    const { data_dict } = this.state;
    const problem_statement_link = get(
      current_hackathon,
      "solve_details[0]._links.get_problem_statement"
    );
    const edit_problem_statement_link = get(
      current_hackathon,
      "solve_details[0]._links.edit_problem_statement"
    );
    const data_dictionary_des_link = get(
      current_hackathon,
      "solve_details[0]._links.get_data_dictionary_description"
    );
    const edit_data_dictionary_des_link = get(
      current_hackathon,
      "solve_details[0]._links.edit_data_dictionary_description"
    );
    const data_dictionary_csv = get(
      current_hackathon,
      "solve_details[0].data_dictionar_link"
    );
    return (
      <div className="hd-child">
        <div className="hd-child-material">
          <h2 className="hd-child-material__title">Problem Statement</h2>
          <Material
            material_link={problem_statement_link}
            update_link={edit_problem_statement_link}
          />
        </div>
        <div className="hd-child-material">
          <h2 className="hd-child-material__title">
            Dataset & Data dictionary
          </h2>
          <Material
            material_link={data_dictionary_des_link}
            update_link={edit_data_dictionary_des_link}
          />
        </div>
        <div className="hd-child__data-dictionary">
          <div className="hd-child__data-dictionary--download">
            Download your copy of data dictionary
            <span
              className="hd-child__data-dictionary--click-here"
              onClick={() =>
                downloadFileFromServer(data_dictionary_csv, "data_dict.csv")
              }
            >
              (Click here)
            </span>
          </div>
          <Table headers={data_dict.headers} rows={data_dict.rows} />
        </div>
      </div>
    );
  }
}

export default Home;

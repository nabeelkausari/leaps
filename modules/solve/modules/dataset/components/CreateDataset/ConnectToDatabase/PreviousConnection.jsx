import React, { Component } from "react";
import Select from "../../../../../../../components/Forms/Select";
import Input from "../../../../../../../components/Forms/Input";

class PreviousConnection extends Component {
  previous_connection_options = [
    { value: "Dev-server", label: "Dev-server" },
    { value: "QA-server", label: "QA-server" },
    { value: "Prod-server", label: "Prod-server" }
  ];

  state = {
    connectionString: "",
    query: ""
  };

  handleQueryChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      this.props.getParams(this.state);
    });
  };

  handleConnectionChange = conn => {
    this.setState({ connectionString: conn.value }, () => {
      this.props.getParams(this.state);
    });
  };

  render() {
    const { host, query } = this.state;
    return (
      <div className="previous-connection">
        <div className="previous-connection__item">
          <Select
            options={this.previous_connection_options}
            onChange={this.handleConnectionChange}
            label="Host"
          />
        </div>
        <div className="previous-connection__item">
          <Input
            type="textarea"
            name="query"
            value={query}
            label="Query"
            onChange={this.handleQueryChange}
            placeholder="select * from user where user_id = 3333;"
          />
        </div>
      </div>
    );
  }
}

export default PreviousConnection;

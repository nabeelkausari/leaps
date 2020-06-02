import React, { Component } from "react";
import Select from "../../../../../../../components/Forms/Select";
import Input from "../../../../../../../components/Forms/Input";

class NewConnectionCustom extends Component {
  state = {
    connectionString: "",
    query: ""
  };

  handleInputChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      this.props.getParams(this.state);
    });
  };
  render() {
    const { connectionString, query } = this.state;
    return (
      <div>
        <div>
          <Input
            type="text"
            value={connectionString}
            name="connectionString"
            label="Connection String"
            onChange={this.handleInputChange}
            placeholder=" mysql+pymysql://root:password@localhost:3306/"
          />
        </div>
        <div>
          <Input
            type="textarea"
            name="query"
            value={query}
            label="Query"
            onChange={this.handleInputChange}
            placeholder="select * from user where user_id = 3333;"
          />
        </div>
      </div>
    );
  }
}

export default NewConnectionCustom;

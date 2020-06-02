import React, { Component } from "react";
import Input from "../../../../../../../components/Forms/Input";

class NewConnection extends Component {
  state = {
    host: "",
    username: "",
    databaseName: "",
    port: "",
    password: "",
    query: ""
  };

  onInputChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      this.props.getParams(this.state);
    });
  };

  render() {
    const { host, username, databaseName, port, password, query } = this.state;
    return (
      <div className="new-connection">
        <div className="new-connection__left">
          <div>
            <Input
              type="text"
              name="host"
              value={host}
              label="Host"
              placeholder="Enter a host name"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <Input
              type="text"
              name="username"
              value={username}
              label="User Name"
              placeholder="Enter User Name"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <Input
              type="text"
              name="password"
              value={password}
              label="Password"
              placeholder="Enter Password"
              onChange={this.onInputChange}
            />
          </div>
        </div>
        <div className="new-connection__right">
          <div>
            <Input
              type="text"
              name="databaseName"
              value={databaseName}
              label="Database Name"
              placeholder="Enter Database name"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <Input
              type="text"
              name="port"
              value={port}
              label="Port"
              placeholder="Enter Port"
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <Input
              type="text"
              name="query"
              value={query}
              label="Query"
              placeholder="Enter Query"
              onChange={this.onInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default NewConnection;

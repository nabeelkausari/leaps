import React, { Component } from "react";
import { ConnectToExternalDataBase as ExternalDatabase } from "../../containers/createDataset/connectToExternalDatabase";
import { Button } from "../../../../../../components/Buttons/Button";
import ReactSelect from "react-select";

class ConnectToExternalLLP extends Component {
  state = {
    host: "",
    userName: "",
    password: "",
    database: "",
    port: "",
    query: "",
    show_view: false,
    newConnection: false,
    previousConnectionString: ""
  };

  handleClose = () => {
    this.setState({
      show_view: false
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  togglePreviousConnection = () => this.setState({ newConnection: false });
  toggleNewConnection = () => this.setState({ newConnection: true });

  previousConnectionString = opt => {
    this.setState({
      previousConnectionString: opt.value
    });
  };

  render() {
    const {
      host,
      userName,
      password,
      database,
      port,
      query,
      newConnection,
      previousConnectionString
    } = this.state;
    const isProceedBtnDisabled = !newConnection
      ? previousConnectionString === "" || query === ""
      : host === "" ||
        userName === "" ||
        password === "" ||
        database === "" ||
        port === "" ||
        query === "";
    const previousConnectionOptions = [
      { value: "Dev-server", label: "Dev-server" },
      { value: "QA-server", label: "QA-server" },
      { value: "Prod-server", label: "Prod-server" }
    ];
    return (
      <div className="upload-container" style={{ width: "35rem" }}>
        <div>
          <div>
            <div style={{ display: "flex", marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <input
                  type="radio"
                  id="previousConnection"
                  name="radioGroup"
                  checked={!newConnection}
                  onChange={this.togglePreviousConnection}
                  style={{ marginRight: "1.5rem" }}
                />
                <label
                  htmlFor="previousConnection"
                  style={{ marginBottom: "0" }}
                >
                  Previous Connection
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <input
                  type="radio"
                  id="newConnection"
                  name="radioGroup"
                  checked={newConnection}
                  onChange={this.toggleNewConnection}
                  style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
                />
                <label htmlFor="newConnection" style={{ marginBottom: "0" }}>
                  New Connection
                </label>
              </div>
            </div>
          </div>

          {!newConnection && (
            <div className="form-container--lla">
              <div
                style={{
                  marginBottom: "2rem",
                  display: "flex",
                  flexFlow: "column"
                }}
              >
                <label style={{ marginBottom: "1.5rem" }}>Host</label>
                <div style={{ marginBottom: "2rem", width: "40rem" }}>
                  <ReactSelect
                    options={previousConnectionOptions}
                    onChange={this.previousConnectionString}
                    classNamePrefix="ath-select"
                    className="ath-select-container"
                  />
                </div>
                <label style={{ marginBottom: "1.5rem" }}>Query</label>
                <textarea
                  rows={5}
                  name="query"
                  onChange={this.onChange}
                  style={{
                    marginBottom: "2rem",
                    width: "40rem",
                    padding: "1rem"
                  }}
                  className="input-form"
                  placeholder="Query"
                />
              </div>
            </div>
          )}
          {newConnection && (
            <div className="form-container--lla">
              <div
                style={{
                  marginBottom: "2rem",
                  display: "flex",
                  flexFlow: "column"
                }}
              >
                <label style={{ marginBottom: "1.5rem" }}>Host</label>
                <input
                  type="text"
                  name="host"
                  onChange={this.onChange}
                  style={{
                    marginBottom: "2rem",
                    width: "40rem",
                    height: "3.2rem",
                    padding: "1rem"
                  }}
                  className="input-form"
                  placeholder="<Host>"
                />
                <label style={{ marginBottom: "1.5rem" }}>Username</label>
                <input
                  type="text"
                  name="userName"
                  onChange={this.onChange}
                  style={{
                    marginBottom: "2rem",
                    width: "40rem",
                    height: "3.2rem",
                    padding: "1rem"
                  }}
                  className="input-form"
                  placeholder="<UserName>"
                />
                <label style={{ marginBottom: "1.5rem" }}>Password</label>
                <input
                  type="text"
                  name="password"
                  onChange={this.onChange}
                  style={{
                    marginBottom: "2rem",
                    width: "40rem",
                    height: "3.2rem",
                    padding: "1rem"
                  }}
                  className="input-form"
                  placeholder="<Password>"
                />
                <label style={{ marginBottom: "1.5rem" }}>Database</label>
                <input
                  type="text"
                  name="database"
                  onChange={this.onChange}
                  style={{
                    marginBottom: "2rem",
                    width: "40rem",
                    height: "3.2rem",
                    padding: "1rem"
                  }}
                  className="input-form"
                  placeholder="<Database>"
                />
                <label style={{ marginBottom: "1.5rem" }}>Port</label>
                <input
                  type="text"
                  name="port"
                  onChange={this.onChange}
                  style={{
                    marginBottom: "2rem",
                    width: "40rem",
                    height: "3.2rem",
                    padding: "1rem"
                  }}
                  className="input-form"
                  placeholder="<Port>"
                />
                <label style={{ marginBottom: "1.5rem" }}>Query</label>
                <textarea
                  rows={5}
                  name="query"
                  onChange={this.onChange}
                  style={{
                    marginBottom: "2rem",
                    width: "40rem",
                    padding: "1rem"
                  }}
                  className="input-form"
                  placeholder="Query"
                />
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "40rem"
          }}
        >
          <Button
            className="create-btn"
            buttonType="primary"
            disabled={isProceedBtnDisabled}
            onClick={() =>
              this.props.handleConnectToExternalDB(
                host,
                userName,
                password,
                database,
                port,
                query,
                newConnection
              )
            }
          >
            Proceed
          </Button>
        </div>
      </div>
    );
  }
}

export default ExternalDatabase(ConnectToExternalLLP);

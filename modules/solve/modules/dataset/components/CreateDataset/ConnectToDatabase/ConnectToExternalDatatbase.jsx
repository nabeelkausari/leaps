import React, { Component, Fragment } from "react";
import { ConnectToExternalDataBase as ExternalDatabase } from "../../../containers/createDataset/connectToExternalDatabase";
import { Button } from "../../../../../../../components/Buttons/Button";
import {
  db_amazon,
  db_greenplum,
  db_mysql,
  db_oracle,
  db_postgre,
  db_teradata,
  db_vertica,
  db,
  db_google,
  db_mysqlserver,
  db_nettezza,
  db_sap
} from "../../../../../../../../common/images";
import PreviousConnection from "./PreviousConnection";
import NewConnection from "./NewConnection";
import NewConnectionCustom from "./NewConnectionCustom";
import "./ConnectToDatabase.scss";

class ConnectToExternalDatabase extends Component {
  state = {
    connection: "previous_connection",
    params: {},
    db_driver: "",
    query: "",
    show_view: false
  };

  handleSeparatorChange = connection => {
    this.setState({ connection });
  };

  handleShow = db_driver => {
    this.setState({
      show_view: true,
      db_driver
    });
  };

  handleClose = () => {
    this.setState({
      show_view: false
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  getParams = params => {
    this.setState({ params });
  };

  render() {
    const { connection, params, db_driver } = this.state;
    const {
      db_drivers,
      hideCancleButton,
      connect_to_db_requested
    } = this.props;
    return (
      <div className="upload-container">
        <div className="form-container">
          {!this.state.show_view && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_mysql} alt="" />
                  <span>My Sql</span>
                </div>
                <div
                  onClick={() => this.handleShow("mssql+pymssql")}
                  className="databases-list"
                >
                  <img src={db_mysqlserver} alt="" />
                  <span>SQL Server</span>
                </div>
                <div
                  onClick={() => this.handleShow("postgresql+psycopg2")}
                  className="databases-list"
                >
                  <img src={db_postgre} alt="" />
                  <span>POSTGRE</span>
                </div>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_oracle} alt="" />
                  <span>Oracle</span>
                </div>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_vertica} alt="" />
                  <span>Vertica</span>
                </div>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_teradata} alt="" />
                  <span>Teradata</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_greenplum} alt="" />
                  <span>Green Plum</span>
                </div>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_amazon} alt="" />
                  <span>Amazon</span>
                </div>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_google} alt="" />
                  <span>Google</span>
                </div>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_nettezza} alt="" />
                  <span>IBM Netezza</span>
                </div>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db_sap} alt="" />
                  <span>SAP Hana</span>
                </div>
                <div
                  onClick={() => this.handleShow("mysql+pymysql")}
                  className="databases-list"
                >
                  <img src={db} alt="" />
                  <span>Other</span>
                </div>
              </div>
            </div>
          )}

          {!!this.state.show_view && (
            <Fragment>
              <div style={{ display: "flex" }}>
                <div>
                  <input
                    type="radio"
                    id="new conn"
                    checked={connection === "previous_connection"}
                    onChange={() =>
                      this.handleSeparatorChange("previous_connection")
                    }
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                  />
                  <label htmlFor="space">Previous Connection</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="new conn new"
                    checked={connection === "new_connection"}
                    onChange={() =>
                      this.handleSeparatorChange("new_connection")
                    }
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                  />
                  <label htmlFor="space">New Connection</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="new conn new"
                    checked={connection === "new_connection_custom"}
                    onChange={() =>
                      this.handleSeparatorChange("new_connection_custom")
                    }
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                  />
                  <label htmlFor="space">New Connection (Custom)</label>
                </div>
              </div>
              <div style={{ marginTop: "2rem" }}>
                {(() => {
                  switch (connection) {
                    case "previous_connection":
                      return <PreviousConnection getParams={this.getParams} />;
                    case "new_connection":
                      return <NewConnection getParams={this.getParams} />;
                    case "new_connection_custom":
                      return <NewConnectionCustom getParams={this.getParams} />;
                    default:
                      return null;
                  }
                })()}
              </div>
            </Fragment>
          )}
          {!!this.state.show_view && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {hideCancleButton && (
                <Button
                  variant="default"
                  size="md"
                  onClick={this.props.closeCreateDataset}
                  style={{ marginRight: "2rem" }}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant="outline-secondary"
                size="md"
                onClick={this.handleClose}
                style={{ marginRight: "2rem" }}
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                disabled={!!connect_to_db_requested}
                onClick={() =>
                  this.props.connectToExternalDatabase(params, db_driver)
                }
              >
                Proceed
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ExternalDatabase(ConnectToExternalDatabase);

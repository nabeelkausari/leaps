import React, { Component, Fragment } from "react";
import Papa from "papaparse";
import cx from "classnames";
import { CreateDatasetContainer } from "../../containers/createDataset/createDataset";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CreateDataSetModal from "./CreateDataSetModal";
import ConnectToExternalDatabase from "./ConnectToDatabase/ConnectToExternalDatatbase";
import CreatePreloadDatasetModal from "./CreatePreloadDatasetModal";
import "./CreateDataset.scss";
import {
  DatabaseIcon,
  PreDatasetIcon,
  UploadIcon
} from "../../../../../../../common/images";
import Loader from "../../../../../../components/Loader";
import Table from "../../../../../../components/Table/Table";
import TableSkeleton from "../../../../../../components/Skeletons/TableSkeleton";
import { withRouter } from "react-router-dom";

class CreateDataset extends Component {
  state = {
    preview_dataset: false,
    header_list: [],
    row_list: []
  };
  componentDidMount() {
    this.props.fetchPreloadDatasets();
    this.props.getDbDrivers();
    this.props.getFileUploadSettings();
    // if(this.props.fetch_functions_succeeded){
    //     this.props.fetchSqlForm();
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      params: { scenario_id }
    } = this.props.match;
    if (scenario_id && scenario_id !== prevProps.match.params.scenario_id) {
      this.setState({ preview_dataset: false });
    }
  }

  onFileLoad = (file, delimiter, preupload) => {
    this.setState({ data_loading: true });
    Papa.parse(file, {
      download: true,
      delimiter: delimiter,
      complete: results => {
        const [header_list, ...row_list] = results.data;
        // headerRow.unshift(" ");
        this.setState(
          {
            row_list: row_list.slice(0, 199),
            header_list,
            preview_dataset: true
          },
          () => {
            if (preupload) {
              this.setState({
                header_list: ["", ...header_list]
              });
            }
          }
        );

        setTimeout(() => {
          this.setState({
            data_loading: false
          });
        }, 1000);
      },
      error: error => {
        this.setState({
          data_loading: false
        });
      }
    });
  };

  render() {
    const {
      is_dataset_create_loading,
      is_steps_open,
      closeCreateDataset,
      hideCancleButton,
      upload_settings
    } = this.props;
    const { row_list, header_list, preview_dataset, data_loading } = this.state;
    return (
      <div
        className={cx("create-dataset-container", {
          "create-dataset-container--small": is_steps_open
        })}
      >
        {is_dataset_create_loading && (
          <div className="dataset-loader-wrapper">
            <Loader />
          </div>
        )}
        {preview_dataset && (
          <div className="create-dataset-preview">
            {data_loading ? (
              <TableSkeleton />
            ) : (
              <Fragment>
                <div className="create-dataset-preview__blur" />
                <Table headers={header_list} rows={row_list} />
              </Fragment>
            )}
          </div>
        )}
        <div className="create-dataset">
          <div className="title-container">
            <h4>Add New Dataset</h4>
          </div>
          <Tabs defaultActiveKey="upload-dataset" id="uncontrolled-tab-example">
            <Tab
              eventKey="upload-dataset"
              title={
                <span>
                  {" "}
                  <UploadIcon className="icon icon--upload" />{" "}
                  <span> Upload dataset</span>
                </span>
              }
            >
              <CreateDataSetModal
                onFileLoad={this.onFileLoad}
                closeCreateDataset={closeCreateDataset}
                hideCancleButton={hideCancleButton}
                upload_settings={upload_settings}
              />
            </Tab>
            <Tab
              eventKey="connect-to-database"
              title={
                <span>
                  {" "}
                  <DatabaseIcon className="icon icon--database" />{" "}
                  <span>Connect to Database</span>
                </span>
              }
            >
              <ConnectToExternalDatabase
                closeCreateDataset={closeCreateDataset}
                hideCancleButton={hideCancleButton}
              />
            </Tab>
            <Tab
              eventKey="upload-preload-dataset"
              title={
                <span>
                  {" "}
                  <PreDatasetIcon className="icon icon--dataset" />{" "}
                  <span>Upload Preload Dataset</span>
                </span>
              }
            >
              <CreatePreloadDatasetModal
                onFileLoad={this.onFileLoad}
                closeCreateDataset={closeCreateDataset}
                hideCancleButton={hideCancleButton}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default CreateDatasetContainer(withRouter(CreateDataset));

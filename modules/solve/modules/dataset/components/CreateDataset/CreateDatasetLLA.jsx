import React, { Component } from "react";
import { CreateDatasetModalContainer } from "../../containers/createDataset/createDatatSetModal";
import "./CreateDataset.scss";
import { Button } from "../../../../../../../../app/components/Buttons/Button";
import { icon_upload_1 } from "../../../../../../../../common/images/index";
import Loader from "../../../../../../../../app/components/Loader";

class CreateDatasetLLA extends Component {
  fileInput = "";
  state = {
    name: "",
    description: "",
    uploadLink: null,
    separator: ";",
    tenant_id: "",
    files: {
      filename: []
    },
    file: {},
    toggleCsv: true,
    separator_selected: "semicolon"
  };

  componentDidMount() {
    this.props.getUploadLink();
  }

  handleSeparatorChange = separator => {
    this.setState({
      separator: separator
    });
  };

  handleFileChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file
      });
    };
    reader.readAsDataURL(file);
  };

  toggleCsv = () => this.setState({ toggleCsv: true });

  onExcelSelect = () => {
    this.setState({
      separator: " ",
      toggleCsv: false
    });
  };

  render() {
    const { is_dataset_create_loading } = this.props;

    return (
      <div className="upload-container">
        {is_dataset_create_loading && (
          <div className="dataset-loader-wrapper">
            <Loader />
          </div>
        )}
        <form
          className="form-container"
          style={{ width: "40rem", height: "45rem" }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>File Format</div>
            <div style={{ display: "flex" }}>
              <div>
                <input
                  type="radio"
                  id="csv"
                  name="radioGroup"
                  checked={this.state.toggleCsv}
                  onChange={this.toggleCsv}
                  style={{ marginRight: "15px" }}
                />
                <label htmlFor="csv">CSV</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="excel"
                  name="radioGroup"
                  checked={!this.state.toggleCsv}
                  onChange={this.onExcelSelect}
                  value="\0"
                  style={{ marginLeft: "15px", marginRight: "15px" }}
                />
                <label htmlFor="excel">Excel</label>
              </div>
            </div>
          </div>

          {this.state.toggleCsv && (
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>Column Separator</div>
              <div style={{ display: "flex", flexFlow: "row" }}>
                <div>
                  <input
                    type="radio"
                    id="semicolon"
                    checked={this.state.separator === ";"}
                    onChange={() => this.handleSeparatorChange(";")}
                    style={{ marginRight: "15px" }}
                  />
                  <label htmlFor="semicolon">Semicolon</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="comma"
                    checked={this.state.separator === ","}
                    onChange={() => this.handleSeparatorChange(",")}
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                  />
                  <label htmlFor="comma">Comma</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="space"
                    checked={this.state.separator === "\t"}
                    onChange={() => this.handleSeparatorChange("\t")}
                    style={{ marginLeft: "15px", marginRight: "15px" }}
                  />
                  <label htmlFor="space">Tab</label>
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <span className="btn btn-default btn-file">
              <img
                src={icon_upload_1}
                style={{ marginRight: "10px" }}
                alt="upload"
              />
              Choose File
              <input
                type="file"
                accept="text/csv"
                ref={ref => (this.fileInput = ref)}
                onChange={this.handleFileChange}
                style={{ marginBottom: "20px" }}
              />
            </span>
            <span style={{ color: "#ff9f00", marginTop: "5px" }}>
              {!!this.state.file.name && this.state.file.name}
            </span>
          </div>
        </form>
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
            disabled={this.fileInput.value === ""}
            onClick={this.props.handleSubmit}
          >
            Proceed
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateDatasetModalContainer(CreateDatasetLLA);

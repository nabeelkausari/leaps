import React, { Component } from "react";
import { CreateDatasetModalContainer } from "../../containers/createDataset/createDatatSetModal";
import "./CreateDataset.scss";

import { Button } from "../../../../../../components/Buttons/Button";
import { icon_upload_1 } from "../../../../../../../common/images/index";
import Loader from "../../../../../../../app/components/Loader";
import Accordion from "../../../../../../components/Accordion/Accordion";
import { FileUploadIcon } from "../../../../../../../common/images";

class CreateDataSetModal extends Component {
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
    file_type: "csv",
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
      if (this.state.file_type === "csv") {
        this.props.onFileLoad(file, this.state.separator);
      }
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = () => {
    const { separator, file, file_type } = this.state;
    const { solve_id } = this.props;
    let formData = new FormData();
    formData.append("file_type", file_type);
    formData.append("file", file);
    formData.append("separator", separator);
    formData.append("solve_id", solve_id.toString());
    formData.append("user_id", "3820");
    formData.append("tenant_id", "da49652c-ba7d-4531-b610-a50cf856d841");
    this.props.createDatasetModal(formData);
  };

  toggleCsv = () => this.setState({ toggleCsv: true });

  onExcelSelect = () => {
    this.setState({
      separator: " ",
      toggleCsv: false
    });
  };

  onJSONSelect = () => {
    this.setState({});
  };

  onFileTypeSelect = e => {
    this.setState({ file_type: e.currentTarget.id });
  };

  getFileType = () => {
    const { file_type } = this.state;
    switch (file_type) {
      case "csv":
        return "text/csv";
      case "xls":
        return ".xls, .xlsx";
      case "json":
        return "text, .json";
    }
  };

  render() {
    const {
      is_dataset_create_loading,
      upload_dataset_loading,
      hideCancleButton,
      upload_settings
    } = this.props;

    const { file_type } = this.state;

    return (
      <div className="upload-container">
        {is_dataset_create_loading && (
          <div className="dataset-loader-wrapper">
            <Loader />
          </div>
        )}
        <Accordion title="Upload Dataset Instructions">
          <div className="upload-container__instructions">
            {upload_settings.instructions_list &&
              upload_settings.instructions_list.map((item, i) => (
                <div>
                  {i + 1}. {item}
                </div>
              ))}
          </div>
        </Accordion>
        <form className="form-container">
          <div>
            <div style={{ marginBottom: "1.5rem" }}>File Format</div>
            <div style={{ display: "flex" }}>
              <div>
                <input
                  type="radio"
                  id="csv"
                  name="radioGroup"
                  checked={file_type === "csv"}
                  onChange={e => this.onFileTypeSelect(e)}
                  style={{ marginRight: "15px" }}
                />
                <label htmlFor="csv">CSV</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="xls"
                  name="radioGroup"
                  checked={file_type === "xls"}
                  onChange={e => this.onFileTypeSelect(e)}
                  value="\0"
                  style={{ marginLeft: "15px", marginRight: "15px" }}
                />
                <label htmlFor="excel">Excel</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="json"
                  name="radioGroup"
                  checked={file_type === "json"}
                  onChange={e => this.onFileTypeSelect(e)}
                  value="\0"
                  style={{ marginLeft: "15px", marginRight: "15px" }}
                />
                <label htmlFor="excel">JSON</label>
              </div>
            </div>
          </div>

          {file_type === "csv" && (
            <div>
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
          <div style={{ marginTop: "2.5rem", display: "flex" }}>
            <span className="btn btn-default btn-file">
              <FileUploadIcon style={{ marginRight: "1rem" }} />
              Choose File
              <input
                type="file"
                accept={this.getFileType()}
                ref={ref => (this.fileInput = ref)}
                onChange={this.handleFileChange}
                style={{ marginBottom: "20px" }}
              />
            </span>
            <span
              style={{
                color: "#ff9f00",
                marginTop: "5px",
                wordBreak: "break-all"
              }}
            >
              {!!this.state.file.name && this.state.file.name}
            </span>
          </div>
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
              variant="primary"
              size="md"
              disabled={this.fileInput.value === "" || upload_dataset_loading}
              onClick={this.handleSubmit}
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateDatasetModalContainer(CreateDataSetModal);

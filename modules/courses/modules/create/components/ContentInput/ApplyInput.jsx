import React, { Component, Fragment } from "react";
import Input from "../../../../../../components/Forms/Input";
import { isEqual } from "lodash";
import Loader from "../../../../../../components/Loader";
import { notify } from "../../../../../../../common/utils/notification";
import { Button } from "../../../../../../components/Buttons/Button";

class ApplyInput extends Component {
  state = {
    name: "",
    desc: "",
    milestones: 1,
    file: "",
    files_list: []
  };

  componentDidMount() {
    const { content_data, is_new_content } = this.props;
    if (!is_new_content) {
      this.setState({
        name: content_data.title,
        desc: content_data.description,
        milestones: content_data.milestones.length,
        files_list: is_new_content
          ? []
          : content_data.data_sets.map(d => d.path)
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { content_data, is_new_content } = this.props;
    if (
      content_data &&
      !is_new_content &&
      content_data._links.self.href !== prevProps.content_data._links.self.href
    ) {
      this.setState({
        name: content_data.title,
        desc: content_data.description,
        milestones: content_data.milestones.length,
        files_list: is_new_content
          ? []
          : content_data.data_sets.map(d => d.path)
      });
    } else if (
      this.props.is_new_content &&
      this.props.is_new_content !== prevProps.is_new_content
    ) {
      this.setState({
        name: "",
        desc: "",
        file: "",
        milestones: 1,
        files_list: []
      });
    }
  }

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleFileSelect = evt => {
    this.setState({ file: evt.target.files[0] });
  };

  onAddDatasetToList = () => {
    const { uploadLink } = this.props;
    const { file } = this.state;
    let reader = new FileReader();
    reader.onloadend = () => {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("file_type", "csv");
      fetch(uploadLink.href, {
        method: "POST",
        body: formData
      })
        .then(res => {
          res.json().then(data => {
            if (res.status === 200) {
              this.fileInput = "";
              this.setState({
                files_list: [...this.state.files_list, data.file_path],
                file: ""
              });
            } else {
              alert("Error");
              this.setState({
                file: ""
              });
            }
          });
        })
        .catch(reason => {
          console.log(reason.message);
        });
    };
    reader.readAsDataURL(file);
  };

  handleCreate = () => {
    const { name, desc, files_list, milestones } = this.state;
    const { is_new_content, content_data, selected_module } = this.props;
    const solve_link = is_new_content
      ? selected_module._links.createSimulationSolve
      : content_data._links.updateSimulationSolve;
    const milestone = [];
    [...Array(parseInt(milestones)).keys()].forEach((item, index) => {
      milestone.push({ sequence: index + 1 });
    });
    if (name === "")
      return notify.error("Error", "Data case name cannot be empty");
    if (files_list.length === 0)
      return notify.error("Error", "Please upload at least one dataset");
    const params = {
      name,
      description: desc,
      solve: {
        name,
        inputDataPath: JSON.stringify(files_list),
        type: "Apply",
        milestones: milestone
      }
    };
    this.props.createOrEditModuleSolve(
      solve_link,
      params,
      selected_module._links.self.href,
      selected_module._links.sequenced_module_content
    );
  };

  render() {
    const { name, desc, files_list, milestones } = this.state;
    const { is_new_content, loading } = this.props;

    return (
      <Fragment>
        <div className="content-input__main">
          <Loader loading={loading} is_component />
          <div className="content-input__element-wrapper">
            <Input
              name="name"
              type="text"
              value={name}
              label="Enter Data Case Name"
              placeholder="Data case name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="content-input__element-wrapper">
            <Input
              name="milestones"
              type="number"
              value={milestones}
              label="No of Milestones"
              placeholder="Eg: 3"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="content-input__element-wrapper content-input__element-wrapper--1">
            <Input
              name="desc"
              type="textarea"
              value={desc}
              label="Enter Data Case Description"
              placeholder="Description"
              onChange={this.handleInputChange}
            />
          </div>

          {is_new_content && (
            <div className="content-input__element-wrapper">
              <p className="content-input__label content-input__label--1">
                Upload Dataset
              </p>

              <div className="content-input__add-dataset-wrapper">
                <div className="content-input__left-wrapper">
                  <div className="content-input__left-sub-wrapper">
                    {/*<div className="content-input__element-sub-wrapper">*/}

                    {/*  <p className="content-input__element-sub-wrapper-text">Column Separator</p>*/}
                    {/*  <select className="content-input__drop-down">*/}
                    {/*    <option value="semicolon">Semicolon</option>*/}
                    {/*    <option value="comma">Comma</option>*/}
                    {/*    <option value="tab">tab</option>*/}
                    {/*  </select>*/}
                    {/*</div>*/}

                    <div className="content-input__element-sub-wrapper">
                      <p className="content-input__element-sub-wrapper-text">
                        Upload Dataset
                      </p>
                      <input
                        type="file"
                        name="file"
                        ref={ref => (this.fileInput = ref)}
                        className="content-input__file-input"
                        accept=".csv"
                        onChange={this.handleFileSelect}
                      />
                    </div>
                    <p>Note : Upload only semicolon separated dataset</p>
                  </div>

                  <div className="content-input__add-to-table-wrapper">
                    <button
                      className="content-input__btn content-input__btn--outline"
                      onClick={this.onAddDatasetToList}
                    >
                      Add to List &rarr;
                    </button>
                  </div>
                </div>

                <div className="content-input__right-wrapper">
                  <table className="content-input__table">
                    <tr className="content-input__row--header">
                      <td
                        colSpan="3"
                        className="content-input__row--header-text"
                      >
                        List of Datasets
                      </td>
                    </tr>
                    <tr className="content-input__row">
                      <td className="content-input__table-index-cell color-grey"></td>
                      <td className="content-input__table-content-cell color-grey">
                        File Name
                      </td>
                      <td className="content-input__table-index-cell--1 color-grey"></td>
                    </tr>

                    {files_list.length === 0 ? (
                      <tr className="content-input__row">
                        <td className="content-input__table-index-cell color-grey">
                          1
                        </td>
                        <td className="content-input__table-content-cell content-input__table-content-cell--1">
                          CLICK ON ADD TO LIST TO ADD MULTIPLE DATASETS
                        </td>
                        <td className="content-input__table-index-cell--1 color-grey">
                          &nbsp;&nbsp;
                        </td>
                      </tr>
                    ) : (
                      files_list.map((file, index) => (
                        <tr className="content-input__row">
                          <td className="content-input__table-index-cell color-grey">
                            {index + 1}
                          </td>
                          <td className="content-input__table-content-cell content-input__table-content-cell--1">
                            {file.split("/")[file.split("/").length - 1]}
                          </td>
                          <td className="content-input__table-index-cell--1 color-grey">
                            &nbsp;&nbsp;
                          </td>
                        </tr>
                      ))
                    )}
                  </table>
                </div>
              </div>
            </div>
          )}

          {!is_new_content && (
            <p>
              Note : If you want to update the dataset, Please delete and
              re-configure the data case
            </p>
          )}

          <Button
            onClick={this.handleCreate}
            disabled={loading}
            variant="primary"
            size="sm"
          >
            {is_new_content ? "Create" : "Save"}
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default ApplyInput;

import React, { Component } from "react";
import "./styles.scss";
import Input from "../../../../../../components/Forms/Input";
import get from "lodash/get";
import { notify } from "../../../../../../../common/utils/notification";
import Loader from "../../../../../../components/Loader";
import { Button } from "../../../../../../components/Buttons/Button";

const getExtension = filename => {
  let parts = filename.split(".");
  return parts[parts.length - 1];
};

const validateFile = file => {
  let ext = getExtension(file);
  return ext.toLowerCase() === "pdf";
};

class PdfInput extends Component {
  state = {
    name: "",
    file: ""
  };

  componentDidMount() {
    const { content_data, is_new_content } = this.props;
    if (content_data !== undefined && !is_new_content) {
      this.setState({
        name: content_data.title
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
        name: content_data.title
      });
    } else if (
      this.props.is_new_content &&
      this.props.is_new_content !== prevProps.is_new_content
    ) {
      this.setState({
        name: "",
        file: ""
      });
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleFileSelect = evt => {
    if (validateFile(evt.target.files[0].name)) {
      this.setState({ file: evt.target.files[0] });
    } else {
      notify.error("Invalid File type, Please add pdf files only");
      this.fileInput.value = "";
    }
  };

  handleCreate = () => {
    const { file, name } = this.state;
    const { selected_module } = this.props;
    if (name === "") return notify.error("File name cannot be empty");

    let reader = new FileReader();
    reader.onloadend = () => {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("documentName", name);
      this.props.createPdf(
        selected_module._links.uploadPdf,
        formData,
        selected_module._links.self.href,
        selected_module._links.sequenced_module_content
      );
    };
    reader.readAsDataURL(file);
  };

  handleEdit = () => {
    const { file, name } = this.state;
    const { selected_module, content_data } = this.props;
    if (name === "") return notify.error("File name cannot be empty");
    if (file !== "") {
      let reader = new FileReader();
      reader.onloadend = () => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("documentName", name);
        this.props.createPdf(
          content_data._links.reUploadDoc,
          formData,
          selected_module._links.self.href,
          selected_module._links.sequenced_module_content
        );
      };
      reader.readAsDataURL(file);
    } else {
      let param = {
        name,
        description: name
      };
      this.props.editPdf(
        content_data._links.editDocumentDetails,
        param,
        selected_module._links.self.href,
        selected_module._links.sequenced_module_content
      );
    }
  };

  getShortName = name => {
    const arr = name.split("/");
    return arr[arr.length - 1];
  };

  render() {
    const { content_data, is_new_content, loading } = this.props;
    const { name } = this.state;

    return (
      <div className="content-input__main">
        <Loader loading={loading} is_component />
        <div className="content-input__element-wrapper">
          <Input
            name="name"
            type="text"
            value={name}
            label="Enter PDF Name"
            placeholder="Pdf name"
            onChange={this.handleChange}
          />
        </div>

        <div className="content-input__element-wrapper">
          <p className="content-input__label">Upload PDF</p>
          <input
            type="file"
            name="file"
            ref={ref => (this.fileInput = ref)}
            className="content-input__file-input"
            onChange={this.handleFileSelect}
          />
          <p className="content-input__file">
            {!is_new_content && this.getShortName(content_data.link)}
          </p>
        </div>

        <Button
          onClick={is_new_content ? this.handleCreate : this.handleEdit}
          disabled={loading}
          variant="primary"
          size="md"
        >
          {is_new_content ? "Create" : "Save"}
        </Button>
      </div>
    );
  }
}

export default PdfInput;

import React, { Component } from "react";
import get from "lodash/get";
import "./styles.scss";
import Input from "../../../../../../components/Forms/Input";
import { notify } from "../../../../../../../common/utils/notification";
import Loader from "../../../../../../components/Loader";
import { Button } from "../../../../../../components/Buttons/Button";

const getExtension = filename => {
  let parts = filename.split(".");
  return parts[parts.length - 1];
};

const validateFile = file => {
  let ext = getExtension(file);
  switch (ext.toLowerCase()) {
    case "m4v":
    case "avi":
    case "mpg":
    case "mp4":
    case "wmv":
    case "mpeg":
      // etc
      return true;
    default:
      return false;
  }
};

class VideoInput extends Component {
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
      this.props.showError(
        "Error",
        "Invalid File type, Please add video files only"
      );
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
      this.props.createVideo(
        selected_module._links.uploadVideo,
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
        this.props.createVideo(
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
      this.props.editVideo(
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
            label="Enter Video Name"
            placeholder="Video name"
            onChange={this.handleChange}
          />
        </div>

        <div className="content-input__element-wrapper">
          <p className="content-input__label">Upload Video</p>
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

export default VideoInput;

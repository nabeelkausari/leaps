import React, { Component } from "react";
import { config } from "./config";
import FroalaEditor from "react-froala-wysiwyg";

import "./imports";
import "./Editor-Minimal.scss";

class Editor extends Component {
  render() {
    const { content, handleContentChange } = this.props;
    return (
      <div className="simple-editor-wrapper">
        <FroalaEditor
          tag="textarea"
          model={content}
          onModelChange={handleContentChange}
          config={config}
          // placeholderText = {"Type Something..."}
        />
      </div>
    );
  }
}

export default Editor;

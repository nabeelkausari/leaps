import React, { Component } from "react";
import { config as defaultConfig } from "./config";
import FroalaEditor from "react-froala-wysiwyg";

import "./imports";

class Editor extends Component {
  render() {
    const { content, handleContentChange, onBlur, config } = this.props;
    return (
      <FroalaEditor
        tag="textarea"
        model={content}
        onModelChange={handleContentChange}
        config={{
          ...defaultConfig,
          ...config,
          events: {
            ...defaultConfig.events,
            blur: () => {
              onBlur && onBlur();
            }
          }
        }}
      />
    );
  }
}

export default Editor;

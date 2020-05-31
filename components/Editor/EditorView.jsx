import React, { Component } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import cx from "classnames";

import { config } from "./config";

class EditorView extends Component {
  render() {
    const { content, controlled } = this.props;
    return (
      <div className={cx({ "editor-features-controlled": controlled })}>
        <FroalaEditorView model={content} config={config} />
      </div>
    );
  }
}

export default EditorView;

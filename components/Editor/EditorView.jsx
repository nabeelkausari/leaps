import React, { Component } from "react";
import dynamic from 'next/dynamic'
import cx from "classnames";

import { config } from "./config";

const FroalaEditorView = dynamic(
  () => import("react-froala-wysiwyg/FroalaEditorView"),
  { ssr: false }
)

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

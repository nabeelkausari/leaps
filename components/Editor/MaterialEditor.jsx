import React, { Component, Fragment } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import { SaveFileIcon, EditIcon, CloseIcon } from "../../../common/images";
import { config } from "./config";
import "./imports";
import Loader from "../Loader";

class Editor extends Component {
  state = {
    readOnly: true,
    content: ""
  };

  componentDidMount() {
    this.setState({ content: this.props.text });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.saveSuccess &&
      this.props.saveSuccess !== prevProps.saveSuccess
    ) {
      this.toggleEdit();
    }

    if (this.props.text && this.props.text !== prevProps.text) {
      this.setState({ content: this.props.text });
    }
  }

  handleModelChange = model => {
    this.setState({ content: model });
  };

  toggleEdit = () => {
    this.setState((state, props) => ({ readOnly: !state.readOnly }));
  };
  render() {
    const { editable, style, loading = false } = this.props;
    const { readOnly, content } = this.state;
    return (
      <div className="desc-model" style={{ ...style }}>
        {loading ? (
          <Loader loading={loading} is_component={true} />
        ) : (
          <Fragment>
            <div className="editor-container" style={{ display: "flex" }}>
              <div className="editor-container__btn-container">
                {editable && readOnly && (
                  <Fragment>
                    <EditIcon
                      onClick={this.toggleEdit}
                      className="editor-container__icon"
                    />
                  </Fragment>
                )}

                {!this.state.readOnly && (
                  <Fragment>
                    <SaveFileIcon
                      onClick={() => this.props.onSave(this.state.content)}
                      className="editor-container__icon editor-container__icon--save"
                    />
                    <CloseIcon
                      onClick={this.toggleEdit}
                      className="editor-container__close-btn"
                    />
                  </Fragment>
                )}
              </div>
            </div>
            {!this.state.readOnly ? (
              <FroalaEditor
                tag="textarea"
                model={content}
                onModelChange={this.handleModelChange}
                config={config}
              />
            ) : (
              <div className="editor-container__view">
                <FroalaEditorView model={content} />
              </div>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Editor;

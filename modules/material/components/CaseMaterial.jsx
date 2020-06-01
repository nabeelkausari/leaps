import React, { Component } from "react";
import { Button } from "../../../components/Buttons/Button";
import Editor from "../../../components/Editor/Editor";
import EditorView from "../../../components/Editor/EditorView";

import MaterialContainer from "../containers/Material";
import Loader from "../../../components/Loader";
import get from "lodash/get";
import cx from "classnames";

import "../styles/material.scss";

class Material extends Component {
  state = {
    editing: false,
    content: ""
  };

  componentDidMount() {
    const { fetchMaterial, material_link, by_uri } = this.props;
    if (!material_link) {
      return console.log("Material Link is not present");
    }
    if (!by_uri[material_link.href]) {
      fetchMaterial(material_link);
    } else {
      this.setState({ content: get(by_uri[material_link.href], "text") });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetchMaterial,
      fetch_material_succeeded,
      material_link,
      by_uri,
      update_material_succeeded
    } = this.props;

    if (
      material_link &&
      material_link.href !== get(prevProps, "material_link.href")
    ) {
      if (!by_uri[material_link.href]) {
        fetchMaterial(material_link);
      } else {
        this.setContent();
      }
    }
    if (
      material_link &&
      get(by_uri[material_link.href], "text") !==
        get(prevProps.by_uri[material_link.href], "text")
    ) {
      this.setContent();
    }

    if (
      update_material_succeeded &&
      update_material_succeeded !== prevProps.update_material_succeeded
    ) {
      this.setContent();
    }
  }

  setContent = () => {
    const { material_link, by_uri } = this.props;
    this.setState({
      content: material_link && get(by_uri[material_link.href], "text")
    });
  };

  editMaterial = () => {
    this.setState({ editing: true });
  };

  saveMaterial = () => {
    const { content } = this.state;
    const {
      material_link,
      saveCaseMaterial,
      update_link,
      onSaveCallBack
    } = this.props;
    saveCaseMaterial(update_link, material_link, content);
    if (onSaveCallBack) onSaveCallBack();
    this.hideEditor();
  };

  handleChange = content => {
    this.setState({ content: content });
  };

  hideEditor = () => {
    this.setContent();
    this.setState({ editing: false });
  };

  render() {
    const {
      fetch_material_requested,
      update_link,
      course_content,
      controlled
    } = this.props;
    const { editing, content } = this.state;

    const show_edit_button = !editing && update_link;

    return (
      <div
        className={cx("course-material", {
          "course-material--course-content": course_content
        })}
      >
        <Loader loading={fetch_material_requested} is_component={true} />
        {update_link && (
          <div className="course-material__actions-wrapper">
            {show_edit_button && (
              <Button
                variant="default"
                size="xs"
                onClick={this.editMaterial}
                className="course-material__btn--edit"
              >
                Edit
              </Button>
            )}
            {editing && (
              <Button
                variant="default"
                size="xs"
                onClick={this.hideEditor}
                className="course-material__btn--cancel"
              >
                Cancel
              </Button>
            )}
            {editing && (
              <Button
                variant="primary"
                size="xs"
                onClick={this.saveMaterial}
                className="course-material__btn--save"
              >
                Save
              </Button>
            )}
          </div>
        )}

        <div
          className={cx("course-material__editor-wrapper", {
            "editor-features-controlled": controlled
          })}
        >
          {editing ? (
            <Editor content={content} handleContentChange={this.handleChange} />
          ) : (
            <EditorView content={content} />
          )}
        </div>
      </div>
    );
  }
}

export default MaterialContainer(Material);

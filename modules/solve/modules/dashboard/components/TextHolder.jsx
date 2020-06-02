import React, { Component } from "react";
import cx from "classnames";
import { DeleteIcon, DragIcon } from "../../../../../../common/images";
import { handleOnEnter } from "../../../../../../common/api/helpers";
import Editor from "../../../../../components/Editor/Editor";
import EditorView from "../../../../../components/Editor/EditorView";

export class TextHolder extends Component {
  state = {
    edit: false,
    value: ""
  };

  componentDidMount() {
    this.setState({ value: this.props.pin.detail.value });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { remove_dashboard_item_succeeded, pin } = this.props;
    const { edit } = this.state;

    if (edit && prevState.edit !== edit) {
      this.dashboard_element && this.dashboard_element.focus();
    }

    if (
      remove_dashboard_item_succeeded &&
      remove_dashboard_item_succeeded !==
        prevProps.remove_dashboard_item_succeeded
    ) {
      this.setState({ value: pin.detail.value, edit: false });
    }
  }

  toggleEdit = () => {
    this.setState(({ edit }) => ({ edit: !edit }));
  };

  handleDelete = () => {
    this.props.showDialog({
      title: "Are you sure you want to delete this item?",
      yesButton: {
        text: "Yes",
        onClick: () => {
          this.props.remove(this.props.pin);
          return true;
        }
      },
      noButton: {
        text: "No"
      },
      items_centered: true
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  setEditorValue = value => {
    this.setState({ value });
  };

  handleUpdate = () => {
    let { value } = this.state;
    let { detail, i } = this.props.pin;
    this.props.changeText({ value, type: detail.type }, i);
    this.toggleEdit();
  };

  render() {
    const { pin, read_only } = this.props;
    const { edit, value } = this.state;

    return (
      <div
        className={cx([
          "text-item__content",
          pin.detail.type,
          edit && "edit-mode"
        ])}
      >
        <div
          className="dashboard-element__wrapper"
          onDoubleClick={!read_only && !edit ? this.toggleEdit : () => {}}
        >
          {!edit ? (
            <div className="dashboard-element__input-wrapper">
              <span
                title="Double click to edit"
                className={"dashboard-element__text " + pin.detail.type}
              >
                {pin.detail.type === "heading" ||
                pin.detail.type === "sub-heading" ||
                pin.detail.type === "paragraph" ? (
                  <span>{pin.detail.value}</span>
                ) : (
                  <EditorView content={pin.detail.value} />
                )}
              </span>
              {!read_only && (
                <DragIcon className="dashboard-element__drag-icon draggable-element" />
              )}
              {!read_only && (
                <DeleteIcon
                  onClick={this.handleDelete}
                  className="dashboard-element__delete-icon"
                />
              )}
            </div>
          ) : (
            <div className="dashboard-element__edit-mode">
              {(() => {
                switch (pin.detail.type) {
                  case "heading":
                  case "sub-heading":
                    return (
                      <input
                        onChange={this.handleChange}
                        value={value}
                        type="text"
                        onBlur={this.handleUpdate}
                        ref={input => (this.dashboard_element = input)}
                        className={
                          "dashboard-element__input dashboard-element__input--text" +
                          " " +
                          pin.detail.type
                        }
                        onKeyDown={e => handleOnEnter(e, this.handleUpdate)}
                      />
                    );
                  case "paragraph":
                    return (
                      <textarea
                        onChange={this.handleChange}
                        value={value}
                        onBlur={this.handleUpdate}
                        ref={input => (this.dashboard_element = input)}
                        className="dashboard-element__input dashboard-element__input--text-area paragraph"
                        rows={5}
                      />
                    );
                  default:
                    return (
                      <Editor
                        content={value}
                        handleContentChange={this.setEditorValue}
                        onBlur={this.handleUpdate}
                        config={{
                          toolbarInline: true,
                          autofocus: true,
                          fontSizeDefaultSelection: 16
                        }}
                      />
                    );
                }
              })()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

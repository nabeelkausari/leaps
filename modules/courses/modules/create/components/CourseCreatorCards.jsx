import * as React from "react";
import { Component } from "react";
import cx from "classnames";

import {
  RightArrowIcon,
  pdf_icon,
  video_icon,
  overview_icon,
  webinar_icon,
  quiz_icon,
  simulation_icon,
  AddIcon,
  MoveIcon,
  PencilIcon,
  VideoIcon,
  OverViewIcon,
  BoxQuizIcon,
  PuzzleIcon,
  WebinarIcon,
  CheckedIcon,
  DocumentIcon
} from "../../../../../../common/images/index";

import Tooltip from "../../../../../../app/components/Tooltip/Tooltip";
import { DeleteIcon, PlusIcon } from "../../../../../../common/images";

export class ModuleCard extends Component {
  handleEdit = (e, module) => {
    this.props.handleEditClick(module);
    e.stopPropagation();
  };
  handleDelete = (e, module) => {
    this.props.handleDeleteClick(module);
    e.stopPropagation();
  };
  render() {
    const { index, handleClick, module, active } = this.props;

    return (
      <div
        className={cx("cc-module-card", { "cc-module-card__active": active })}
        onClick={() => handleClick(module._links.self.href)}
      >
        <div className="cc-module-card__wrapper">
          <Tooltip text={module.title}>
            <p className="cc-module-card__name">{module.title}</p>
          </Tooltip>
          {/*<p className="cc-module-card__week">0 weeks</p>*/}
        </div>
        <div className="cc-module-card__icon-wrapper">
          <PencilIcon
            className="cc-module-card__icon"
            onClick={e => this.handleEdit(e, module)}
          />
          <DeleteIcon
            className="cc-module-card__icon"
            onClick={e => this.handleDelete(e, module)}
          />
        </div>
      </div>
    );
  }
}

export class ContentCard extends Component {
  renderContentIcon = content_type => {
    switch (content_type) {
      case "VIDEO":
        return <VideoIcon className="cc-content-card__icon" />;

      case "MATERIAL":
        return <OverViewIcon className="cc-content-card__icon" />;

      case "APPLY":
        return <BoxQuizIcon className="cc-content-card__icon" />;

      case "QUIZ":
        return <PuzzleIcon className="cc-content-card__icon" />;

      case "PDF":
        return (
          <DocumentIcon className="cc-content-card__icon cc-content-card__icon--doc" />
        );

      case "SOLVE":
        return <BoxQuizIcon className="cc-content-card__icon" />;

      case "WEBINAR":
        return <WebinarIcon className="cc-content-card__icon" />;
    }
  };

  handleDelete = e => {
    e.stopPropagation();
    const { content, deleteModuleContent } = this.props;
    let link;

    switch (content.type) {
      case "VIDEO":
        link = !!content.data._links
          ? content.data._links.deleteDoc
          : "new_content";
        break;

      case "APPLY":
        link = !!content.data._links
          ? content.data._links.deleteSimulation
          : "new_content";
        break;

      case "QUIZ":
        link = !!content.data._links
          ? content.data._links.deleteQuiz
          : "new_content";
        break;

      case "PDF":
        link = !!content.data._links
          ? content.data._links.deleteDoc
          : "new_content";
        break;

      case "SOLVE":
        link = !!content.data._links
          ? content.data._links.deleteSolve
          : "new_content";
        break;

      case "WEBINAR":
        link = !!content.data._links
          ? content.data._links.deleteWebinar
          : "new_content";
        break;
    }

    deleteModuleContent(link, content.data._links.self.href);
  };

  getTitle = content => {
    switch (content.type) {
      case "MATERIAL":
        return "Overview";
      case "QUIZ":
        return content.data.details.name;
      case "WEBINAR":
        return content.data.name;
      default:
        return content.data.title;
    }
  };

  render() {
    const { active, handleClick, content } = this.props;

    return (
      <div
        className={cx("cc-content-card", { "cc-content-card__active": active })}
        onClick={() => handleClick(content.data._links.self.href)}
      >
        <MoveIcon
          className={cx("cc-content-card__move-icon", {
            "cc-content-card__move-icon--1": content.type === "MATERIAL"
          })}
        />
        <div className="cc-content-card__wrapper">
          {this.renderContentIcon(content.type)}
          <Tooltip text={this.getTitle(content)}>
            <p className="cc-content-card__element-name">
              {this.getTitle(content)}
            </p>
          </Tooltip>
        </div>
        {!(content.type === "MATERIAL") && (
          <div
            className="cc-content-card__action-wrapper"
            onClick={this.handleDelete}
          >
            <i className="fa fa-trash-o" />
          </div>
        )}
      </div>
    );
  }
}

export class AddContentCard extends Component {
  render() {
    const { handleClick } = this.props;

    return (
      <div className="add-content-card">
        <div className="add-content-card__header">
          <PlusIcon alt="add icon" className="add-content-card__plus-icon" />
          <p className="add-content-card__header-text">
            Add Content to this Section
          </p>
        </div>
        <div className="add-content-card__elements-wrapper">
          <span
            className="add-content-card__element"
            onClick={() => handleClick("VIDEO")}
          >
            <VideoIcon className="add-content-card__element--icon add-content-card__element--icon--video" />
            Video
          </span>
          <span
            className="add-content-card__element"
            onClick={() => handleClick("APPLY")}
          >
            <BoxQuizIcon className="add-content-card__element--icon add-content-card__element--icon--box" />
            Data Case
          </span>
          <span
            className="add-content-card__element"
            onClick={() => handleClick("PDF")}
          >
            <DocumentIcon className="add-content-card__element--icon add-content-card__element--icon--doc" />
            PDF
          </span>
          <span
            className="add-content-card__element"
            onClick={() => handleClick("SOLVE")}
          >
            <BoxQuizIcon className="add-content-card__element--icon add-content-card__element--icon--box" />
            Solve
          </span>
          <span
            className="add-content-card__element"
            onClick={() => handleClick("QUIZ")}
          >
            <PuzzleIcon className="add-content-card__element--icon add-content-card__element--icon--doc" />
            Quiz
          </span>
          <span
            className="add-content-card__element"
            onClick={() => handleClick("WEBINAR")}
          >
            <WebinarIcon className="add-content-card__element--icon add-content-card__element--icon--material" />
            Webinar
          </span>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import cx from "classnames";
import Truncate from "react-truncate";
import Tooltip from "../../../../../components/Tooltip/ConditionalTooltip";
import {
  checked_icon,
  CheckedIcon,
  icon_lock
} from "../../../../../../common/images";

import get from "lodash/get";

class StructureCard extends Component {
  state = {
    truncated: false
  };

  truncated = truncated => {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated
      });
    }
  };

  render() {
    const { index, content_data, active, type, onCardClick } = this.props;
    const { truncated } = this.state;
    const is_content_locked = !get(content_data, "_links.self");
    const is_overview = type === "MATERIAL";
    const Icon = content_data.icon;

    return (
      <div
        className={cx(
          "content-card",
          { "content-card__active": active },
          {
            "content-card--1": is_overview
          }
        )}
        key={index}
        onClick={() =>
          is_content_locked ? null : onCardClick(content_data.content_reference)
        }
      >
        <div className="content-card__wrapper">
          {!is_overview && (
            <div className="content-card__completion-indicator">
              {!content_data.completed ? (
                <div className="content-card__incomplete">&nbsp;</div>
              ) : (
                <CheckedIcon className="content-card__complete" />
              )}
            </div>
          )}
          <Icon
            className={cx(
              "content-card__icon",
              `content-card__icon--${type.toLowerCase()}`
            )}
          />

          <div
            className={cx("content-card__title-wrapper", {
              "content-card__title-wrapper--locked": is_content_locked
            })}
          >
            <Tooltip
              placement="top"
              text={content_data.title}
              is_active={truncated}
            >
              <Truncate lines={2} ellipsis={"..."} onTruncate={this.truncated}>
                <p className="content-card__title">{content_data.title}</p>
              </Truncate>
            </Tooltip>
          </div>
          {is_content_locked && (
            <img
              src={icon_lock}
              alt="locked"
              className="content-card__lock-icon"
            />
          )}
        </div>
      </div>
    );
  }
}

export default StructureCard;

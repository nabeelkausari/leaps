import React, { Component } from "react";
import { css } from "@emotion/core";
import cx from "classnames";

import { getUserId } from "../../../../../../common/utils/storage";
import { ClipLoader } from "react-spinners";
import Tooltip from "../../../../../components/Tooltip/Tooltip";
import { getInitials } from "../../../../../../common/utils/helperFunctions";
import {
  Clone,
  DeleteIcon,
  InfoIcon,
  ThreeDotIcon
} from "../../../../../../common/images";
import CategoryColors from "./colors";
import { AnimatedButton } from "../../../../../components/Buttons/AnimatedButton";

const override = css`
  display: block;
  border-color: var(--highlight-primary);
  margin-left: 1rem;
`;

export class CaseCard extends Component {
  state = {
    dropdown_open: false
  };

  setDropdown = e => {
    e.stopPropagation();
    this.setState(state => {
      return {
        dropdown_open: !state.dropdown_open
      };
    });
  };

  onClickEvent = (e, callback) => {
    this.setDropdown(e);
    callback();
  };
  render() {
    const { loading: cloning } = this.props;
    let getCaseCollaboratorsList = (collaborators = [], case_creator_id) => {
      if (this.props.myCase) {
        return collaborators.length > 0
          ? collaborators.concat([parseInt(getUserId())])
          : collaborators;
      } else {
        return collaborators.concat([case_creator_id]);
      }
    };
    const { dropdown_open } = this.state;
    const {
      name,
      overview,
      category,
      tags,
      sample_case,
      _links: { delete_case, clone_case },
      collaborators,
      case_creator_id,
      id
    } = this.props.case;
    const tag_list = (tags && tags.split(",")) || [];
    const case_collaborators = getCaseCollaboratorsList(
      collaborators,
      case_creator_id
    );

    let collaborators_details = this.props.collaborators_details_list.filter(
      user => case_collaborators.some(id => id === user.user_id)
    );
    return (
      <div
        className="case-card"
        onClick={() => this.props.viewCase(this.props.case)}
      >
        <div
          className="case-card__category"
          style={{ backgroundColor: CategoryColors[category] }}
        >
          {category}
        </div>
        <div style={{ display: "none" }} className="case-card__header">
          <div className="case-card__loading-wrapper">
            <div
              className="case-card__category"
              style={{ backgroundColor: CategoryColors[category] }}
            >
              {category}
            </div>
            {this.props.loading && (
              <div className="case-card__loader-wrapper">
                <ClipLoader
                  css={override}
                  sizeUnit={"rem"}
                  size={2}
                  color={"var(--highlight-primary)"}
                  loading={this.props.loading}
                />
                <span className="case-card__loader-wrapper--text">
                  Cloning...
                </span>
              </div>
            )}
          </div>
          <div className="case-card__options" onClick={this.setDropdown}>
            <ThreeDotIcon className="case-card__option-icon" />
            {dropdown_open && (
              <div className="case-card__dropdown">
                <div
                  className="case-card__dropdown-item"
                  onClick={e =>
                    this.onClickEvent(e, () =>
                      this.props.showDescription(this.props.case)
                    )
                  }
                >
                  <InfoIcon className="case-card__dropdown-item--icon" />
                  Description
                </div>
                {clone_case && (
                  <div
                    className="case-card__dropdown-item"
                    onClick={e =>
                      this.onClickEvent(e, () =>
                        this.props.showCloneCase(clone_case, id)
                      )
                    }
                  >
                    <Clone className="case-card__dropdown-item--icon" />
                    Clone
                  </div>
                )}
                {delete_case && !sample_case && (
                  <div
                    className="case-card__dropdown-item"
                    onClick={e =>
                      this.onClickEvent(e, () =>
                        this.props.showDeleteConfirmationAlert(delete_case)
                      )
                    }
                  >
                    <DeleteIcon className="case-card__dropdown-item--icon" />
                    Delete
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="case-card__main-content">
          <div className="case-card__title" title={name}>
            {name}
          </div>
          <div className="case-card__desc">
            <div className="case-card__desc-text">{overview}</div>
          </div>
        </div>

        <div className={"case-card__footer"}>
          <div className="case-card__collabs-wrapper">
            {(collaborators_details.length > 4
              ? collaborators_details.slice(0, 4)
              : collaborators_details
            ).map(user => (
              <div className="case-card__collaborators" key={user.user_id}>
                <Tooltip placement="top" text={user.name}>
                  {user.profile_pic_url ? (
                    <img src={user.profile_pic_url} alt="profile" />
                  ) : (
                    <div
                      className="case-card__collaborators--initial"
                      style={{ backgroundColor: user.profile_color }}
                    >
                      <span>{getInitials(user.name)}</span>
                    </div>
                  )}
                </Tooltip>
              </div>
            ))}
            {collaborators_details.length > 4 && (
              <div className="case-card__collaborators" key={5}>
                <div className="case-card__collaborators--initial case-card__collaborators--number">
                  <span> +{collaborators_details.length - 4}</span>
                </div>
              </div>
            )}
          </div>

          <div className="case-card__footer--right">
            {clone_case && (
              <div
                className={cx("case-card__footer--btn", {
                  "case-card__footer--btn-loading": cloning
                })}
                onClick={e =>
                  this.onClickEvent(e, () =>
                    this.props.showCloneCase(clone_case, id)
                  )
                }
              >
                <Clone />
                {cloning ? (
                  <>
                    <span className="case-card__footer--btn-text">
                      Cloning...
                    </span>
                    <ClipLoader
                      css={override}
                      sizeUnit={"rem"}
                      size={2}
                      color={"var(--highlight-primary)"}
                      loading={cloning}
                    />
                  </>
                ) : (
                  <div className="case-card__footer--btn-text">Clone</div>
                )}
              </div>
            )}

            <AnimatedButton
              icon={InfoIcon}
              onClick={e =>
                this.onClickEvent(e, () =>
                  this.props.showDescription(this.props.case)
                )
              }
              text="Description"
              outlined
            />
          </div>
        </div>
        {/*{ props.showView && <Button className="cases-card__btn" buttonType="primary" onClick={() => props.viewCase(props.cases)}>View</Button>}*/}
      </div>
    );
  }
}

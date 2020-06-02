import React, { Component, Fragment } from "react";
import get from "lodash/get";
import cx from "classnames";
import dynamic from "next/dynamic"
// import {
//   DragIcon,
//   FullScreenIcon,
//   PinIcon
// } from "../../../../../../common/images";

const { renderResult } = dynamic(
  () => import("../../output/ResultFlyout"),
  { ssr: false }
)

class ResultComponent extends Component {
  state = {
    options_open: false,
    title_edit: false,
    title_value:
      get(this.props.pin, "detail.title") ||
      get(this.props.pin, "detail.step.operation_name")
  };

  handleDropDown = () => {
    this.setState({ options_open: !this.state.options_open });
  };

  handleTitleEditClick = () => {
    this.setState({ title_edit: !this.state.title_edit });
  };

  handleTitleEditChange = e => {
    this.setState({ title_value: e.target.value });
  };

  onTitleFocusOut = () => {
    this.handleTitleEditClick();
    this.props.handleSaveTitle(this.state.title_value, this.props.pin);
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.onTitleFocusOut();
    }
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { title_edit } = this.state;
  //   if (title_edit && title_edit !== prevState.title_edit) {
  //     this.titleInput.focus();
  //   }
  // }

  render() {
    const {
      pin,
      full_screen,
      handleFullScreen,
      // match: {
      //   params: { scenario_id }
      // },
      // readonly_dashboard
    } = this.props;
    const { options_open, title_edit } = this.state;
    let title_value =
      get(this.props.pin, "detail.title") ||
      get(this.props.pin, "detail.step.operation_name");
    return (
      <Fragment>
        <div className="card-output__header">
          <div className="card-output__operation-wrapper">
            <p className="card-output__operation">{title_value}</p>
            {/*{!title_edit && <p className="card-output__operation" onDoubleClick={this.handleTitleEditClick}>{title_value}</p>}*/}
            {/*{title_edit && <input className="card-output__operation-input"*/}
            {/*                      value={title_value}*/}
            {/*                      ref={(input) => { this.titleInput = input; }}*/}
            {/*                      onChange={this.handleTitleEditChange}*/}
            {/*                      onKeyDown={this.handleKeyDown}*/}
            {/*                      onBlur={this.onTitleFocusOut}*/}
            {/*/>}*/}

            <div className="card-output__operation-icons-wrapper">
              <div
                onClick={this.handleDropDown}
                className="card-output__icon-operation card-output__operation-1"
              >
                <i className="fa fa-info-circle" />
              </div>
              {/*{!readonly_dashboard && (*/}
              {/*  <div className="card-output__icon-operation-wrapper">*/}
              {/*    <PinIcon*/}
              {/*      className="card-output__icon-operation card-output__operation-2"*/}
              {/*      onClick={() => this.props.pinStep(pin, true, scenario_id)}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*)}*/}
              <div className="card-output__icon-operation-wrapper">
                {/*<FullScreenIcon*/}
                {/*  className={cx(*/}
                {/*    "card-output__icon-operation card-output__operation-3",*/}
                {/*    { selected: full_screen }*/}
                {/*  )}*/}
                {/*  onClick={() => handleFullScreen(pin.i)}*/}
                {/*/>*/}
              </div>
              {/*{!readonly_dashboard && !full_screen && (*/}
              {/*  <div className="card-output__icon-operation-wrapper">*/}
              {/*    <DragIcon className="card-output__icon-operation card-output__operation-4 draggable-element" />*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          </div>

          {options_open && (
            <div className="card-output__dropdown">
              <div className="card-output__dropdown--details">
                <p className="card-output__dropdown--details-1">
                  Step {get(pin, "detail.step.sequence_number")}
                </p>
                <p
                  className="card-output__dropdown--details-2"
                  title={get(pin, "detail.step.operation_name")}
                >
                  Function: {get(pin, "detail.step.operation_name")}
                </p>
              </div>
              {/*<ul className="card-output__dropdown--list">*/}
              {/*   {!read_only && <li className="card-output__dropdown--list-item" onClick={() =>this.props.pinStep(pin,pin.flyout_type)}>*/}
              {/*        <PinIcon className="card-output__dropdown--list-item-pinicon card-output__action-icon--active"/>*/}
              {/*        Unpin*/}
              {/*    </li>*/}
              {/*   }*/}
              {/*    <li className="card-output__dropdown--list-item" onClick={() => handleFullScreen(pin.i)}>*/}
              {/*        <FullScreenIcon className={cx("card-output__dropdown--list-item-expand",{'selected': full_screen})}/>*/}
              {/*        Expand*/}
              {/*    </li>*/}
              {/*</ul>*/}
            </div>
          )}
        </div>
        <div className="card-output__content">
          {renderResult && get(pin, "detail.step.results") &&
            get(pin, "detail.step.results").map(item =>
              renderResult(item, this.props.theme, true)
            )}
        </div>
      </Fragment>
    );
  }
}

export default ResultComponent;

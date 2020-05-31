import React, { Component } from "react";
import Quiz from "./Quiz";
import QuizContainer from "../../../../containers/course/quiz";
import { ProgressBar } from "../../../../../../components/ProgressBar/horizontalProgressBar";
import { FullScreenIcon } from "../../../../../../../common/images/index";

import cx from "classnames";

import "../../../../styles/activeQuizBar.scss";

class ActiveQuizBar extends Component {
  state = {
    quiz_view_active: false,
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
    top: "80%",
    left: "2rem"
  };

  quiz_bar;

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { pos1, pos2 } = this.state;
    if (pos1 !== prevState.pos1 || pos2 !== prevState.pos2) {
      this.setState({
        top: this.quiz_bar.offsetTop - pos2 + "px",
        left: this.quiz_bar.offsetLeft - pos1 + "px"
      });
    }
  }

  toggleQuiz = () => {
    this.setState(state => ({ quiz_view_active: !state.quiz_view_active }));
  };

  getProgressWidth = () => {
    const { time_left, active_quiz } = this.props;
    if (!active_quiz) return;
    let progress =
      (
        ((active_quiz.duration - time_left) / active_quiz.duration) *
        100
      ).toString() + "%";
    return progress;
  };

  dragMouseDown = e => {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.setState({ pos3: e.clientX, pos4: e.clientY });
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag;
  };

  elementDrag = e => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.setState(state => ({
      pos1: state.pos3 - e.clientX,
      pos2: state.pos4 - e.clientY,
      pos3: e.clientX,
      pos4: e.clientY
    }));
  };

  closeDragElement = () => {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  };

  render() {
    const { quiz_view_active, top, left } = this.state;
    const { active_quiz_id, minutes_left, seconds_left } = this.props;
    if (!active_quiz_id) return null;
    return (
      <div
        className="quiz-bar-container"
        ref={elem => (this.quiz_bar = elem)}
        onMouseDown={this.dragMouseDown}
        style={{ top, left }}
      >
        <div
          className={cx("quiz-bar__quiz", {
            "quiz-bar__quiz--visible": quiz_view_active
          })}
        >
          <Quiz
            toggleQuiz={this.toggleQuiz}
            quiz_id={active_quiz_id}
            from_quiz_bar
          />
        </div>

        <div className="quiz-bar">
          <ProgressBar width={this.getProgressWidth()} />
          <div className="quiz-bar__wrapper">
            <div className="quiz-bar__info-wrapper">
              <div className="quiz-bar__title">Quiz Started</div>
              {!quiz_view_active && (
                <div className="quiz-bar__timer">
                  {!(minutes_left === "00" && seconds_left === "00") ? (
                    <span className="quiz-bar__timer-time">
                      {" "}
                      {minutes_left}M : {seconds_left}S{" "}
                    </span>
                  ) : (
                    <span className="quiz-bar__timer-time">
                      {" "}
                      {"- - "} : {" - -"}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="quiz-bar__action-wrapper">
              <FullScreenIcon
                className="quiz-bar__action-icon"
                onClick={this.toggleQuiz}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizContainer(ActiveQuizBar);

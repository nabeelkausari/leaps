import React, { Component, Fragment } from "react";
import Quiz from "./Quiz";
import QuizContainer from "../../containers/quiz";
import { FullScreenIcon, CloseIcon } from "../../../../../common/images/index";

import cx from "classnames";

import "../../styles/quiz.scss";
import { withRouter } from "react-router-dom";
import { setActiveQuizFullScreen } from "../../redux/actions";
import Loader from "../../../../components/Loader";

class QuizBar extends Component {
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

  componentDidMount() {
    const {
      current_hackathon,
      current_quiz,
      fetchSingleHackathon,
      hackathon_requested,
      fetchQuiz,
      match: {
        params: { hackathon_id }
      }
    } = this.props;
    if (!hackathon_requested && !current_hackathon) {
      fetchSingleHackathon(hackathon_id);
    }
    if (current_quiz) {
      fetchQuiz(current_quiz._links.quiz_details);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { pos1, pos2 } = this.state;

    const {
      fetch_hackathon_list_succeeded,
      fetchQuiz,
      current_quiz
    } = this.props;

    if (pos1 !== prevState.pos1 || pos2 !== prevState.pos2) {
      this.setState({
        top: this.quiz_bar.offsetTop - pos2 + "px",
        left: this.quiz_bar.offsetLeft - pos1 + "px"
      });
    }

    if (
      fetch_hackathon_list_succeeded &&
      fetch_hackathon_list_succeeded !==
        prevProps.fetch_hackathon_list_succeeded
    ) {
      fetchQuiz(current_quiz._links.quiz_details);
    }
  }

  toggleQuiz = () => {
    this.props.setActiveQuizFullScreen();
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
    const { top, left } = this.state;
    const { fullscreen, quiz_loading } = this.props;
    return (
      <div className="hackathon-quiz">
        {fullscreen ? (
          <div className="hackathon-quiz__quiz-container">
            <Quiz />
          </div>
        ) : (
          <div
            className="quiz-bar-container"
            ref={elem => (this.quiz_bar = elem)}
            onMouseDown={this.dragMouseDown}
            style={{ top, left }}
          >
            <div className="hk-quiz-bar">
              <div className="hk-quiz-bar__info-wrapper">
                <p className="hk-quiz-bar__title">Quiz Started</p>
              </div>
              <div className="hk-quiz-bar__action-wrapper">
                {quiz_loading ? (
                  <Loader
                    is_component={true}
                    loading={true}
                    type="clip"
                    className="hk-quiz-bar__loader"
                    size={2}
                  />
                ) : (
                  <Fragment>
                    <FullScreenIcon
                      className="hk-quiz-bar__action-icon"
                      onClick={this.toggleQuiz}
                    />

                    <CloseIcon
                      className="hk-quiz-bar__action-icon"
                      onClick={() =>
                        this.props.history.push(this.props.location.pathname)
                      }
                    />
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(QuizContainer(QuizBar));

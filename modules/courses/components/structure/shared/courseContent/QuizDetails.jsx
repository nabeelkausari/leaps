import React, { Component, Fragment } from "react";
import get from "lodash/get";
import { CourseContentTiles } from "./CourseContentTiles";
import Loader from "../../../../../../../app/components/Loader";
import { quiz_links } from "../../../../../../../common/api/quizLinks";
import QuizDetailsContainer from "../../../../containers/course/quizDetails";
import { Button } from "../../../../../../components/Buttons/Button";
import "../../../../styles/quizDetail.scss";
import { withRouter } from "react-router-dom";
import {
  ACTIVE_QUIZ_ID,
  ATTEMPT_EXHAUSTED
} from "../../../../../../../common/utils/constants";
import AttemptExhausted from "./AttemptExhausted";
import { lockAndGetQuizResults } from "../../../../modules/quiz/redux/actions";
import QuizAnswers from "./QuizAnswers";

class QuizDetails extends Component {
  state = {
    instructions: null
  };

  componentDidMount() {
    const { quiz_id, instructions_by_id, getQuizInstructions } = this.props;

    if (!quiz_id) return console.log("Quiz Link is missing");

    let quiz_instruction_link = quiz_links.getInstructionsLink(quiz_id);

    if (!instructions_by_id[quiz_id]) {
      getQuizInstructions(quiz_instruction_link, quiz_id);
    } else {
      this.setState({ instructions: instructions_by_id[quiz_id] });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetch_quiz_details_succeeded,
      instructions_by_id,
      getQuizInstructions,
      quiz_id
    } = this.props;

    if (quiz_id && quiz_id !== prevProps.quiz_id) {
      let quiz_instruction_link = quiz_links.getInstructionsLink(quiz_id);
      if (!instructions_by_id[quiz_id]) {
        getQuizInstructions(quiz_instruction_link, quiz_id);
      } else {
        this.setState({ instructions: instructions_by_id[quiz_id] });
      }
    }

    if (
      fetch_quiz_details_succeeded &&
      fetch_quiz_details_succeeded !== prevProps.fetch_quiz_details_succeeded
    ) {
      this.setState({ instructions: instructions_by_id[quiz_id] });
    }
  }

  renderInstructions = instructions => {
    if (!instructions) return;
    let quiz_instructions = instructions.general;
    return (
      <div className="course-module-content__quiz-instructions-wrapper">
        <p className="course-module-content__quiz-instruction-title">
          Instructions
        </p>
        <ul className="course-module-content__quiz-instructions-list">
          {quiz_instructions.map((instruction, index) => {
            return (
              <li
                key={index}
                className="course-module-content__quiz-instruction"
              >
                <span className="course-module-content__quiz-instruction--index">
                  {index + 1}.
                </span>
                <span>{instruction}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  getTitleText = attempts_remaining => {
    if (attempts_remaining > 1)
      return `You have  ${attempts_remaining} attempts left`;
    return `You have  ${attempts_remaining} attempt left`;
  };

  startQuiz = () => {
    const { instructions } = this.state;

    this.props.showDialog({
      title: this.getTitleText(instructions.remainingAttempts),
      subtitle: "Are you sure you want to take the quiz ?",
      yesButton: {
        text: "Yes",
        onClick: () => {
          this.startQuizConfirmed();
          return true;
        }
      },
      noButton: {
        text: "No"
      },
      items_centered: true
    });
  };

  startQuizConfirmed = () => {
    const { quiz_id, setActiveQuiz } = this.props;
    setActiveQuiz(quiz_id);
  };

  getQuizResults = () => {
    const { quiz_id, getQuizResults } = this.props;
    getQuizResults(quiz_links.getFinalResult(quiz_id), quiz_id);
  };

  render() {
    const {
      fetch_quiz_details_requested,
      fetch_quiz_details_failed,
      fetch_quiz_details_error,
      active_quiz,
      getQuizResults,
      show_quiz_answers,
      attempts_by_quiz_id,
      quiz_id,
      attempt_details_by_uri,
      fetchAttemptsDetails,
      fetch_attempt_details_requested,
      selected_attempt_reference,
      hideQuizAnswers
    } = this.props;
    const { instructions } = this.state;

    let tiles = instructions && [
      {
        primary: instructions.totalQuestions,
        secondary: "No of Questions"
      },
      {
        primary: instructions.totalMarks,
        secondary: "Total Marks Allotted"
      },
      {
        primary: instructions.duration,
        secondary: "Time"
      },
      {
        primary: `${instructions.totalNoOfAttempts -
          instructions.remainingAttempts} / ${instructions.totalNoOfAttempts}`,
        secondary: "Attempts"
      }
    ];

    return (
      <div className="course-module-content__quiz-content">
        <Loader loading={fetch_quiz_details_requested} is_component={true} />
        {get(fetch_quiz_details_error, "error_code") === ATTEMPT_EXHAUSTED ? (
          show_quiz_answers ? (
            <div className="quiz">
              <QuizAnswers
                loading={fetch_attempt_details_requested}
                attempts={get(attempts_by_quiz_id[quiz_id], "attempts")}
                attempt_details_by_uri={attempt_details_by_uri}
                fetchAttemptsDetails={fetchAttemptsDetails}
                selected_attempt_reference={selected_attempt_reference}
                hideQuizAnswers={hideQuizAnswers}
              />
            </div>
          ) : (
            <AttemptExhausted
              error={fetch_quiz_details_error}
              viewAnswers={this.getQuizResults}
            />
          )
        ) : (
          <Fragment>
            {tiles && (
              <div className="course-module-content__quiz-tiles">
                <CourseContentTiles tiles={tiles} />
              </div>
            )}
            {this.renderInstructions(instructions)}
            <div className="course-module-content__content-actions course-module-content__content-actions--quiz">
              {!active_quiz.active_quiz_id ? (
                <Button variant="primary" size="md" onClick={this.startQuiz}>
                  Start
                </Button>
              ) : (
                <p>Another quiz is running</p>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(QuizDetailsContainer(QuizDetails));

import React, { Component } from "react";
import { Button } from "../../../../../../components/Buttons/Button";
import CircularProgressBar from "../../../../../../components/ProgressBar/circularProgressBar";
import { CloseIcon } from "../../../../../../../common/images/index";
import { quiz_links } from "../../../../../../../common/api/quizLinks";
import QuizDetailsContainer from "../../../../containers/course/quizDetails";

class QuizResult extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fetch_quiz_details_failed } = this.props;
    if (
      fetch_quiz_details_failed &&
      fetch_quiz_details_failed !== prevProps.fetch_quiz_details_failed
    ) {
      this.props.retakeQuiz();
    }
  }

  getTitleText = attempts_remaining => {
    if (attempts_remaining > 1)
      return `You have  ${attempts_remaining} attempts left`;
    return `You have  ${attempts_remaining} attempt left`;
  };

  onRetakeQuiz = () => {
    const {
      quiz_id,
      instructions_by_id,
      getQuizInstructions
    } = this.props;


    // let quiz_id_value = from_quiz_bar ? active_quiz_id : quiz_id;
    let instructions = instructions_by_id[quiz_id];
    if (!instructions)
      getQuizInstructions(quiz_links.getInstructionsLink(quiz_id), quiz_id);
    else if (instructions && instructions.remainingAttempts === 0) {
      this.props.retakeQuiz();
    } else {
      this.props.showDialog({
        title: this.getTitleText(instructions.remainingAttempts),
        subtitle: "Are you sure you want to take the quiz ?",
        yesButton: {
          text: "Yes",
          onClick: () => {
            this.props.retakeQuiz();
            return true;
          }
        },
        noButton: {
          text: "No"
        },
        items_centered: true
      });
    }
  };

  render() {
    const {
      abstract_quiz_results,
      getQuizAnswers,
      from_quiz_bar,
      closeQuizResults
    } = this.props;
    const user_score =
      abstract_quiz_results && abstract_quiz_results.user_score;
    const total_score =
      abstract_quiz_results && abstract_quiz_results.total_score;
    const percentage = (user_score / total_score) * 100;
    const display_score =
      Object.keys(abstract_quiz_results).length > 0
        ? `${user_score} / ${total_score}`
        : "0 / 0";
    return (
      <div className="quiz__results">
        {from_quiz_bar && (
          <CloseIcon className="quiz__close-icon" onClick={closeQuizResults} />
        )}
        <h4 className="quiz__results--title">Congratulations!</h4>
        <p className="quiz__results--message">
          You have successfully completed quiz
        </p>
        <p className="quiz__results--score">You have Scored</p>
        <CircularProgressBar
          percentage={percentage}
          display_value={display_score}
        />
        <div className="quiz__actions-wrapper">
          <Button
            variant="outline-primary"
            size="md"
            className="quiz__actions-wrapper--1"
            onClick={this.onRetakeQuiz}
          >
            Retake Test
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() =>
              getQuizAnswers(abstract_quiz_results._links.lock_quiz)
            }
          >
            View Answers
          </Button>
        </div>
      </div>
    );
  }
}

export default QuizDetailsContainer(QuizResult);

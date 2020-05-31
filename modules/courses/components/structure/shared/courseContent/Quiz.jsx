import React, { Component, Fragment } from "react";
import { quiz_links } from "../../../../../../../common/api/quizLinks";
import QuizQuestionCard from "./QuizQuestionCard";
import { Button } from "../../../../../../components/Buttons/Button";

import QuizContainer from "../../../../containers/course/quiz";
import Loader from "../../../../../../components/Loader";
import { ProgressBar } from "../../../../../../components/ProgressBar/horizontalProgressBar";

import cx from "classnames";
import { FullScreenIcon } from "../../../../../../../common/images";
import { ACTIVE_QUIZ_ID } from "../../../../../../../common/utils/constants";
import { getLocalStorage } from "../../../../../../../common/utils/storage";
import QuizResult from "./QuizResult";
import QuizAnswers from "./QuizAnswers";
import get from "lodash/get";
import { hideQuizAnswers } from "../../../../modules/quiz/redux/actions";
import { withRouter } from "react-router-dom";

class Quiz extends Component {
  componentDidMount() {
    const { getQuizQuestions, active_quiz } = this.props;
    const quiz_id = getLocalStorage(ACTIVE_QUIZ_ID, false);

    if (!quiz_id) return console.log("Quiz Id not found");

    if (active_quiz.id) return console.log("Questions already loaded");

    let quiz_questions_link = quiz_links.getQuestionsLink(quiz_id);
    getQuizQuestions(quiz_questions_link, quiz_id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      active_quiz,
      fetch_quiz_questions_succeeded,
      timerStart,
      time_left
    } = this.props;

    if (
      fetch_quiz_questions_succeeded &&
      fetch_quiz_questions_succeeded !==
        prevProps.fetch_quiz_questions_succeeded
    ) {
      timerStart(active_quiz.remaining_duration);
    }

    if (time_left === 0 && prevProps.time_left !== 0) {
      this.onSubmit();
    }
  }

  onOptionSelect = answered_question => {
    const { selectOption, selectOptionForQuestion } = this.props;
    selectOption(answered_question.question_id, answered_question.option.id);
    selectOptionForQuestion(answered_question.option._links.answer);
  };

  getProgressWidth = () => {
    const { time_left, active_quiz } = this.props;
    if (!active_quiz.id) return;
    let progress = time_left
      ? (
          ((active_quiz.duration - time_left) / active_quiz.duration) *
          100
        ).toString() + "%"
      : 0;
    return progress;
  };

  onSubmit = () => {
    const {
      submitQuiz,
      active_quiz,
      timerStop,
      match: {
        params: { course_code }
      }
    } = this.props;
    let resLink = quiz_links.getAbstractResult(active_quiz.id);
    submitQuiz(active_quiz._links.submit, resLink, course_code);
    timerStop();
  };

  getQuizAnswers = lock_link => {
    const { active_quiz, lockAndGetQuizResults, showDialog } = this.props;
    showDialog({
      title: "Are you sure do you want to view the answers ?",
      subtitle:
        "Note: Viewing answers will lock the quiz, and you cant take this quiz later",
      yesButton: {
        text: "Yes",
        onClick: () => {
          lockAndGetQuizResults(
            quiz_links.getFinalResult(active_quiz.active_quiz_id),
            active_quiz.active_quiz_id,
            lock_link
          );
          this.setState({ is_answers_view: true });
          return true;
        }
      },
      noButton: {
        text: "No"
      }
    });
  };

  retakeQuiz = () => {
    const {
      quiz_id,
      getQuizQuestions,
      hideQuizAnswers,
      setQuizOver,
      getQuizInstructions
    } = this.props;

    let quiz_questions_link = quiz_links.getQuestionsLink(quiz_id);
    getQuizQuestions(quiz_questions_link, quiz_id);
    hideQuizAnswers();
    getQuizInstructions(quiz_links.getInstructionsLink(quiz_id), quiz_id);
    setQuizOver();
  };

  closeQuizResults = () => {
    this.props.removeActiveQuiz();
  };

  render() {
    const {
      active_quiz,
      selected_options,
      minutes_left,
      seconds_left,
      fetch_quiz_questions_requested,
      from_quiz_bar,
      toggleQuiz,
      abstract_quiz_results,
      fetch_quiz_answers_requested,
      attempts_by_quiz_id,
      show_quiz_answers,
      quiz_over,
      fetch_attempt_details_requested,
      attempt_details_by_uri,
      fetchAttemptsDetails,
      quiz_id,
      selected_attempt_reference,
      showDialog,
      hideQuizAnswers
    } = this.props;

    return (
      <div className={cx("quiz", { "quiz--quiz-bar": from_quiz_bar })}>
        <Loader loading={fetch_quiz_questions_requested} is_component={true} />
        {quiz_over ? (
          show_quiz_answers ? (
            <QuizAnswers
              loading={fetch_attempt_details_requested}
              attempts={get(attempts_by_quiz_id[quiz_id], "attempts")}
              attempt_details_by_uri={attempt_details_by_uri}
              fetchAttemptsDetails={fetchAttemptsDetails}
              selected_attempt_reference={selected_attempt_reference}
              closeQuizResults={this.closeQuizResults}
              from_quiz_bar={from_quiz_bar}
              hideQuizAnswers={hideQuizAnswers}
            />
          ) : (
            <QuizResult
              getQuizAnswers={this.getQuizAnswers}
              abstract_quiz_results={abstract_quiz_results}
              retakeQuiz={this.retakeQuiz}
              from_quiz_bar={from_quiz_bar}
              closeQuizResults={this.closeQuizResults}
              showDialog={showDialog}
              quiz_id={quiz_id}
            />
          )
        ) : (
          <Fragment>
            <div className="quiz__header">
              <div className="quiz__header-info-wrapper">
                <div className="quiz__title">Questions</div>
                <div className="quiz__timer-wrapper">
                  <span className="quiz__timer-text"> Time Left :</span>
                  {!(minutes_left === "00" && seconds_left === "00") ? (
                    <span className="quiz__timer-time">
                      {" "}
                      {minutes_left}M : {seconds_left}S{" "}
                    </span>
                  ) : (
                    <span className="quiz__timer-time">
                      {" "}
                      {"- - "} : {" - -"}
                    </span>
                  )}
                </div>
                {from_quiz_bar && (
                  <div className="quiz__action-wrapper">
                    <FullScreenIcon
                      className="quiz-bar__action-icon"
                      onClick={toggleQuiz}
                    />
                  </div>
                )}
              </div>
              <ProgressBar width={this.getProgressWidth()} />
            </div>
            <div className="quiz__content">
              {active_quiz.id &&
                active_quiz.questions.map((question, index) => (
                  <QuizQuestionCard
                    question={question}
                    index={index}
                    onOptionSelect={this.onOptionSelect}
                    selected_option={selected_options[question.id]}
                    quiz_active
                  />
                ))}
            </div>
            <div className="quiz__footer">
              <Button variant="primary" size="md" onClick={this.onSubmit}>
                Submit
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default QuizContainer(withRouter(Quiz));

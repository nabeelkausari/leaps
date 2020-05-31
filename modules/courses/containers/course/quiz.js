import { connect } from "react-redux";
import {
  getQuizQuestions,
  selectOptionForQuestion,
  timerStart,
  timerStop,
  selectOptionInternal,
  submitQuiz,
  getActiveQuiz,
  lockAndGetQuizResults,
  fetchAttemptsDetails,
  hideQuizAnswers,
  setQuizOver,
  removeActiveQuiz,
  getQuizInstructions
} from "../../modules/quiz/redux/actions";

import { pad } from "../../../../../common/utils/pad";
import { dialogs } from "../../../toPublish/Dialog";

const mapStateToProps = (state, props) => {
  const {
    quiz: {
      fetch_quiz_questions_succeeded,
      fetch_quiz_questions_requested,
      active_quiz,
      time_left,
      abstract_quiz_results,
      fetch_quiz_answers_requested,
      attempts_by_quiz_id,
      show_quiz_answers,
      quiz_over,
      attempt_details_by_uri,
      fetch_attempt_details_requested,
      selected_attempt_reference
    }
  } = state;

  const minutes_left = pad(Math.floor(time_left / 60) || 0, 2);
  const seconds_left = pad(time_left % 60 || 0, 2);
  return {
    fetch_quiz_questions_succeeded,
    fetch_quiz_questions_requested,
    selected_options: active_quiz.selected_options,
    time_left,
    minutes_left,
    seconds_left,
    active_quiz,
    abstract_quiz_results,
    fetch_quiz_answers_requested,
    attempts_by_quiz_id,
    show_quiz_answers,
    quiz_over,
    attempt_details_by_uri,
    fetch_attempt_details_requested,
    selected_attempt_reference
  };
};

export default connect(mapStateToProps, {
  getQuizQuestions,
  submitQuiz,
  selectOptionForQuestion,
  selectOption: selectOptionInternal,
  timerStart,
  timerStop,
  getActiveQuiz,
  lockAndGetQuizResults,
  showDialog: dialogs.show,
  fetchAttemptsDetails,
  hideQuizAnswers,
  setQuizOver,
  removeActiveQuiz,
  getQuizInstructions
});

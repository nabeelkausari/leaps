import { connect } from "react-redux";
import {
  getQuizInstructions,
  timerStart,
  timerStop,
  setActiveQuiz,
  lockAndGetQuizResults,
  getQuizResults,
  fetchAttemptsDetails,
    hideQuizAnswers
} from "../../modules/quiz/redux/actions";
import { dialogs } from "../../../toPublish/Dialog";

const mapStateToProps = (state, props) => {
  const {
    quiz: {
      fetch_quiz_details_succeeded,
      fetch_quiz_details_requested,
      fetch_quiz_details_failed,
      fetch_quiz_details_error,
      instructions_by_id,
      active_quiz,
      show_quiz_answers,
      attempts_by_quiz_id,
      attempt_details_by_uri,
      fetch_attempt_details_requested,
      selected_attempt_reference
    }
  } = state;

  return {
    instructions_by_id,
    fetch_quiz_details_succeeded,
    fetch_quiz_details_requested,
    active_quiz,
    fetch_quiz_details_failed,
    fetch_quiz_details_error,
    show_quiz_answers,
    attempts_by_quiz_id,
    attempt_details_by_uri,
    fetch_attempt_details_requested,
    selected_attempt_reference
  };
};

export default connect(mapStateToProps, {
  getQuizInstructions,
  timerStart,
  timerStop,
  setActiveQuiz,
  getQuizResults,
  fetchAttemptsDetails,
  showDialog: dialogs.show,
  hideQuizAnswers
});

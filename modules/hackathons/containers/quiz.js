import { connect } from "react-redux";
import {
  fetchQuiz,
  fetchQuizInstruction,
  fetchSingleHackathon,
  selectQuizOption,
  setActiveQuizFullScreen,
  minimizeActiveQuiz,
  selectQuizOptionInternal
} from "../redux/actions";
import get from "lodash/get";

const mapStateToProps = (state, props) => {
  const {
    hackathon: {
      by_id,
      fetch_hackathon_list_succeeded,
      fetch_hackathon_list_requested,
      active_quiz,
      fetch_quiz_instructions_requested,
      fetch_quiz_instructions_succeeded,
      fetch_quiz_requested
    }
  } = state;
  const current_hackathon_id = get(props, "match.params.hackathon_id");
  const current_hackathon = by_id[current_hackathon_id];
  const current_quiz = get(current_hackathon, "quiz_details[0]");

  return {
    fetch_hackathon_list_succeeded,
    current_hackathon,
    current_quiz,
    hackathon_requested: fetch_hackathon_list_requested,
    selected_options: active_quiz.selected_options,
    details: active_quiz.instructions_details,
    instructions_loading: fetch_quiz_instructions_requested,
    instructions_loaded: fetch_quiz_instructions_succeeded,
    fullscreen: active_quiz.fullscreen,
    questions: active_quiz.questions.questions || [],
    quiz_loading: fetch_quiz_requested || !active_quiz.questions.questions
  };
};

export default connect(mapStateToProps, {
  setActiveQuizFullScreen,
  minimizeActiveQuiz,
  fetchQuiz,
  fetchQuizInstruction,
  selectQuizOption,
  selectQuizOptionInternal,
  fetchSingleHackathon
});

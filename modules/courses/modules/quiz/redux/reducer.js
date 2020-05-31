import * as types from "./types";

const initialState = {
  fetch_quiz_details_requested: null,
  fetch_quiz_details_succeeded: null,
  fetch_quiz_details_failed: null,

  fetch_quiz_questions_requested: null,
  fetch_quiz_questions_succeeded: null,
  fetch_quiz_questions_failed: null,

  instructions_by_id: {},

  show_quiz_answers: null,
  quiz_over: null,

  active_quiz: {
    selected_options: {},
    show_quiz_result: null,
    id: null,
    active_quiz_id: null
  },

  quiz_timer_active: false,
  quiz_timer_stopped: null,
  time_left: null,

  abstract_quiz_results: {},
  fetch_quiz_result_requested: null,
  fetch_quiz_result_succeeded: null,
  fetch_quiz_result_failed: null,

  attempts_by_quiz_id: {},
  fetch_quiz_attempts_requested: null,
  fetch_quiz_attempts_succeeded: null,
  fetch_quiz_attempts_failed: null,

  selected_attempt_reference: null,

  attempt_details_by_uri: {},
  fetch_attempt_details_requested: null,
  fetch_attempt_details_succeeded: null,
  fetch_attempt_details_failed: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_QUIZ_DETAILS_REQUESTED:
      return {
        ...state,
        fetch_quiz_details_requested: true,
        fetch_quiz_details_succeeded: null,
        fetch_quiz_details_failed: null,
        fetch_quiz_details_error: null
      };
    case types.FETCH_QUIZ_DETAILS_SUCCEEDED:
      return {
        ...state,
        fetch_quiz_details_requested: null,
        fetch_quiz_details_succeeded: true,
        fetch_quiz_details_failed: false,
        instructions_by_id: { ...state.instructions_by_id, ...payload }
      };
    case types.FETCH_QUIZ_DETAILS_FAILED:
      return {
        ...state,
        fetch_quiz_details_requested: null,
        fetch_quiz_details_succeeded: false,
        fetch_quiz_details_failed: true,
        fetch_quiz_details_error: payload.error,
        instructions_by_id: {}
      };

    case types.FETCH_QUIZ_QUESTIONS_REQUESTED:
      return {
        ...state,
        fetch_quiz_questions_requested: true,
        fetch_quiz_questions_succeeded: null,
        fetch_quiz_questions_failed: null
      };
    case types.FETCH_QUIZ_QUESTIONS_SUCCEEDED:
      return {
        ...state,
        fetch_quiz_questions_requested: null,
        fetch_quiz_questions_succeeded: true,
        fetch_quiz_questions_failed: false,
        active_quiz: { ...state.active_quiz, ...payload }
      };
    case types.FETCH_QUIZ_QUESTIONS_FAILED:
      return {
        ...state,
        fetch_quiz_questions_requested: null,
        fetch_quiz_questions_succeeded: false,
        fetch_quiz_questions_failed: true
      };

    case types.FETCH_QUIZ_RESULT_REQUESTED:
      return {
        ...state,
        fetch_quiz_result_requested: true,
        fetch_quiz_result_succeeded: null,
        fetch_quiz_result_failed: null
      };
    case types.FETCH_QUIZ_RESULT_SUCCEEDED:
      return {
        ...state,
        fetch_quiz_result_requested: null,
        fetch_quiz_result_succeeded: true,
        fetch_quiz_result_failed: false,
        abstract_quiz_results: payload
      };
    case types.FETCH_QUIZ_RESULT_FAILED:
      return {
        ...state,
        fetch_quiz_result_requested: null,
        fetch_quiz_result_succeeded: false,
        fetch_quiz_result_failed: true
      };

    case types.FETCH_ALL_QUIZ_ATTEMPTS_REQUESTED:
      return {
        ...state,
        fetch_quiz_attempts_requested: true,
        fetch_quiz_attempts_succeeded: null,
        fetch_quiz_attempts_failed: null
      };
    case types.FETCH_ALL_QUIZ_ATTEMPTS_SUCCEEDED:
      return {
        ...state,
        attempts_by_quiz_id: { ...state.attempts_by_quiz_id, ...payload },
        fetch_quiz_attempts_requested: null,
        fetch_quiz_attempts_succeeded: true,
        fetch_quiz_attempts_failed: false
      };
    case types.FETCH_ALL_QUIZ_ATTEMPTS_FAILED:
      return {
        ...state,
        fetch_quiz_answers_requested: null,
        fetch_quiz_answers_succeeded: false,
        fetch_quiz_answers_failed: payload
      };

    case types.QUIZ_TIMER_START:
      return {
        ...state,
        quiz_timer_active: true,
        quiz_timer_stopped: null,
        time_left: payload
      };

    case types.QUIZ_TIMER_TICK:
      return {
        ...state,
        time_left: payload
      };

    case types.QUIZ_TIMER_STOP:
      return {
        ...state,
        quiz_timer_active: false,
        quiz_timer_stopped: true,
        time_left: null
      };

    case types.SET_ACTIVE_QUIZ:
      return {
        ...state,
        active_quiz: {
          ...state.active_quiz,
          active_quiz_id: payload
        }
      };

    case types.SHOW_QUIZ_RESULT:
      return {
        ...state,
        active_quiz: {
          ...state.active_quiz,
          show_quiz_result: true
        }
      };

    case types.REMOVE_ACTIVE_QUIZ:
      return {
        ...state,
        active_quiz: {
          selected_options: {},
          show_quiz_result: null
        }
      };

    case types.SET_ANSWER_TO_QUESTION:
      return {
        ...state,
        active_quiz: {
          ...state.active_quiz,
          selected_options: {
            ...state.active_quiz.selected_options,
            [payload.question_id]: payload.option_id
          }
        }
      };

    case types.SHOW_QUIZ_ANSWERS:
      return {
        ...state,
        show_quiz_answers: true
      };

    case types.HIDE_QUIZ_ANSWERS:
      return {
        ...state,
        show_quiz_answers: false
      };

    case types.FETCH_ATTEMPT_DETAILS_REQUESTED:
      return {
        ...state,
        fetch_attempt_details_requested: true,
        fetch_attempt_details_succeeded: null,
        fetch_attempt_details_failed: null
      };

    case types.FETCH_ATTEMPT_DETAILS_SUCCEEDED:
      return {
        ...state,
        fetch_attempt_details_requested: false,
        fetch_attempt_details_succeeded: true,
        fetch_attempt_details_failed: false,
        attempt_details_by_uri: { ...state.attempt_details_by_uri, ...payload }
      };

    case types.FETCH_ATTEMPT_DETAILS_FAILED:
      return {
        ...state,
        fetch_attempt_details_requested: false,
        fetch_attempt_details_succeeded: false,
        fetch_attempt_details_failed: payload
      };

    case types.SET_QUIZ_OVER:
      return {
        ...state,
        quiz_over: payload
      };

    case types.SET_ATTEMPT_REFERENCE:
      return {
        ...state,
        selected_attempt_reference: payload
      };

    case types.RESET_ACTIVE_QUIZ:
      return {
        ...state,
        active_quiz: {
          selected_options: {},
          show_quiz_result: null,
          id: null,
          active_quiz_id: null
        }
      };

    case types.UPDATE_QUIZ_ATTEMPT:
      return {
        ...state,
        instructions_by_id: {
          ...state.instructions_by_id,
          [payload]: {
            ...state.instructions_by_id[payload],
            remainingAttempts:
              state.instructions_by_id[payload].remainingAttempts - 1
          }
        }
      };

    default:
      return state;
  }
};

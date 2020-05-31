import * as types from "./types";
import { byId } from "../../../../common/utils/byUri";

const initialState = {
  list: [],
  by_id: {},
  fetch_hackathon_list_requested: null,
  fetch_hackathon_list_succeeded: null,
  fetch_hackathon_list_failed: null,

  fetch_quiz_instructions_requested: null,
  fetch_quiz_instructions_succeeded: null,
  fetch_quiz_instructions_failed: null,

  fetch_quiz_requested: null,
  fetch_quiz_succeeded: null,
  fetch_quiz_failed: null,

  active_quiz: {
    instructions_details: {},
    questions: {},
    full_screen: false,
    selected_options: {}
  },
  submission_list: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_HACKATHON_LIST_REQUESTED:
      return {
        ...state,
        fetch_hackathon_list_requested: true,
        fetch_hackathon_list_succeeded: null,
        fetch_hackathon_list_failed: null
      };
    case types.FETCH_HACKATHON_LIST_SUCCEEDED:
      return {
        ...state,
        list: payload,
        by_id: byId(payload, "hackathon_id"),
        fetch_hackathon_list_requested: false,
        fetch_hackathon_list_succeeded: true
      };
    case types.FETCH_HACKATHON_LIST_FAILED:
      return {
        ...state,
        fetch_hackathon_list_requested: false,
        fetch_hackathon_list_succeeded: false,
        fetch_hackathon_list_failed: payload
      };
    case types.UPDATE_HACKATHON:
      return {
        ...state,
        list: [
          ...state.list.filter(h => h.hackathon_id !== payload.hackathon_id),
          payload
        ]
      };
    case types.SUBMISSION_LIST:
      return {
        ...state,
        submission_list: payload
      };

    case types.FETCH_HACKATHON_QUIZ_OPTION_SELECTED:
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

    case types.FETCH_HACKATHON_QUIZ_INSTRUCTIONS_REQUESTED:
      return {
        ...state,
        fetch_quiz_instructions_requested: true,
        fetch_quiz_instructions_succeeded: null,
        fetch_quiz_instructions_failed: null
      };

    case types.FETCH_HACKATHON_QUIZ_INSTRUCTIONS_SUCCEEDED:
      return {
        ...state,
        fetch_quiz_instructions_requested: false,
        fetch_quiz_instructions_succeeded: true,
        fetch_quiz_instructions_failed: false,
        active_quiz: {
          ...state.active_quiz,
          instructions_details: payload
        }
      };

    case types.FETCH_HACKATHON_QUIZ_INSTRUCTIONS_FAILED:
      return {
        ...state,
        fetch_quiz_instructions_requested: false,
        fetch_quiz_instructions_succeeded: false,
        fetch_quiz_instructions_failed: true
      };

    case types.FETCH_HACKATHON_QUIZ_REQUESTED:
      return {
        ...state,
        fetch_quiz_requested: true,
        fetch_quiz_succeeded: null,
        fetch_quiz_failed: null
      };

    case types.FETCH_HACKATHON_QUIZ_SUCCEEDED:
      return {
        ...state,
        fetch_quiz_requested: false,
        fetch_quiz_succeeded: true,
        fetch_quiz_failed: false,
        active_quiz: {
          ...state.active_quiz,
          questions: payload
        }
      };

    case types.FETCH_HACKATHON_QUIZ_FAILED:
      return {
        ...state,
        fetch_quiz_requested: false,
        fetch_quiz_succeeded: false,
        fetch_quiz_failed: true
      };

    case types.SET_ACTIVE_QUIZ_FULL_SCREEN:
      return {
        ...state,
        active_quiz: {
          ...state.active_quiz,
          fullscreen: true
        }
      };

    case types.MINIMIZE_ACTIVE_QUIZ:
      return {
        ...state,
        active_quiz: {
          ...state.active_quiz,
          fullscreen: false
        }
      };

    default:
      return state;
  }
};

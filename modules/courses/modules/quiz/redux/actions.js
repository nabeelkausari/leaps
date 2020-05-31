import { fetchLink, fetchLinkAs } from "../../../../../../common/api/helpers";
import * as types from "./types";
import {
  setLocalStorage,
  getLocalStorage,
  removeLoacalStorage
} from "../../../../../../common/utils/storage";
import { ACTIVE_QUIZ_ID } from "../../../../../../common/utils/constants";
import { notify } from "../../../../../../common/utils/notification";
import { updateQuizCompleteion } from "../../courseModules/redux/actions";
import { updateAsCourseStarted } from "../../../redux/actions";

export const getQuizInstructions = (link, quiz_id) => (dispatch, getState) => {
  dispatch({ type: types.FETCH_QUIZ_DETAILS_REQUESTED });
  fetchLinkAs(link)
    .then(quiz_details => {
      dispatch({
        type: types.FETCH_QUIZ_DETAILS_SUCCEEDED,
        payload: { [quiz_id]: quiz_details }
      });
    })

    .catch(error => {
      dispatch({
        type: types.FETCH_QUIZ_DETAILS_FAILED,
        payload: { error, quiz_id }
      });
    });
};

export const checkForActiveQuiz = (link, quiz_id) => (dispatch, getState) => {
  fetchLinkAs(link)
    .then(payload => {
      if (payload.remaining_duration === 0) {
        dispatch(removeActiveQuiz());
        alert("quiz was over");
      } else {
        dispatch(setActiveQuiz(quiz_id));
        dispatch(timerStart(payload.remaining_duration));
        dispatch({ type: types.FETCH_QUIZ_QUESTIONS_SUCCEEDED, payload });
      }
    })

    .catch(error => {
      dispatch({ type: types.FETCH_QUIZ_QUESTIONS_FAILED });
      console.log(error);
    });
};

export const setActiveQuiz = quiz_id => (dispatch, getState) => {
  setLocalStorage(ACTIVE_QUIZ_ID, quiz_id);
  dispatch({ type: types.SET_ACTIVE_QUIZ, payload: quiz_id });
};

export const getActiveQuiz = () => () => {
  return getLocalStorage(ACTIVE_QUIZ_ID, false);
};

export const removeActiveQuiz = () => (dispatch, getState) => {
  dispatch({ type: types.REMOVE_ACTIVE_QUIZ });
  removeLoacalStorage(ACTIVE_QUIZ_ID);
};

export const getQuizQuestions = (link, quiz_id) => (dispatch, getState) => {
  dispatch({ type: types.FETCH_QUIZ_QUESTIONS_REQUESTED });
  fetchLinkAs(link)
    .then(payload => {
      dispatch({ type: types.FETCH_QUIZ_QUESTIONS_SUCCEEDED, payload });
    })

    .catch(error => {
      dispatch({ type: types.FETCH_QUIZ_QUESTIONS_FAILED });
      notify.error("Failed to Load Questions", error.message);
      dispatch(removeActiveQuiz());
    });
};

export const getQuizResultById = link => (dispatch, getState) => {
  dispatch({ type: types.FETCH_QUIZ_RESULT_REQUESTED });
  fetchLinkAs(link)
    .then(payload => {
      dispatch({ type: types.FETCH_QUIZ_RESULT_SUCCEEDED, payload });
      dispatch({ type: types.SHOW_QUIZ_RESULT });
    })

    .catch(error => {
      dispatch({ type: types.FETCH_QUIZ_RESULT_FAILED });
      console.log(error);
    });
};

export const lockAndGetQuizResults = (link, quiz_id, lock_link) => (
  dispatch,
  getState
) => {
  dispatch({ type: types.FETCH_ALL_QUIZ_ATTEMPTS_REQUESTED });

  fetchLink(lock_link)
    .then(() => {
      fetchLinkAs(link).then(results => {
        dispatch({
          type: types.FETCH_ALL_QUIZ_ATTEMPTS_SUCCEEDED,
          payload: { [quiz_id]: results }
        });
        dispatch(showQuizAnswers());
        dispatch(fetchAttemptsDetails(results.attempts[0]));
      });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_ALL_QUIZ_ATTEMPTS_FAILED });
      console.log(error);
    });
};
export const getQuizResults = (link, quiz_id, lock_link) => (
  dispatch,
  getState
) => {
  dispatch({ type: types.FETCH_ALL_QUIZ_ATTEMPTS_REQUESTED });
  fetchLinkAs(link)
    .then(results => {
      dispatch({
        type: types.FETCH_ALL_QUIZ_ATTEMPTS_SUCCEEDED,
        payload: { [quiz_id]: results }
      });
      dispatch(showQuizAnswers());
      dispatch(fetchAttemptsDetails(results.attempts[0]));
    })
    .catch(error => {
      dispatch({ type: types.FETCH_ALL_QUIZ_ATTEMPTS_FAILED });
      console.log(error);
    });
};

export const submitQuiz = (link, resLink, course_code) => (
  dispatch,
  getState
) => {
  fetchLink(link)
    .then(() => {
      dispatch(getQuizResultById(resLink));
      dispatch(setQuizOver(true));
      dispatch(updateQuizAttempt());
      dispatch(updateQuizCompleteion());
      dispatch(updateAsCourseStarted(course_code));
    })
    .catch(error => console.log(error));
};

const updateQuizAttempt = () => (dispatch, getState) => {
  const {
    quiz: {
      active_quiz: { id }
    }
  } = getState();
  dispatch({ type: types.UPDATE_QUIZ_ATTEMPT, payload: id });
};

export const lockQuiz = link => () => {
  fetchLink(link);
};

export const selectOptionInternal = (question_id, option_id) => (
  dispatch,
  getState
) => {
  dispatch({
    type: types.SET_ANSWER_TO_QUESTION,
    payload: { question_id, option_id }
  });
};

export const resetQuiz = () => (dispatch, getState) => {
  dispatch(removeActiveQuiz());
  dispatch(hideQuizAnswers());
  dispatch(setQuizOver(false));
  dispatch({ type: types.RESET_ACTIVE_QUIZ });
};

export const selectOptionForQuestion = link => (dispatch, getState) => {
  fetchLink(link).catch(error => {
    notify.error("Quiz Over", error);
  });
};

let timer = null;

export const timerStart = time_in_seconds => (dispatch, getState) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick(time_in_seconds--)), 1000);
  dispatch({ type: types.QUIZ_TIMER_START, payload: time_in_seconds });
  dispatch(tick());
};

const tick = remaining_time => (dispatch, getState) => {
  dispatch({ type: types.QUIZ_TIMER_TICK, payload: remaining_time });
  if (!remaining_time) {
    dispatch(() => timerStop());
  }
};

export const timerStop = () => (dispatch, getState) => {
  clearInterval(timer);
  dispatch({ type: types.QUIZ_TIMER_STOP });
};

const showQuizAnswers = () => (dispatch, getState) => {
  dispatch({ type: types.SHOW_QUIZ_ANSWERS });
};

export const setQuizOver = payload => (dispatch, getState) => {
  dispatch({ type: types.SET_QUIZ_OVER, payload });
};
export const hideQuizAnswers = () => (dispatch, getState) => {
  dispatch({ type: types.HIDE_QUIZ_ANSWERS });
};
const setAttemptReference = attempt_reference => (dispatch, getState) => {
  dispatch({ type: types.SET_ATTEMPT_REFERENCE, payload: attempt_reference });
};

export const fetchAttemptsDetails = attempt => (dispatch, getState) => {
  const {
    quiz: { attempt_details_by_uri }
  } = getState();
  dispatch(setAttemptReference(attempt.href));
  if (attempt_details_by_uri[attempt.href]) return;

  dispatch({ type: types.FETCH_ATTEMPT_DETAILS_REQUESTED });
  fetchLink(attempt)
    .then(res => res.json())
    .then(payload => {
      dispatch({
        type: types.FETCH_ATTEMPT_DETAILS_SUCCEEDED,
        payload: { [attempt.href]: payload }
      });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_ATTEMPT_DETAILS_FAILED });
      notify.error("Failed to load answers of the quiz", error.message);
    });
};

import get from "lodash/get";
import * as types from "./types";
import { fetchLink, fetchLinkAs } from "../../../../common/api/helpers";
import { notify } from "../../../../common/utils/notification";

const get_hackathon_default = {
  href: "/hackathon/all",
  method: "GET"
};
const get_single_hackathon_default = id => ({
  href: `/hackathon/${id}`,
  method: "GET"
});

export const fetchHackathons = () => (dispatch, getState) => {
  const {
    auth: { is_logged_in },
    profile: { info }
  } = getState();
  const get_all_hackathon_link = get(info, "_links.get_hackathons");
  const link = is_logged_in ? get_all_hackathon_link : get_hackathon_default;
  dispatch({ type: types.FETCH_HACKATHON_LIST_REQUESTED });
  return fetchLinkAs(link)
    .then(payload => {
      dispatch({ type: types.FETCH_HACKATHON_LIST_SUCCEEDED, payload });
    })
    .catch(error =>
      dispatch({ type: types.FETCH_HACKATHON_LIST_FAILED, payload: error })
    );
};
export const fetchSingleHackathon = id => (dispatch, getState) => {
  const {
    auth: { is_logged_in },
    profile: { info }
  } = getState();
  const get_hackathon_by_id_link = get(info, "_links.get_hackathons_by_id");
  const temp_link = {
    ...get_hackathon_by_id_link,
    href: `${get(get_hackathon_by_id_link, "href")}${id}`
  };
  const link = is_logged_in ? temp_link : get_single_hackathon_default(id);
  dispatch({ type: types.FETCH_HACKATHON_LIST_REQUESTED });
  return fetchLinkAs(link)
    .then(payload => {
      dispatch({
        type: types.FETCH_HACKATHON_LIST_SUCCEEDED,
        payload: [payload]
      });
    })
    .catch(error =>
      dispatch({ type: types.FETCH_HACKATHON_LIST_FAILED, payload: error })
    );
};

export const enrollHackathon = hackathon => (dispatch, getState) => {
  const enroll_link = get(hackathon, "_links.enrol_hackathon");
  return fetchLinkAs(enroll_link)
    .then(payload => {
      notify.success("Enrolled Successfully");
      dispatch({
        type: types.UPDATE_HACKATHON,
        payload
      });
    })
    .catch(error => notify.error("Something went wrong", error.body.message));
};

export const unEnrollHackathon = hackathon => (dispatch, getState) => {
  const enroll_link = get(hackathon, "_links.unenrol_hackathon");
  return fetchLinkAs(enroll_link)
    .then(payload => {
      notify.success("Unenrolled Successfully");
      dispatch({
        type: types.UPDATE_HACKATHON,
        payload
      });
    })
    .catch(error => notify.error("Something went wrong", error.body.message));
};

export const fetchSubmissionList = link => (dispatch, getState) => {
  if (!link) return;
  return fetchLinkAs(link)
    .then(payload => {
      dispatch({
        type: types.SUBMISSION_LIST,
        payload
      });
    })
    .catch(error => {
      console.log("failed to load hackathon submission list");
    });
};

export const submitHackathon = (link, params) => (dispatch, getState) => {
  if (!link) return;
  fetchLink(link, params)
    .then(payload => {
      notify.success("Success", "Successfully submitted");
      dispatch(fetchSubmissionList());
    })
    .catch(error => {
      notify.error("Something went wrong", error.message);
    });
};

export const fetchQuizInstruction = link => (dispatch, getState) => {
  dispatch({ type: types.FETCH_HACKATHON_QUIZ_INSTRUCTIONS_REQUESTED });
  return fetchLinkAs(link)
    .then(payload => {
      dispatch({
        type: types.FETCH_HACKATHON_QUIZ_INSTRUCTIONS_SUCCEEDED,
        payload
      });
    })
    .catch(error => {
      console.log("Quiz Instructions Failed To Load :", error);
      notify.error("Quiz Instructions Failed To Load");
      dispatch({ type: types.FETCH_HACKATHON_QUIZ_INSTRUCTIONS_FAILED });
    });
};

export const fetchQuiz = link => (dispatch, getState) => {
  dispatch({ type: types.FETCH_HACKATHON_QUIZ_REQUESTED });

  fetchLinkAs(link)
    .then(payload => {
      dispatch({
        type: types.FETCH_HACKATHON_QUIZ_SUCCEEDED,
        payload
      });

      payload.questions.forEach(question =>
        dispatch(isOptionSelected(question))
      );
    })
    .catch(error => {
      console.log("Quiz Failed To Load : ", error);
      notify.error("Quiz Failed To Load");
      dispatch({ type: types.FETCH_HACKATHON_QUIZ_FAILED });
    });
};

const isOptionSelected = question => (dispatch, getState) => {
  question.options.forEach(option => {
    if (option.is_user_option) {
      dispatch(selectQuizOptionInternal(question.id, option.id));
    }
  });
};

export const selectQuizOptionInternal = (question_id, option_id) => (
  dispatch,
  getState
) => {
  dispatch({
    type: types.FETCH_HACKATHON_QUIZ_OPTION_SELECTED,
    payload: { question_id, option_id }
  });
};

export const selectQuizOption = answer_link => (dispatch, getState) => {
  fetchLink(answer_link).catch(error => notify.error(error.message));
};

export const setActiveQuizFullScreen = () => (dispatch, getState) => {
  dispatch({ type: types.SET_ACTIVE_QUIZ_FULL_SCREEN });
};

export const minimizeActiveQuiz = () => (dispatch, getState) => {
  dispatch({ type: types.MINIMIZE_ACTIVE_QUIZ });
};

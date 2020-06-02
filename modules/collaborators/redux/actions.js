import * as types from "./types";
import { fetchLinkAs } from "../../../common/api/helpers";
import { notify } from "../../../common/utils/notification";
import { API_GATEWAY_URI, APP_URL } from "../../../common/api/constants";

export const getAllCollaborators = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_COLLABORATORS_REQUESTED });
  const {
    profile: {
      info: { _links }
    }
  } = getState();
  const link = {
    ..._links.get_all_collaborators,
    type: "application/json"
  };
  return fetchLinkAs(link)
    .then(response => {
      dispatch({
        type: types.FETCH_COLLABORATORS_SUCCEEDED,
        payload: response
      });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_COLLABORATORS_FAILED, payload: error });
    });
};

export const getAllUsers = () => (dispatch, getState) => {
  const {
    profile: { info }
  } = getState();
  dispatch({ type: types.FETCH_ALL_USERS_REQUESTED });
  const link = {
    ...info._links.get_all_users,
    type: "application/json"
  };
  return fetchLinkAs(link)
    .then(response => {
      dispatch({ type: types.FETCH_ALL_USERS_SUCCEEDED, payload: response });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_ALL_USERS_FAILED, payload: error });
    });
};

export const addCollaborator = param => (dispatch, getState) => {
  const {
    cases: {
      current_case: {
        info: { _links }
      }
    }
  } = getState();
  dispatch({ type: types.ADD_COLLABORATORS_REQUESTED });
  return fetchLinkAs(_links.save_collaborators, param)
    .then(response => {
      dispatch({ type: types.ADD_COLLABORATORS_SUCCEEDED, payload: response });
      notify.success("Collaboration Settings Saved Successfully");
    })
    .catch(error => {
      dispatch({ type: types.ADD_COLLABORATORS_FAILED, payload: error });
      notify.error("Something went wrong", error.messages);
    });
};

export const getShareableLink = validityDays => (dispatch, getState) => {
  const {
    solve: { details }
  } = getState();
  dispatch({ type: types.GET_SHAREABLE_LINK_REQUESTED });
  let params = validityDays ? { validityDays } : {};

  return fetchLinkAs(details._links.create_dashboard_link_token, params)
    .then(response => {
      let link = `${APP_URL}/shared_dashboard/${response.code}`;
      dispatch({ type: types.GET_SHAREABLE_LINK_SUCCEEDED, payload: link });
      notify.success("Shareable link generated successfully");
    })
    .catch(error => {
      dispatch({ type: types.GET_SHAREABLE_LINK_FAILED, payload: error });
      notify.error("Something went wrong", error.messages);
    });
};

export const resetShareableLink = () => dispatch => {
  dispatch({ type: types.RESET_SHAREABLE_LINK });
};

export const getSharedDashboard = code => (dispatch, getState) => {
  dispatch({ type: types.GET_SHARED_DASHBOARD_REQUESTED });

  return fetch(
    `${API_GATEWAY_URI}/step/dashboard/getBySharedLink/?code=${code}`
  )
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: types.GET_SHARED_DASHBOARD_SUCCEEDED,
        payload: response
      });
    })
    .catch(error => {
      dispatch({ type: types.GET_SHARED_DASHBOARD_FAILED, payload: error });
      notify.error("Something went wrong", error.messages);
    });
};

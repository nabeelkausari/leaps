import * as types from "./types";

const initialState = {
  list: [],

  all_users: [],
  fetch_collaborators_requested: null,
  fetch_collaborators_succeeded: null,
  fetch_collaborators_failed: null,
  fetch_all_users_requested: null,
  fetch_all_users_succeeded: null,
  fetch_all_users_failed: null,
  add_collaborators_requested: null,
  add_collaborators_succeeded: null,
  add_collaborators_failed: null,
  shared_dashboard: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_COLLABORATORS_REQUESTED:
      return {
        ...state,
        fetch_collaborators_requested: true,
        fetch_collaborators_succeeded: null,
        fetch_collaborators_failed: null
      };

    case types.FETCH_COLLABORATORS_SUCCEEDED:
      return {
        ...state,
        list: [...payload],
        fetch_collaborators_requested: false,
        fetch_collaborators_succeeded: true,
        fetch_collaborators_failed: false
      };

    case types.FETCH_COLLABORATORS_FAILED:
      return {
        ...state,
        fetch_collaborators_requested: true,
        fetch_collaborators_succeeded: false,
        fetch_collaborators_failed: payload
      };
    case types.FETCH_ALL_USERS_REQUESTED:
      return {
        ...state,
        fetch_all_users_requested: true,
        fetch_all_users_succeeded: null,
        fetch_all_users_failed: null
      };

    case types.FETCH_ALL_USERS_SUCCEEDED:
      return {
        ...state,
        all_users: [...payload],
        fetch_all_users_requested: false,
        fetch_all_users_succeeded: true,
        fetch_all_users_failed: false
      };

    case types.FETCH_ALL_USERS_FAILED:
      return {
        ...state,
        fetch_all_users_requested: false,
        fetch_all_users_succeeded: true,
        fetch_all_users_failed: payload
      };

    case types.ADD_COLLABORATORS_REQUESTED:
      return {
        ...state,
        add_collaborators_requested: true,
        add_collaborators_succeeded: null,
        add_collaborators_failed: null
      };

    case types.ADD_COLLABORATORS_SUCCEEDED:
      return {
        ...state,
        add_collaborators_requested: false,
        add_collaborators_succeeded: true,
        add_collaborators_failed: false
      };

    case types.ADD_COLLABORATORS_FAILED:
      return {
        ...state,
        add_collaborators_requested: true,
        add_collaborators_succeeded: false,
        add_collaborators_failed: payload
      };

    case types.GET_SHAREABLE_LINK_REQUESTED:
      return {
        ...state,
        shareable_link_requested: true,
        shareable_link_succeeded: null,
        shareable_link_failed: null
      };

    case types.GET_SHAREABLE_LINK_SUCCEEDED:
      return {
        ...state,
        shareable_link_requested: false,
        shareable_link_succeeded: true,
        shareable_link_failed: false,
        shareable_link: payload
      };

    case types.GET_SHAREABLE_LINK_FAILED:
      return {
        ...state,
        shareable_link_requested: true,
        shareable_link_succeeded: false,
        shareable_link_failed: payload
      };

    case types.RESET_SHAREABLE_LINK:
      return {
        ...state,
        shareable_link: ""
      };

    case types.GET_SHARED_DASHBOARD_REQUESTED:
      return {
        ...state,
        shared_dashboard_requested: true,
        shared_dashboard_succeeded: null,
        shared_dashboard_failed: null
      };

    case types.GET_SHARED_DASHBOARD_SUCCEEDED:
      return {
        ...state,
        shared_dashboard_requested: false,
        shared_dashboard_succeeded: true,
        shared_dashboard_failed: false,
        shared_dashboard: payload.map(p => ({
          ...p,
          detail: JSON.parse(p.detail)
        }))
      };

    case types.GET_SHARED_DASHBOARD_FAILED:
      return {
        ...state,
        shared_dashboard_requested: true,
        shared_dashboard_succeeded: false,
        shared_dashboard_failed: payload
      };

    default:
      return state;
  }
};

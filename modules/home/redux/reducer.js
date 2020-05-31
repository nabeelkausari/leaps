import * as types from "./types";

const initialState = {
  webinars_loading: null,
  webinars_succeeded: null,
  webinars_error: null,
  enrol_webinar_loading: null,
  enrol_webinar_succeeded: null,
  enrol_webinar_error: null,
  unenrol_webinar_loading: null,
  unenrol_webinar_succeeded: null,
  unenrol_webinar_error: null,
  webinars: null
};

export default (state = initialState, { type, payload }) => {
  let webinar_index;
  let session_index;
  switch (type) {
    case types.FETCH_WEBINARS_REQUESTED:
      return {
        ...state,
        webinars_loading: true,
        webinars_succeeded: null
      };
    case types.FETCH_WEBINARS_SUCCEEDED:
      console.log("FETCH_WEBINARS_SUCCEEDED Called")
      return {
        ...state,
        webinars_loading: false,
        webinars_succeeded: true,
        webinars: payload
      };
    case types.FETCH_WEBINARS_FAILED:
      return {
        ...state,
        webinars_loading: false,
        webinars_succeeded: false,
        webinars_error: payload
      };

    case types.ENROL_WEBINAR_REQUESTED:
      return {
        ...state,
        enrol_webinar_loading: true,
        enrol_webinar_succeeded: null
      };
    case types.ENROL_WEBINAR_SUCCEEDED:
      webinar_index = state.webinars.findIndex(
        w => w.webinarId === payload.webinarId
      );
      session_index = state.webinars[webinar_index].sessions.findIndex(
        s => s.webinarSessionId === payload.webinarSessionId
      );
      return {
        ...state,
        enrol_webinar_loading: false,
        enrol_webinar_succeeded: true,
        webinars: [
          ...state.webinars.slice(0, webinar_index),
          {
            ...state.webinars[webinar_index],
            sessions: [
              ...state.webinars[webinar_index].sessions.slice(0, session_index),
              {
                ...state.webinars[webinar_index].sessions[session_index],
                enrolId: payload.enrolId
              },
              ...state.webinars[webinar_index].sessions.slice(session_index + 1)
            ]
          },
          ...state.webinars.slice(webinar_index + 1)
        ]
      };
    case types.ENROL_WEBINAR_FAILED:
      return {
        ...state,
        enrol_webinar_loading: false,
        enrol_webinar_succeeded: false,
        enrol_webinar_error: payload
      };

    case types.UNENROL_WEBINAR_REQUESTED:
      return {
        ...state,
        unenrol_webinar_loading: true,
        unenrol_webinar_succeeded: null
      };
    case types.UNENROL_WEBINAR_SUCCEEDED:
      webinar_index = state.webinars.findIndex(
        w => w.webinarId === payload.webinarId
      );
      session_index = state.webinars[webinar_index].sessions.findIndex(
        s => s.webinarSessionId === payload.webinarSessionId
      );
      return {
        ...state,
        unenrol_webinar_loading: false,
        unenrol_webinar_succeeded: true,
        webinars: [
          ...state.webinars.slice(0, webinar_index),
          {
            ...state.webinars[webinar_index],
            sessions: [
              ...state.webinars[webinar_index].sessions.slice(0, session_index),
              {
                ...state.webinars[webinar_index].sessions[session_index],
                enrolId: null
              },
              ...state.webinars[webinar_index].sessions.slice(session_index + 1)
            ]
          },
          ...state.webinars.slice(webinar_index + 1)
        ]
      };
    case types.UNENROL_WEBINAR_FAILED:
      return {
        ...state,
        unenrol_webinar_loading: false,
        unenrol_webinar_succeeded: false,
        unenrol_webinar_error: payload
      };

    default:
      return state;
  }
};

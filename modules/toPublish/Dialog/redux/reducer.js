import * as types from "./types";

const initialState = {
  is_open: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SHOW_DIALOG:
      return {
        ...state,
        is_open: true,
        ...payload
      };
    case types.HIDE_DIALOG:
      return {
        is_open: false
      };
    case types.CHANGE_CALLBACK:
      return {
        ...state,
        ...payload
      };
    // case types.REMOVE_COMPONENT:
    //   return {
    //     ...state,
    //     Component: null
    //   };

    default:
      return state;
  }
};

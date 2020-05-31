import * as types from "./types";

const module_initial_state = {
  name: "",
  description: "",
  sequence: 1,
  duration: null,
  prices: [
    {
      price: 0,
      discount: 0,
      currency: "INR"
    },
    {
      price: 0,
      discount: 0,
      currency: "USD"
    }
  ]
};

const initialState = {
  selected_course_code: null,
  selected_module_reference: null,
  selected_module_content_reference: null,
  loading: null,
  module: { ...module_initial_state }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.INITIATE_EDIT_COURSE:
      return {
        ...state,
        selected_course_code: payload
      };
    case types.SET_MODULE_REFERENCE:
      return {
        ...state,
        selected_module_reference: payload
      };
    case types.SET_MODULE_CONTENT_REFERENCE:
      return {
        ...state,
        selected_module_content_reference: payload
      };
    case types.SAVE_MODULE_INPUTS_DATA:
      return {
        ...state,
        module: {
          ...state.module,
          [payload.name]: payload.value
        }
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.RESET_LOADING:
      return {
        ...state,
        loading: false
      };
    case types.RESET_MODULE_INPUTS_DATA:
      return {
        ...state,
        module: {
          ...module_initial_state
        }
      };

    default:
      return state;
  }
};

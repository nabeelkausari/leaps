import * as types from "./types";

const byUri = (by_uri_list, item) => {
  return {
    ...by_uri_list,
    [item._links.self.href]: item
  };
};

const initialState = {
  fetch_material_requested: null,
  fetch_material_succeeded: null,
  fetch_material_failed: null,

  update_material_requested: null,
  update_material_succeeded: null,
  update_material_failed: null,

  by_uri: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_MATERIAL_REQUESTED:
      return {
        ...state,
        fetch_material_requested: true,
        fetch_material_succeeded: null,
        fetch_material_failed: null
      };
    case types.FETCH_MATERIAL_SUCCEEDED:
      return {
        ...state,
        fetch_material_requested: null,
        fetch_material_succeeded: true,
        fetch_material_failed: false,
        by_uri: byUri(state.by_uri, payload)
      };
    case types.FETCH_MATERIAL_FAILED:
      return {
        ...state,
        fetch_material_requested: null,
        fetch_material_succeeded: false,
        fetch_material_failed: true
      };

    case types.UPDATE_MATERIAL_REQUESTED:
      return {
        ...state,
        update_material_requested: true,
        update_material_succeeded: null,
        update_material_failed: null
      };
    case types.UPDATE_MATERIAL_SUCCEEDED:
      return {
        ...state,
        update_material_requested: null,
        update_material_succeeded: true,
        update_material_failed: false,
        by_uri: {
          ...state.by_uri,
          [payload.href]: payload.material
        }
      };
    case types.UPDATE_MATERIAL_FAILED:
      return {
        ...state,
        update_material_requested: null,
        update_material_succeeded: false,
        update_material_failed: true
      };

    default:
      return state;
  }
};

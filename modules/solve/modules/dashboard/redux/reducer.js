import * as types from "./types";

const initialState = {
  pinned_outputs: {},
  dashboard_items: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_DASHBOARD_ITEMS_REQUESTED:
      return {
        ...state,
        dashboard_items_loading: true,
        fetch_dashboard_items_succeeded: null
      };
    case types.GET_DASHBOARD_ITEMS_SUCCEEDED:
      return {
        ...state,
        dashboard_items_loading: false,
        fetch_dashboard_items_succeeded: true,
        dashboard_items: payload
      };
    case types.GET_DASHBOARD_ITEMS_FAILED:
      return {
        ...state,
        dashboard_items_loading: false,
        fetch_dashboard_items_succeeded: false
      };

    case types.ARRANGE_DASHBOARD_ITEMS_REQUESTED:
      return {
        ...state,
        arrange_dashboard_items_loading: true,
        arrange_dashboard_items_succeeded: null
      };
    case types.ARRANGE_DASHBOARD_ITEMS_SUCCEEDED:
      return {
        ...state,
        arrange_dashboard_items_loading: false,
        arrange_dashboard_items_succeeded: true,
        dashboard_items: payload
      };
    case types.ARRANGE_DASHBOARD_ITEMS_FAILED:
      return {
        ...state,
        arrange_dashboard_items_loading: false,
        arrange_dashboard_items_succeeded: false
      };

    case types.UPDATE_DASHBOARD_ITEM_REQUESTED:
      return {
        ...state,
        update_dashboard_item_loading: true,
        update_dashboard_item_succeeded: null
      };
    case types.UPDATE_DASHBOARD_ITEM_SUCCEEDED:
      return {
        ...state,
        update_dashboard_item_loading: false,
        update_dashboard_item_succeeded: true
      };
    case types.UPDATE_DASHBOARD_ITEM_FAILED:
      return {
        ...state,
        update_dashboard_item_loading: false,
        update_dashboard_item_succeeded: false
      };

    case types.PIN_OUTPUT_REQUESTED:
      return {
        ...state,
        pin_output_loading: true,
        pin_output_succeeded: null
      };
    case types.PIN_OUTPUT_SUCCEEDED:
      return {
        ...state,
        ...payload,
        pin_output_loading: false,
        pin_output_succeeded: true
      };
    case types.PIN_OUTPUT_FAILED:
      return {
        ...state,
        pin_output_loading: false,
        pin_output_succeeded: false
      };

    case types.ADD_DASHBOARD_ITEM_REQUESTED:
      return {
        ...state,
        add_dashboard_item_loading: true,
        add_dashboard_item_succeeded: null
      };
    case types.ADD_DASHBOARD_ITEM_SUCCEEDED:
      return {
        ...state,
        add_dashboard_item_loading: false,
        add_dashboard_item_succeeded: true,
        dashboard_items: payload
      };
    case types.ADD_DASHBOARD_ITEM_FAILED:
      return {
        ...state,
        add_dashboard_item_loading: false,
        add_dashboard_item_succeeded: false
      };

    case types.REMOVE_DASHBOARD_ITEM_REQUESTED:
      return {
        ...state,
        remove_dashboard_item_loading: true,
        remove_dashboard_item_succeeded: null
      };
    case types.REMOVE_DASHBOARD_ITEM_SUCCEEDED:
      return {
        ...state,
        remove_dashboard_item_loading: false,
        remove_dashboard_item_succeeded: true,
        dashboard_items: payload
      };
    case types.REMOVE_DASHBOARD_ITEM_FAILED:
      return {
        ...state,
        remove_dashboard_item_loading: false,
        remove_dashboard_item_succeeded: false
      };

    case types.ADD_TO_DASHBOARD:
    case types.CHANGE_TEXT:
    case types.ARRANGE_DASHBOARD_ITEMS:
      return { ...state, dashboard_items: payload };
    case types.ADD_TITLE_TO_DASHBOARD_ITEM:
      return { ...state, dashboard_items: payload };

    default:
      return state;
  }
};

import * as types from "./types";
import { groupBy, map } from "ramda";

const initialState = {
  dataset_loading: null,
  fetch_dataset_succeeded: null,
  connect_to_db_requested: null,
  connect_to_db_succeeded: null,
  connect_to_db_error: null,
  upload_dataset_loading: null,
  db_drivers: {
    list: [],
    fetch_db_drivers_requested: null,
    fetch_db_drivers_succeeded: null,
    fetch_db_drivers_error: null
  },
  list: {
    items: [],
    by_uri: {},
    data_by_uri: {},
    data_download_loading: null,
    data_download_succeeded: null
  },
  selected_table_reference: "",
  selections: {},
  sql_parameters: {
    list: [],
    sql_parameters_loading: null,
    sql_parameters_succeeded: null,
    sql_parameters_error: null
  },
  preload_datasets: [],
  csv_info: {},
  raw_data: [],
  rename_dataset_requested: null,
  rename_dataset_succeeded: null,
  rename_dataset_error: null,
  settings: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_DATASET_REQUESTED:
      return {
        ...state,
        dataset_loading: true,
        fetch_dataset_error: null,
        fetch_dataset_succeeded: null
      };
    case types.FETCH_DATASET_SUCCEEDED:
      return {
        ...state,
        dataset_loading: false,
        fetch_dataset_succeeded: true,
        list: {
          ...state.list,
          items: payload,
          by_uri: map(
            payload => payload.shift(),
            groupBy(item => item.ref, payload)
          )
        }
      };

    case types.FETCH_DATASET_FAILED:
      return {
        ...state,
        dataset_loading: false,
        fetch_dataset_succeeded: false,
        fetch_dataset_error: payload
      };

    case types.UPLOAD_DATASET_REQUESTED:
      return {
        ...state,
        upload_dataset_loading: true,
        upload_dataset_succeeded: false
      };

    case types.UPLOAD_DATASET_SUCCEEDED:
      return {
        ...state,
        upload_dataset_loading: false,
        upload_dataset_succeeded: true
      };
    case types.UPLOAD_DATASET_FAILED:
      return {
        ...state,
        upload_dataset_loading: false,
        upload_dataset_succeeded: false,
        upload_dataset_error: payload
      };

    case types.SELECT_TABLE:
      return {
        ...state,
        selected_table_reference: payload
      };

    case types.SELECT_COLUMN:
      return {
        ...state,
        [payload.dataset_reference]: (state[payload.dataset_reference] || [])
          .filter(h => payload.header.key !== h.key)
          .concat(payload.header)
      };

    case types.SET_DATASET_SELECTIONS:
      return {
        ...state,
        selections: payload
      };
    case types.CONNECT_TO_DATABASE_REQUESTED:
      return {
        ...state,
        connect_to_db_requested: true,
        connect_to_db_succeeded: null,
        connect_to_db_error: null
      };
    case types.CONNECT_TO_DATABASE_SUCCEEDED:
      return {
        ...state,
        connect_to_db_requested: false,
        connect_to_db_succeeded: true,
        connect_to_db_error: false
      };
    case types.CONNECT_TO_DATABASE_FAILED:
      return {
        ...state,
        connect_to_db_requested: false,
        connect_to_db_succeeded: false,
        connect_to_db_error: payload
      };

    case types.FETCH_DATASET_CSV_REQUESTED:
      return {
        ...state,
        dataset_csv_loading: true,
        fetch_dataset_csv_error: null,
        fetch_dataset_csv_succeeded: null
      };

    case types.FETCH_DATASET_CSV_SUCCEEDED:
      return {
        ...state,
        dataset_csv_loading: false,
        fetch_dataset_csv_succeeded: true,
        csv_info: payload
      };

    case types.FETCH_UPLOAD_LINK_REQUESTED:
      return {
        ...state,
        upload_link_loading: true,
        fetch_upload_link_error: null,
        fetch_upload_link_succeeded: null
      };

    case types.FETCH_UPLOAD_LINK_SUCCEEDED:
      return {
        ...state,
        upload_link_loading: false,
        fetch_upload_link_succeeded: true,
        upload_dataset: payload
      };

    case types.CREATE_DTATASET_MODAL_REQUESTED:
      return {
        ...state,
        create_dataset_modal_loading: true,
        create_dataset_modal_error: null,
        create_dataset_modal_succeeded: null
      };

    case types.CREATE_DTATASET_MODAL_SUCCEEDED:
      return {
        ...state,
        create_dataset_modal_loading: false,
        create_dataset_modal_succeeded: true,
        upload_dataset: payload
      };

    case types.DATASET_CREATED_REQUESTED:
      return {
        ...state,
        dataset_created_loading: true,
        dataset_created_error: null,
        dataset_created_succeeded: null
      };

    case types.DATASET_CREATED_SUCCEEDED:
      return {
        ...state,
        dataset_created_loading: false,
        dataset_created_succeeded: true,
        dataset_created_error: false
      };

    case types.DATASET_CREATED_FAILED:
      return {
        ...state,
        dataset_created_loading: false,
        dataset_created_succeeded: false,
        dataset_created_error: true
      };

    case types.FETCH_SQL_FORM_REQUESTED:
      return {
        ...state,
        sql_parameters: {
          ...state.sql_parameters,
          sql_parameters_loading: true
        }
      };

    case types.FETCH_SQL_FORM_SUCCEEDED:
      return {
        ...state,
        sql_parameters: {
          ...state.sql_parameters,
          sql_parameters_loading: false,
          sql_parameters_succeeded: true,
          list: payload
        }
      };

    case types.FETCH_SQL_FORM_FAILED:
      return {
        ...state,
        sql_parameters: {
          ...state.sql_parameters,
          sql_parameters_loading: false,
          sql_parameters_error: payload
        }
      };

    case types.FETCH_PRELOAD_DATASET_REQUESTED:
      return {
        ...state,
        preload_datasets_loading: true,
        preload_dataset_succeeded: null,
        preload_dataset_error: null
      };

    case types.FETCH_PRELOAD_DATASET_SUCCEEDED:
      return {
        ...state,
        preload_datasets_loading: false,
        preload_dataset_succeeded: true,
        preload_datasets: payload
      };

    case types.FETCH_PRELOAD_DATASET_FAILED:
      return {
        ...state,
        preload_dataset_succeeded: false,
        preload_dataset_error: true
      };

    case types.FETCH_DB_DRIVERS_REQUESTED:
      return {
        ...state,
        db_drivers: {
          ...state.db_drivers,
          fetch_db_drivers_requested: true,
          fetch_db_drivers_succeeded: null,
          fetch_db_drivers_error: null
        }
      };

    case types.FETCH_DB_DRIVERS_SUCCEEDED:
      return {
        ...state,
        db_drivers: {
          ...state.db_drivers,
          list: payload,
          fetch_db_drivers_requested: false,
          fetch_db_drivers_succeeded: true,
          fetch_db_drivers_error: false
        }
      };

    case types.FETCH_DB_DRIVERS_FAILED:
      return {
        ...state,
        db_drivers: {
          ...state.db_drivers,
          fetch_db_drivers_requested: false,
          fetch_db_drivers_succeeded: false,
          fetch_db_drivers_error: payload
        }
      };

    case types.FETCH_CSV_DATA_REQUESTED:
      return {
        ...state,
        list: {
          ...state.list,
          data_download_loading: true,
          data_download_succeeded: null
        }
      };

    case types.FETCH_CSV_DATA_SUCCEEDED:
      return {
        ...state,
        list: {
          ...state.list,
          data_download_loading: false,
          data_download_succeeded: true,
          data_by_uri: {
            ...state.list.data_by_uri,
            ...payload
          }
        }
      };

    case types.RENAME_DATASET_REQUESTED:
      return {
        ...state,
        rename_dataset_requested: true,
        rename_dataset_succeeded: null,
        rename_dataset_error: null
      };

    case types.RENAME_DATASET_SUCCEEDED:
      const index = state.list.items.findIndex(
        item => item.name === payload.old_name
      );
      const items = [
        ...state.list.items.slice(0, index),
        {
          ...state.list.items[index],
          name: payload.new_name
        },
        ...state.list.items.slice(index + 1)
      ];
      return {
        ...state,
        list: {
          ...state.list,
          items,
          by_uri: map(
            items => items.shift(),
            groupBy(item => item.ref, items)
          )
        },
        rename_dataset_requested: false,
        rename_dataset_succeeded: true,
        rename_dataset_error: false
      };

    case types.RENAME_DATASET_FAILED:
      return {
        ...state,
        rename_dataset_requested: false,
        rename_dataset_succeeded: false,
        rename_dataset_error: true
      };

    case types.RESET_DATASETS:
      return {
        ...initialState
      };

    case types.DATA_UPLOAD_SETTINGS_REQUESTED:
      return {
        ...state,
        settings: {}
      };

    case types.DATA_UPLOAD_SETTINGS_SUCCEEDED:
      return {
        ...state,
        settings: payload
      };

    case types.DATA_UPLOAD_SETTINGS_FAILED:
      return {
        ...state,
        settings: {}
      };

    default:
      return state;
  }
};

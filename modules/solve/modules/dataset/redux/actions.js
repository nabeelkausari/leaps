import * as types from "./types";
import Papa from "papaparse";
import get from "lodash/get";
import { fetchLink, fetchLinkAs } from "../../../../../../common/api/helpers";
import { notify } from "../../../../../../common/utils/notification";
import { dialogs } from "../../../../toPublish/Dialog";
import AutoRenameDetails from "../components/CreateDataset/AutoRenameDetails";

export const selectTable = payload => ({ type: types.SELECT_TABLE, payload });

export const getDatasets = () => (dispatch, getState) => {
  const {
    solve: {
      details,
      datasets: {
        list: { items }
      }
    },
    selected_table_reference
  } = getState();
  const dataset_link = get(details, "_links.tables_with_columns");

  if (!dataset_link) return;
  dispatch({ type: types.FETCH_DATASET_REQUESTED });
  fetchLinkAs(dataset_link)
    .then(payload => {
      if (payload.lastModifiedTableRef !== "") {
        dispatch(selectTable(payload.lastModifiedTableRef));
      }

      dispatch({
        type: types.FETCH_DATASET_SUCCEEDED,
        payload: payload.datasets
      });
      // let [selected_table_data] = payload.datasets.filter(item => item.ref === payload.lastModifiedTableRef)
      // let ui_csv = null
      // let selected_table_data_link = ui_csv ? ui_csv : get(selected_table_data, 'datasetPath');
      // dispatch(fetchCsvData('https://devdata.analyttica.com/output/da49652c-ba7d-4531-b610-a50cf856d841/solve_100010/user_3820/data/Airline_SmoothLanding.uidata'))
    })
    .catch(payload => dispatch({ type: types.FETCH_DATASET_FAILED, payload }));
};

export const selectColumn = (dataset_reference, header) => dispatch => {
  dispatch({
    type: types.SELECT_COLUMN,
    payload: { dataset_reference, header }
  });
};

export const setDatasetSelection = () => (dispatch, getState) => {
  const {
    solve: { functions, datasets }
  } = getState();
  let column_selections = functions.selections;
  let dataset_selections = {};

  for (let key in column_selections) {
    dataset_selections[key] = {
      name: datasets.list.by_uri[key].name,
      uri: datasets.list.by_uri[key].datasetPath
    };
  }
  dispatch({ type: types.SET_DATASET_SELECTIONS, payload: dataset_selections });
};

export const getUploadLink = () => dispatch => {
  dispatch({ type: types.FETCH_UPLOAD_LINK_REQUESTED });
  fetchLink({
    href: "/course/upload",
    type: "application/json",
    accept: "application/json"
  })
    .then(res => res.json())
    .then(result => {
      const payload = {
        uploadLink: result.file_upload_url,
        sampleCSVLink: result.sample_data_url,
        deleteLink: result.delete_dataset_file
      };
      dispatch({ type: types.FETCH_UPLOAD_LINK_SUCCEEDED, payload });
    })
    .catch(payload => {
      dispatch({ type: types.FETCH_UPLOAD_LINK_FAILED, payload });
      dispatch(notify.error("Error", payload.message));
    });
};

export const uploadDataset = formData => (dispatch, getState) => {
  dispatch({ type: types.UPLOAD_DATASET_REQUESTED });
  const {
    solve: {
      datasets: { upload_dataset }
    }
  } = getState();
  let is_upload_success = false;

  fetch(`${upload_dataset.uploadLink.href}`, {
    method: "POST",
    body: formData
  })
    .then(response => {
      is_upload_success = response.ok;
      return response.json();
    })
    .then(res => {
      if (is_upload_success) {
        return res;
      } else {
        throw new Error(res.message);
      }
    })
    .then(data => {
      dispatch({ type: types.UPLOAD_DATASET_SUCCEEDED });
      if (data.modifiedColumnData !== null) {
        return dispatch(
          dialogs.show({
            subtitle: "Auto Rename of the Column Names",
            Component: AutoRenameDetails,
            component_props: { ...data },
            yesButton: {
              text: "Proceed",
              onClick: () => {
                dispatch(addDataset(data.file_path));
                return true;
              }
            },
            noButton: {
              text: "Cancel"
            }
          })
        );
      }
      dispatch(addDataset(data.file_path));
    })
    .catch(error => {
      dispatch({ type: types.UPLOAD_DATASET_FAILED, payload: error });
      notify.error("Error", error.message);
    });
};

export const addDataset = file => (dispatch, getState) => {
  const {
    solve: { details }
  } = getState();
  const payload = {
    path: JSON.stringify([file])
  };
  dispatch({ type: types.DATASET_CREATED_REQUESTED });
  return fetchLink(details._links.add_data_sets, payload)
    .then(() => {
      notify.success("Done", "dataset added successfully");
      dispatch({ type: types.DATASET_CREATED_SUCCEEDED });
      // dispatch(selectTable(data.filename))
      dispatch(getDatasets());
    })
    .catch(payload => {
      dispatch({ type: types.DATASET_CREATED_FAILED, payload });
      dispatch(notify.error("Error", payload.message));
    });
};

export const fetchSqlForm = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_SQL_FORM_REQUESTED });
  const {
    solve: {
      functions: {
        list: { by_uri }
      }
    }
  } = getState();
  const sql_form = by_uri["/functions/FUNC0473"];
  if (sql_form === undefined) return;
  const payload = {};
  fetchLinkAs(sql_form._links.parameters, payload)
    .then(payload =>
      dispatch({ type: types.FETCH_SQL_FORM_SUCCEEDED, payload })
    )
    .catch(payload => dispatch({ type: types.FETCH_SQL_FORM_FAILED, payload }));
};

export const connectToExternalDatabase = (payload, dbDriver) => (
  dispatch,
  getState
) => {
  const {
    solve: { details }
  } = getState();
  const link = details._links.connect_db;
  if (!link) return;
  const params = {
    ...payload,
    dbDriver
  };
  dispatch({ type: types.CONNECT_TO_DATABASE_REQUESTED });
  return fetchLink(link, params)
    .then(payload => {
      notify.success("Success");
      dispatch({ type: types.CONNECT_TO_DATABASE_SUCCEEDED });
    })
    .catch(error => {
      dispatch({ type: types.CONNECT_TO_DATABASE_FAILED });
      notify.error("Something went wrong", error.message);
    });
};

export const fetchPreloadDatasets = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_PRELOAD_DATASET_REQUESTED });
  const link = {
    href: "/projects/datasets/preloaded",
    method: "GET",
    type: "application/json"
  };

  fetchLink(link)
    .then(res => res.json())
    .then(payload => {
      dispatch({ type: types.FETCH_PRELOAD_DATASET_SUCCEEDED, payload });
    })
    .catch(payload =>
      dispatch({ type: types.FETCH_PRELOAD_DATASET_FAILED, payload })
    );
};

export const getDbDrivers = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_DB_DRIVERS_REQUESTED });
  const {
    cases: {
      current_case: { info }
    }
  } = getState();
  const link = get(info, "_links.data_connection_drivers");
  if (!link) return;
  fetchLinkAs(link)
    .then(payload => {
      dispatch({ type: types.FETCH_DB_DRIVERS_SUCCEEDED, payload });
    })
    .catch(payload =>
      dispatch({ type: types.FETCH_DB_DRIVERS_FAILED, payload })
    );
};

export const renameDataset = (old_name, new_name) => (dispatch, getState) => {
  const {
    solve: { details }
  } = getState();
  const link = get(details, "_links.rename_table");
  if (!link) return;
  if (old_name === new_name) return;
  const params = {
    existingTableName: old_name,
    newTableName: new_name,
    tableDescription: ""
  };
  dispatch({ type: types.RENAME_DATASET_REQUESTED });
  fetchLink(link, params)
    .then(payload => {
      dispatch({
        type: types.RENAME_DATASET_SUCCEEDED,
        payload: { old_name, new_name }
      });
      notify.success("Success", "Table name updated successfully");
    })
    .catch(error => {
      dispatch({ type: types.RENAME_DATASET_FAILED, error });
      if (Array.isArray(error.body)) {
        error.body.forEach(e => {
          notify.error("Error", e.fieldMessage);
        });
      } else {
        notify.error("Error", error.message);
      }
    });
};

export const fetchCsvData = csv_url => (dispatch, getState) => {
  if (!csv_url) return;
  dispatch({ type: types.FETCH_CSV_DATA_REQUESTED });
  // let csvData = [];
  // let headerRow = [];
  return Papa.parse(csv_url || "", {
    download: true,
    delimiter: ";",
    complete: results => {
      let data = [];
      if (results.data.length > 200) {
        data = results.data.slice(0, 201);
      } else {
        data = results.data.slice(0, results.data.length - 1);
      }

      dispatch({
        type: types.FETCH_CSV_DATA_SUCCEEDED,
        payload: {
          [csv_url]: data
        }
      });
    }
  });
};
export const resetDatasets = () => (dispatch, getState) => {
  dispatch({ type: types.RESET_DATASETS });
};

export const getFileUploadSettings = () => (dispatch, getState) => {
  dispatch({ type: types.DATA_UPLOAD_SETTINGS_REQUESTED });
  const {
    profile: { info }
  } = getState();
  const link = get(info, "_links.project_info");
  if (!link) return;
  fetchLinkAs({ ...link, type: "application/json" })
    .then(payload => {
      dispatch({ type: types.DATA_UPLOAD_SETTINGS_SUCCEEDED, payload });
    })
    .catch(payload =>
      dispatch({ type: types.DATA_UPLOAD_SETTINGS_FAILED, payload })
    );
};

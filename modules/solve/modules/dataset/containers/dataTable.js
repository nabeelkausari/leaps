import { connect } from "react-redux";
import { path } from "ramda";
import { get } from "lodash";
import {
  setAllColumnSelections,
  setColumnSelections
} from "../../toolbar/redux/actions";
import { fetchCsvData } from "../redux/actions";

const mapStateToProps = (state, props) => {
  const {
    dataset_loading,
    selected_table_reference,
    raw_data,
    fetch_dataset_succeeded,
    list: { data_by_uri, by_uri, data_download_succeeded }
  } = state.solve.datasets;
  const { fetch_steps_succeeded } = state.solve.steps;
  const {
    notification_banner: { hide }
  } = state.notification;

  const matched_data_set =
    fetch_steps_succeeded &&
    state.solve.datasets.list.items
      .filter(data_set => data_set.ref === props.dataset_reference)
      .shift();
  let ui_csv = path(["uiDataLink", "href"], matched_data_set);
  let details = state.solve.details;

  const in_apply =
    get(details, "type") && get(details, "type").toUpperCase() === "APPLY";

  return {
    csv: ui_csv === undefined ? get(matched_data_set, "datasetPath") : ui_csv,
    fetch_steps_succeeded,
    dataset_loading,
    data_by_uri,
    by_uri,
    selected_table_reference,
    raw_data,
    data_download_succeeded,
    fetch_dataset_succeeded,
    in_apply,
    show_notification_banner: !hide
  };
};

export const DataTableContainer = connect(mapStateToProps, {
  setColumnSelections,
  setAllColumnSelections,
  fetchCsvData
});

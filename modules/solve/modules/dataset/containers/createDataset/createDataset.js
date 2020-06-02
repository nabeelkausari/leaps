import { connect } from "react-redux";
import {
  fetchPreloadDatasets,
  fetchSqlForm,
  getDbDrivers, getFileUploadSettings,
  getUploadLink
} from "../../redux/actions";

const mapStateToProps = state => ({
  upload_dataset: state.solve.datasets.upload_dataset,
  dataset_created_succeeded: state.solve.datasets.dataset_created_succeeded,
  is_dataset_create_loading: state.solve.datasets.dataset_created_loading,
  fetch_functions_succeeded: state.solve.functions.fetch_functions_succeeded,
  upload_settings: state.solve.datasets.settings
});

export const CreateDatasetContainer = connect(mapStateToProps, {
  getUploadLink,
  fetchSqlForm,
  fetchPreloadDatasets,
  getDbDrivers,
  getFileUploadSettings
});

import { connect } from "react-redux";
import { uploadDataset, getUploadLink } from "../../redux/actions";

const mapStateToProps = state => ({
  solve_id: state.solve.details.solve_id,
  upload_dataset: state.solve.datasets.upload_dataset,
  upload_dataset_loading: state.solve.datasets.upload_dataset_loading,
  is_dataset_create_loading: state.solve.datasets.dataset_created_loading
});

export const CreateDatasetModalContainer = connect(mapStateToProps, {
  getUploadLink,
  createDatasetModal: uploadDataset
});

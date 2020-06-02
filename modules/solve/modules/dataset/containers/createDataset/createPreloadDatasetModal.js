import { connect } from "react-redux";
import { addDataset } from "../../redux/actions";

const mapStateToProps = state => {
  return {
    data_sets: state.solve.datasets.preload_datasets,
    data_set_succeeded: state.solve.datasets.preload_dataset_succeeded,
    is_dataset_create_loading: state.solve.datasets.dataset_created_loading
  };
};

export const CreatePloadDataset = connect(mapStateToProps, { addDataset });

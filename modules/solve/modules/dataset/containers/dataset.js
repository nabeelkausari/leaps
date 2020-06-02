import { connect } from "react-redux";
import { resetFlyouts } from "../../steps/redux/actions";

const mapStateToProps = ({
  cases: { info, steps, fetch_case_succeeded },
  solve: {
    datasets: { dataset_loading, fetch_dataset_succeeded },
    steps: { fetch_steps_succeeded }
  }
}) => ({
  info,
  steps,
  fetch_case_succeeded,
  fetch_steps_succeeded,
  dataset_loading,
  fetch_dataset_succeeded
});

export const DatasetContainer = connect(mapStateToProps, { resetFlyouts });

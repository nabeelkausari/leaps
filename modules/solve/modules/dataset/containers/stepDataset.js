import { connect } from "react-redux";
import { fetchStepDetailsCsv } from "../../../../cases/redux/actions";

const mapStateToProps = state => ({
  output_csv_results: state.cases.output_csv_results
});

export const StepDatasetContainer = connect(mapStateToProps, {
  fetchStepDetailsCsv
});

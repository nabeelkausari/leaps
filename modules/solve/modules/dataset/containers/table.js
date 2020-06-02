import { connect } from "react-redux";
import { renameDataset, selectTable } from "../redux/actions";
import { getScenarioDetails } from "../../../../cases/redux/actions";
import { resetFlyouts } from "../../steps/redux/actions";

const mapStateToProps = state => {
  const {
    fetch_dataset_succeeded,
    list,
    selected_table_reference,
    dataset_created_succeeded
  } = state.solve.datasets;
  const { selections, function_execution_succeeded } = state.solve.functions;
  const { fetch_steps_succeeded } = state.solve.steps;

  return {
    data_sets: list.items,
    fetch_steps_succeeded,
    function_execution_succeeded,
    selected_table_reference:
      selected_table_reference !== ""
        ? selected_table_reference
        : fetch_dataset_succeeded && list.items.length > 0 && list.items[0].ref,
    selections,
    dataset_created_succeeded,
    fetch_dataset_succeeded,
    datasets_by_uri: list.by_uri
  };
};

export const TableContainer = connect(mapStateToProps, {
  selectTable,
  resetFlyouts,
  getScenarioDetails,
  renameDataset
});

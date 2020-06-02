import { connect } from "react-redux";
import {
  setAllColumnSelections,
  setColumnSelections
} from "../../toolbar/redux/actions";

const mapStateToProps = (state, props) => {
  const { selections } = state.solve.functions;
  const {
    solve: {
      datasets: { selected_table_reference }
    }
  } = state;
  const selectedHeaders =
    selections[selected_table_reference] &&
    selections[selected_table_reference].map(s => s.index);
  return {
    selectedHeaders,
    selected_table_reference
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const selectHeaders = (i, header) => {
    const selected_column = {
      index: i,
      key: header
    };

    if (i === 0) {
      dispatch(setAllColumnSelections());
    } else {
      dispatch(setColumnSelections(selected_column));
    }
  };
  return {
    selectHeaders,
    setAllColumnSelections,
    setColumnSelections
  };
};
export default connect(mapStateToProps, mapDispatchToProps);

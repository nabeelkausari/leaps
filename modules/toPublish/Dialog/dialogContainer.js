import { connect } from "react-redux";
import { hide } from "./redux/actions";

const mapStateToProps = (state, props) => ({
  ...state.dialogs
});
const mapDispatchToProps = {
  onHide: hide
  // removeComponent
};

export const DialogContainer = connect(mapStateToProps, mapDispatchToProps);

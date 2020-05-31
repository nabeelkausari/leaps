import { connect } from "react-redux";
import { setCloneCaseName } from "../../redux/actions";

const mapStateToProps = (state, props) => {
  const { cases } = state;

  return {
    clone_case_name: cases.clone_case_name
  };
};

export default connect(mapStateToProps, {
  setCloneCaseName
});

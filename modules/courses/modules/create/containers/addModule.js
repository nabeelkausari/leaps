import { connect } from "react-redux";
import { saveModuleInputs } from "../redux/actions";

const mapStateToProps = (state, props) => {
  const {
    courses: {
      create: { module }
    }
  } = state;

  return { module };
};

export default connect(mapStateToProps, { saveModuleInputs });

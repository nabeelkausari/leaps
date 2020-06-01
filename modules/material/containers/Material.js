import { connect } from "react-redux";
import {
  fetchMaterial,
  saveCaseMaterial,
  saveMaterial
} from "../redux/actions";

const mapStateToProps = (state, props) => {
  const {
    material: {
      fetch_material_succeeded,
      fetch_material_requested,
      update_material_succeeded,
      by_uri
    }
  } = state;

  return {
    fetch_material_succeeded,
    fetch_material_requested,
    update_material_succeeded,
    by_uri
  };
};

export default connect(mapStateToProps, {
  fetchMaterial,
  saveMaterial,
  saveCaseMaterial
});

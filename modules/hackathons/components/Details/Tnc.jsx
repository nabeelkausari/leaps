import React, { Component } from "react";
import get from "lodash/get";
import Material from "../../../material/components/CaseMaterial";

class Tnc extends Component {
  render() {
    const { current_hackathon } = this.props;
    const tnc_link = get(current_hackathon, "_links.get_tnc_details");
    const edit_tnc_link = get(current_hackathon, "_links.edit_tnc_details");
    const disclaimer_link = get(current_hackathon, "_links.get_disclaimer");
    const edit_disclaimer_link = get(
      current_hackathon,
      "_links.edit_disclaimer"
    );
    return (
      <div className="hd-child">
        <div className="hd-child-material">
          <h2 className="hd-child-material__title">Terms and conditions</h2>
          <Material material_link={tnc_link} update_link={edit_tnc_link} />
        </div>
        <div className="hd-child-material">
          <h2 className="hd-child-material__title">Disclaimer</h2>
          <Material
            material_link={disclaimer_link}
            update_link={edit_disclaimer_link}
          />
        </div>
      </div>
    );
  }
}

export default Tnc;

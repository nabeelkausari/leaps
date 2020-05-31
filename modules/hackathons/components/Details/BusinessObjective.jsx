import React, { useEffect } from "react";
import get from "lodash/get";
import Material from "../../../material/components/CaseMaterial";

export const BusinessObjective = props => {
  const { business_objective } = props;
  const business_objective_link = get(business_objective, "_links.self");
  const edit_business_objective_link = get(
    business_objective,
    "_links.create_business_objective"
  );

  const onBusinessObjectiveSave = () => {
    const { hackathon_id, fetchSingleHackathon } = props;
    fetchSingleHackathon(hackathon_id);
  };
  return (
    <div className="business-objective">
      <Material
        material_link={business_objective_link}
        update_link={edit_business_objective_link}
        onSaveCallBack={onBusinessObjectiveSave}
      />
    </div>
  );
};

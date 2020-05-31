import React from "react";
import Material from "../../../../material/components/CaseMaterial";
import cx from "classnames";

export const Tab = props => {
  const { onClick, tab_key, title, active } = props;
  return (
    <div
      className={cx("ath-tab", { "ath-tab--active": active === tab_key })}
      onClick={() => onClick(tab_key)}
    >
      <p>{title}</p>
    </div>
  );
};

export const DescriptionTabView = props => {
  const { case_material_link, edit_case_material } = props;

  return (
    <div className="case-detail__description-wrapper">
      <Material
        material_link={case_material_link}
        update_link={edit_case_material}
      />
    </div>
  );
};

export const DataDictionaryTabView = props => {
  return <div>DATA DICTIONARY</div>;
};

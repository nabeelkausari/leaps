import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

class Breadcrumb extends Component {
  render() {
    const { crumbs, final_crumb } = this.props;
    return (
      <div className="ath-breadcrumbs">
        {crumbs.map(crumb => (
          <Fragment>
            <NavLink className="ath-breadcrumbs__crumb" to={crumb.link}>
              {crumb.text}
            </NavLink>
            <p>&nbsp;>&nbsp;</p>
          </Fragment>
        ))}
        <p className="ath-breadcrumbs__final-crumb">{final_crumb}</p>
      </div>
    );
  }
}

export default Breadcrumb;

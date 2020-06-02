import React, { Component, Fragment } from "react";
import Link from "next/link"

class Breadcrumb extends Component {
  render() {
    const { crumbs, final_crumb } = this.props;
    return (
      <div className="ath-breadcrumbs">
        {crumbs.map(crumb => (
          <Fragment>
            <Link  href={crumb.link}>
              <a className="ath-breadcrumbs__crumb">{crumb.text}</a>
            </Link>
            <p>&nbsp;>&nbsp;</p>
          </Fragment>
        ))}
        <p className="ath-breadcrumbs__final-crumb">{final_crumb}</p>
      </div>
    );
  }
}

export default Breadcrumb;

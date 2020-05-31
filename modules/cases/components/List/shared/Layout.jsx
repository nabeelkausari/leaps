import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

class Layout extends Component {
  render() {
    const {
      children,
      title,
      categories,
      second_title,
      types,
      location
    } = this.props;
    const params = new URLSearchParams(location.search);
    const tags = params.get("type");
    return (
      <div className="list-layout">
        <div className="list-layout__left">
          <h4 className="list-layout__title">{title}</h4>
          <div className="list-layout__section">
            <h6 className="list-layout__category-title">Category</h6>
            <div className="list-layout__category-items">
              {categories.map(category => (
                <NavLink
                  className="list-layout__category-item"
                  activeClassName="list-layout__category-item--active"
                  exact
                  to={`${category.to}`}
                >
                  {category.title}
                </NavLink>
              ))}
            </div>
          </div>
          {second_title && (
            <div className="list-layout__section">
              <h6 className="list-layout__category-title">{second_title}</h6>
              <div className="list-layout__category-items">
                {types.map(category => (
                  <NavLink
                    className="list-layout__category-item"
                    activeClassName={
                      category.search_param.includes(tags) &&
                      "list-layout__category-item--active"
                    }
                    exact
                    to={`${category.to}`}
                  >
                    {category.title}
                    <div
                      className="list-layout__category-item--color"
                      style={{ backgroundColor: category.color }}
                    >
                      &nbsp;
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="list-layout__right">{children}</div>
      </div>
    );
  }
}

export default withRouter(Layout);

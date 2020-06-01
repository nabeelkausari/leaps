import React from "react";
import { useRouter } from "next/router"
import ActiveLink from "./ActiveLink"

const ListLayout = props => {
  const {
    children,
    title,
    categories,
    second_title,
    types,
  } = props;
  const router = useRouter();
  const tags = router.query.type;
  return (
    <div className="list-layout">
      <div className="list-layout__left">
        <h4 className="list-layout__title">{title}</h4>
        <div className="list-layout__section">
          <h6 className="list-layout__category-title">Category</h6>
          <div className="list-layout__category-items">
            {categories.map((category, i) => (
              <ActiveLink
                key={i}
                activeClassName="list-layout__category-item--active"
                href={`${category.to}`}
              >
                <a className="list-layout__category-item">{category.title}</a>
              </ActiveLink>
            ))}
          </div>
        </div>
        {second_title && (
          <div className="list-layout__section">
            <h6 className="list-layout__category-title">{second_title}</h6>
            <div className="list-layout__category-items">
              {types.map(category => (
                <ActiveLink
                  activeClassName={
                    category.search_param.includes(tags) &&
                    "list-layout__category-item--active"
                  }
                  href={`${category.to}`}
                >
                  <a className="list-layout__category-item">
                    {category.title}
                    <div
                      className="list-layout__category-item--color"
                      style={{ backgroundColor: category.color }}
                    >
                      &nbsp;
                    </div>
                  </a>
                </ActiveLink>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="list-layout__right">{children}</div>
    </div>
  );
}

export default ListLayout;

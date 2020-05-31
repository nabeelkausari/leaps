import React  from "react";
import { Nav } from "react-bootstrap";
import ActiveLink from "../../../components/ActiveLink"

export const NewHeaderContent = () => {
  return (
    <Nav>
      <Nav.Item bsPrefix="case-list-header__item">
        <ActiveLink
          href="/courses"
          activeClassName="active"
        >
          <a className="case-list-header__item-link">Learn</a>
        </ActiveLink>
      </Nav.Item>
      <Nav.Item bsPrefix="case-list-header__item">
        <ActiveLink
          href="/sample_cases?type=all"
          activeClassName="active"
        >
          <a className="case-list-header__item-link">Apply</a>
        </ActiveLink>
      </Nav.Item>
      <Nav.Item bsPrefix="case-list-header__item">
        <ActiveLink
          href="/hackathons"
          activeClassName="active"
        >
          <a className="case-list-header__item-link">Solve</a>
        </ActiveLink>
      </Nav.Item>

      <Nav.Item bsPrefix="case-list-header__item case-list-header__item--1">
        <ActiveLink
          href="/covid-analysis"
          activeClassName="active"
        >
          <a className="case-list-header__item-link">Covid Analysis</a>
        </ActiveLink>
      </Nav.Item>
      <Nav.Item bsPrefix="case-list-header__item">
        <ActiveLink
          scroll={false}
          href="/#resources"
          activeClassName="active"
        >
          <a className="case-list-header__item-link">The Hub</a>
        </ActiveLink>
      </Nav.Item>
    </Nav>
  );
};

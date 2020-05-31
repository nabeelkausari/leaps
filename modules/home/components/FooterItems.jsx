import React from "react";
import { HashLink } from "react-router-hash-link";

export const TabItem = props => {
  return (
    <div className={`shl-home__footer--tab--${props.type}`}>
      <a
        className="shl-home__footer--tab--link"
        href={props.link}
        target={props.new_target ? "_blank" : null}
      >
        {props.text}
      </a>
    </div>
  );
};

export const HashItem = props => {
  return (
    <div className={`shl-home__footer--tab--${props.type}`}>
      <HashLink smooth to={props.link} className="shl-home__footer--tab--link">
        {props.text}
      </HashLink>
    </div>
  );
};

export const FollowItem = props => {
  return (
    <div className="shl-home__footer--follow-item">
      <a
        href={props.link}
        className="shl-home__footer--sub--link"
        target="_blank"
      >
        <props.Svg
          className={`shl-home__footer--sub--icon shl-home__footer--sub--icon--${props.type}`}
        />
      </a>
    </div>
  );
};

import React from "react";
import Link from "next/link"

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
      <Link href={props.link} >
        <a className="shl-home__footer--tab--link">{props.text}</a>
      </Link>
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
        <img
          src={props.svg}
          className={`shl-home__footer--sub--icon shl-home__footer--sub--icon--${props.type}`}
        />
      </a>
    </div>
  );
};

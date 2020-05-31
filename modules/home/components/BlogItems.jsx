import React from "react";
import { scholar_right_arrow } from "../../../../common/images/index";

export const MainBlog = props => {
  return (
    <div
      className="shl-home__blog-item--large"
      onClick={() => props.onClick(props.blog.link)}
    >
      <div className="shl-home__blog-item--image-container">
        <img
          className="shl-home__blog-item--image"
          src={props.blog.bg_image}
          alt="blog"
        />
      </div>
      <div className="shl-home__blog-item--info-wrapper">
        <h5 className="shl-home__blog-item--category">{props.blog.category}</h5>
        <h3 className="shl-home__blog-item--title--1">{props.blog.title}</h3>
        <p className="shl-home__blog-item--text--1">
          Published by: {props.blog.author}
        </p>
        {/*<p className="shl-home__blog-item--text--1">*/}
        {/*Website Link: {props.blog.link}*/}
        {/*</p>*/}
        <span className="shl-home__blog-item--action-wrapper shl-home__blog-item--action-wrapper--1">
          Read More
          <img
            className="shl-home__blog-item--arrow"
            src={scholar_right_arrow}
            alt="read more"
          />
        </span>
      </div>
    </div>
  );
};

export const Blog = props => {
  const { mobile_display } = props;
  return (
    <div
      className={`shl-home__blog-item--sub${
        mobile_display
          ? "--mobile shl-home__blog-item--sub"
          : " shl-home__blog-item--sub--not-mobile"
      }`}
      onClick={() => props.onClick(props.blog.link)}
    >
      <img
        className="shl-home__blog-item--sub-bg"
        src={props.blog.bg_image}
        alt="blog"
      />
      <h3 className="shl-home__blog-item--title--2">{props.blog.title}</h3>
      <p className="shl-home__blog-item--text--2">{props.blog.author}</p>
      {/*<p className="shl-home__blog-item--text--2">*/}
      {/*Website Link: {props.blog.link}*/}
      {/*</p>*/}
      <span className="shl-home__blog-item--action-wrapper shl-home__blog-item--action-wrapper--2">
        Read More
        <img
          className="shl-home__blog-item--arrow--1"
          src={scholar_right_arrow}
          alt="read more"
        />
      </span>
    </div>
  );
};

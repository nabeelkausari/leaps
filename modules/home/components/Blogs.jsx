import React, { Component } from "react";
// import {
//   main_blog_image,
//   blog_1,
//   blog_2,
//   blog_3,
//   blog_4,
//   scholar_left_arrow,
//   scholar_right_arrow
// } from "../../../../common/images/index";
import { Blog, MainBlog } from "./BlogItems";

let blogs = [
  {
    bg_image: "/images/main-blog-image.jpg",
    category: "DATA ANALYTICS",
    title:
      "The Art of Communication in Data Science – through the lens of experience",
    author: "Analyttica Datalab",
    link:
      "https://www.analyttica.com/the-art-of-communication-in-data-science-through-the-lens-of-experience"
  },
  {
    bg_image: "/images/blog-1.png",
    title: "My journey with Text Analytics – From R to ATH",
    author: "Saurabh Singh | Analyst, Client Solutions | Analyttica Datalab",
    link:
      "https://www.analyttica.com/my-journey-with-text-analyttics-from-r-to-ath"
  },
  {
    bg_image: "/images/blog-2.png",
    title: "Data Science – Myth Vs Reality",
    author:
      "Nikhil Nene | Principal Analyst, Client Solutions | Analyttica Datalab",
    link: "https://www.analyttica.com/data-science-myth-vs-reality"
  },
  {
    bg_image: "/images/blog-3.png",
    title:
      "Gearing up for a career in Data Science? Don’t forget the Intangibles",
    author: "Analyttica Datalab",
    link:
      "https://www.analyttica.com/gearing-up-for-a-career-in-data-science-dont-forget-the-intangibles/"
  },
  {
    bg_image: "/images/blog-4.png",
    title: "Scope and Future of Business Analytics in India",
    author: "Analyttica Datalab",
    link:
      "https://www.analyttica.com/scope-and-future-of-business-analytics-in-india"
  }
];

class Blogs extends Component {
  state = {
    next_counter: 0,
    scroll_next_width: 0,
    prev_counter: 0,
    scroll_prev_width: 0
  };

  blogs_sub_wrapper = React.createRef();

  onBlogClick = link => {
    window.open(link, "_blank");
  };

  onArrowClick = action => {
    let cur_global_font_value = 2.5;
    let cur_global_font_ratio =
      (window.innerWidth / 100) * cur_global_font_value;
    let width_change = 28 * cur_global_font_ratio;
    let interval = 1000 / width_change;
    let step_value = width_change / 10;
    let step_value_2 = step_value + 0.01;
    if (action === "+") {
      if (
        this.blogs_sub_wrapper.current.scrollWidth >=
        this.blogs_sub_wrapper.current.offsetWidth
      ) {
        this.setState({ scroll_next_width: width_change });
        let scroll_next = setInterval(() => {
          if (this.state.next_counter > this.state.scroll_next_width) {
            clearInterval(scroll_next);
            this.setState({ next_counter: 0 });
          } else {
            this.blogs_sub_wrapper.current.scrollLeft += step_value;
            this.setState(state => ({
              next_counter: state.next_counter + step_value_2
            }));
          }
        }, interval);
      }
    } else if (action === "-") {
      if (this.blogs_sub_wrapper.current.scrollLeft > 0) {
        this.setState({ scroll_prev_width: width_change });
        let scroll_prev = setInterval(() => {
          if (this.state.prev_counter > this.state.scroll_prev_width) {
            clearInterval(scroll_prev);
            this.setState({ prev_counter: 0 });
          } else {
            this.blogs_sub_wrapper.current.scrollLeft -= step_value;
            this.setState(state => ({
              prev_counter: state.prev_counter + step_value_2
            }));
          }
        }, interval);
      }
    }
  };

  render() {
    const { mobile_display } = this.props;

    let main_container_class = `shl-home__main-container shl-home--direction-column ${
      mobile_display
        ? "shl-home__main-container--padding-mobile"
        : "shl-home__main-container--padding-full"
    }`;

    return (
      <div className={main_container_class} id="blogs">
        <div className="shl-home__section-info-wrapper shl-home--flex shl-home--justify-centre u-margin-bottom-medium">
          <h2
            className={`shl-home__section-title-1${
              mobile_display
                ? "--mobile shl-home__section-title-1 shl-home--centre-text"
                : ""
            }`}
          >
            Check out our{" "}
            <span className="shl-home--highlight">latest blogs</span>
          </h2>
        </div>
        <div
          className={`shl-home__blog${
            mobile_display ? "--mobile shl-home__blog" : ""
          }`}
        >
          {!mobile_display && (
            <div className="shl-home__blog--main-blog-wrapper">
              <MainBlog blog={blogs[0]} onClick={this.onBlogClick} />
            </div>
          )}
          <div
            className={`shl-home__blog--sub-blog-wrapper ${
              mobile_display ? "shl-home__blog--sub-blog-wrapper--mobile" : ""
            }`}
            ref={this.blogs_sub_wrapper}
          >
            {!mobile_display &&
              blogs
                .slice(1)
                .map((blog, i) => <Blog key={i} blog={blog} onClick={this.onBlogClick} />)}

            {mobile_display &&
              blogs.map(blog => (
                <Blog blog={blog} {...this.props} onClick={this.onBlogClick} />
              ))}
          </div>

          {mobile_display && (
            <div className="shl-home__section-actions-wrapper shl-home__section-actions-wrapper--1 shl-home--space-between">
              <span className="shl-home__section-actions-wrapper--sub">
                <img
                  src="/icons/scholar-left-arrow.svg"
                  alt="left arrow"
                  className={`shl-home__arrow-icon${
                    mobile_display ? "--mobile shl-home__arrow-icon" : ""
                  }`}
                  onClick={() => this.onArrowClick("-")}
                />
                <img
                  src="/icons/scholar-right-arrow.svg"
                  alt="right arrow"
                  className={`shl-home__arrow-icon${
                    mobile_display ? "--mobile shl-home__arrow-icon" : ""
                  }`}
                  onClick={() => this.onArrowClick("+")}
                />
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Blogs;

import React, { Component } from "react";
import Link from "next/link"
import { useRouter } from "next/router"
// import {
//   scholar_left_arrow,
//   scholar_right_arrow
// } from "../../../../common/images";
import {
  IsActiveCourse,
  IsAvailableCourse,
  IsComingSoonCourse,
  IsInActiveCourse
} from "../../courses/components/Shared/logic";
import CourseCard from "../../courses/components/Shared/CourseCard";
import Loader from "../../../components/Loader/index";

class CourseListing extends Component {
  state = {
    next_counter: 0,
    scroll_next_width: 0,
    prev_counter: 0,
    scroll_prev_width: 0
  };

  onCourseCardClick = course_code => {
    const router = useRouter();
    router.push(`/courses/overview/${course_code}`);
    this.props.selectMarketPlaceCourse(course_code);
  };

  onArrowClick = action => {
    let cur_global_font_value = this.props.mobile_display ? 2.5 : 0.695;
    let cur_global_font_ratio =
      (window.innerWidth / 100) * cur_global_font_value;
    let width_change = 33 * cur_global_font_ratio;
    let interval = 1000 / width_change;
    let step_value = width_change / 10;
    let step_value_2 = step_value + 0.01;
    if (action === "+") {
      if (
        this.course_wrapper.current.scrollWidth >=
        this.course_wrapper.current.offsetWidth
      ) {
        this.setState({ scroll_next_width: width_change });
        let scroll_next = setInterval(() => {
          if (this.state.next_counter > this.state.scroll_next_width) {
            clearInterval(scroll_next);
            this.setState({ next_counter: 0 });
          } else {
            this.course_wrapper.current.scrollLeft += step_value;
            this.setState(state => ({
              next_counter: state.next_counter + step_value_2
            }));
          }
        }, interval);
      }
    } else if (action === "-") {
      if (this.course_wrapper.current.scrollLeft > 0) {
        this.setState({ scroll_prev_width: width_change });
        let scroll_prev = setInterval(() => {
          if (this.state.prev_counter > this.state.scroll_prev_width) {
            clearInterval(scroll_prev);
            this.setState({ prev_counter: 0 });
          } else {
            this.course_wrapper.current.scrollLeft -= step_value;
            this.setState(state => ({
              prev_counter: state.prev_counter + step_value_2
            }));
          }
        }, interval);
      }
    }
  };

  course_wrapper = React.createRef();

  render() {
    const { course_list, loading, mobile_display } = this.props;

    let main_container_class = `shl-home__main-container ${
      mobile_display
        ? "shl-home__main-container--padding-mobile shl-home--direction-column"
        : "shl-home__main-container--course-list shl-home__main-container--padding-full shl-home--align-centre"
    }`;

    return (
      <div className={main_container_class}>
        <div
          className={
            mobile_display
              ? "shl-home__sub-width-container--mobile"
              : "shl-home__sub-width-container"
          }
        >
          <div className="shl-home__section-info-wrapper">
            <h2 className="shl-home__section-title-1 u-margin-bottom-medium">
              <span className="shl-home--highlight">LEARN</span> our popular
              courses
            </h2>
            <p className="shl-home__section-info-text">
              70%+ of the participants finish the enrolled courses and get
              certified, driven by interactive problem solving on actual data
            </p>

            <div
              className={`shl-home__section-actions-wrapper shl-home__section-actions-wrapper--1 ${
                mobile_display
                  ? "shl-home--space-between"
                  : "u-margin-top-large"
              } `}
            >
              {!loading &&
                (mobile_display
                  ? course_list.length > 1
                  : course_list.length > 2) && (
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
                )}

              <Link
                href="/courses/all"
              >
                <a className={`shl-home--pointer shl-home__section-actions-wrapper--text${
                  mobile_display
                    ? "--mobile shl-home__section-actions-wrapper--text"
                    : ""
                }`}>View All</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="shl-home__courses">
          <div
            className={`shl-home__courses--wrapper${
              mobile_display ? "--mobile shl-home__courses--wrapper" : ""
            }`}
          >
            <div
              className="shl-home__courses--wrapper--inner"
              ref={this.course_wrapper}
            >
              {!loading ? (
                course_list.length > 0 &&
                course_list.map(item => (
                  <CourseCard
                    key={item.url_code}
                    course={item}
                    available={IsAvailableCourse(item)}
                    inactive={IsInActiveCourse(item)}
                    active={IsActiveCourse(item)}
                    coming_soon={IsComingSoonCourse(item)}
                    onClick={this.onCourseCardClick}
                  />
                ))
              ) : (
                <Loader
                  loading={loading}
                  is_component={true}
                  className={"ath-loading-component--transparent"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseListing;

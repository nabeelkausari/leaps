import React, { Component, Fragment } from "react";
import cx from "classnames";
import Loader from "../../../../components/Loader";
import CourseCard from "../Shared/CourseCard";
import {
  IsActiveCourse,
  IsAvailableCourse,
  IsComingSoonCourse,
  IsInActiveCourse
} from "../Shared/logic";
import { SearchInput } from "../../../../components/Forms/FormInput";
import get from "lodash/get";
import { AddIcon } from "../../../../../common/images";
import { Button } from "../../../../components/Buttons/Button";
import { withRouter } from "react-router-dom";

class CourseListView extends Component {
  state = {
    search_query: ""
  };

  setSearchQuery = e => {
    this.setState({ search_query: e.target.value });
  };

  createCourse = () => {
    this.props.history.push("/courses/create");
  };

  componentDidMount() {
    this.props.getCourses();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { is_logged_in, profile_loaded } = this.props;
    if (
      is_logged_in &&
      profile_loaded &&
      profile_loaded !== prevProps.profile_loaded
    ) {
      this.props.getCourses();
    }
  }

  render() {
    const {
      items,
      loading,
      is_logged_in,
      showCourseDetails,
      editCourse,
      is_creator
    } = this.props;
    const { search_query } = this.state;
    let final_search_query = search_query.toLowerCase();
    const course_list =
      final_search_query === ""
        ? items || []
        : (items || []).filter(
            item =>
              item.title &&
              item.title.toLowerCase().indexOf(final_search_query) >= 0
          );
    return (
      <div className="list-container">
        <Loader loading={loading} is_component />
        <div
          className={cx("list-container__search-wrapper", {
            "list-container__search-wrapper--1": !is_creator
          })}
        >
          {is_creator && (
            <Button
              variant="outline-primary"
              className="list-container__create-course"
              size="md"
              onClick={this.createCourse}
            >
              <AddIcon className="list-container__create--icon" />
              Create New Course
            </Button>
          )}
          <div className="list-container__search">
            <SearchInput
              placeholder="Search Course"
              name="search_query"
              onChange={this.setSearchQuery}
              value={search_query}
              type="text"
            />
          </div>
        </div>
        <div className="list-body">
          {!loading &&
            course_list.map(item => (
              <CourseCard
                key={item.url_code}
                course={item}
                available={IsAvailableCourse(item)}
                inactive={is_logged_in && IsInActiveCourse(item)}
                active={is_logged_in && IsActiveCourse(item)}
                coming_soon={IsComingSoonCourse(item)}
                onClick={showCourseDetails}
                edit={editCourse}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default withRouter(CourseListView);

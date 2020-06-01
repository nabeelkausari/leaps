import React, { useState } from "react";
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

const CourseListView = props => {
  const [search_query, setSearchQuery] = useState("")

  const {
    items,
    loading,
    showCourseDetails,
  } = props;
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
        className={cx("list-container__search-wrapper", "list-container__search-wrapper--1")}
      >
        <div className="list-container__search">
          <SearchInput
            placeholder="Search Course"
            name="search_query"
            onChange={e => setSearchQuery(e.target.value)}
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
            inactive={IsInActiveCourse(item)}
            active={IsActiveCourse(item)}
            coming_soon={IsComingSoonCourse(item)}
            onClick={showCourseDetails}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseListView;

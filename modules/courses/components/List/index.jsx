import React, { Component } from "react";
import get from "lodash/get";
import Layout from "../../../cases/components/List/shared/Layout";
import CourseListView from "./CourseListView";
import {
  IsActiveCourse,
  IsAvailableCourse,
  IsComingSoonCourse,
  IsCreatedCourse,
  IsInActiveCourse
} from "../Shared/logic";

const Categories = [
  {
    title: "All",
    to: "/courses/all"
  },
  {
    title: "Available",
    to: "/courses/available"
  },
  {
    title: "Upcoming",
    to: "/courses/upcoming"
  }
];

const AuthCategories = hide_enroll => {
  return [
    {
      title: "All",
      to: "/courses/all"
    },
    ...(!hide_enroll
      ? [
          {
            title: "Enrolled",
            to: "/courses/enrolled"
          }
        ]
      : []),
    {
      title: "Available",
      to: "/courses/available"
    },
    {
      title: "Upcoming",
      to: "/courses/upcoming"
    }
  ];
};

const getAuthCoursesList = props => {
  switch (props.match.url) {
    case "/courses/all":
      return {
        items: props.list.filter(
          course =>
            IsActiveCourse(course) ||
            IsComingSoonCourse(course) ||
            IsInActiveCourse(course)
        ),
        loading: props.marketplace_courses_loading,
        getCourses: props.getMarketPlaceCourses
      };
    case "/courses/enrolled":
      return {
        items: props.list.filter(course => IsActiveCourse(course)),
        loading: props.marketplace_courses_loading,
        getCourses: props.getMarketPlaceCourses
      };
    case "/courses/available":
      return {
        items: props.list.filter(course => IsInActiveCourse(course)),
        loading: props.marketplace_courses_loading,
        getCourses: props.getMarketPlaceCourses
      };
    case "/courses/upcoming":
      return {
        items: props.list.filter(course => IsComingSoonCourse(course)),
        loading: props.marketplace_courses_loading,
        getCourses: props.getMarketPlaceCourses
      };
    default:
      return props.history.push("/");
  }
};

const getCoursesList = props => {
  switch (props.match.url) {
    case "/courses/all":
      return {
        items: props.list.filter(
          course => IsAvailableCourse(course) || IsComingSoonCourse(course)
        ),
        loading: props.marketplace_courses_loading,
        getCourses: props.getMarketPlaceCourses
      };
    case "/courses/available":
      return {
        items: props.list.filter(course => IsAvailableCourse(course)),
        loading: props.marketplace_courses_loading,
        getCourses: props.getMarketPlaceCourses
      };
    case "/courses/upcoming":
      return {
        items: props.list.filter(course => IsComingSoonCourse(course)),
        loading: props.marketplace_courses_loading,
        getCourses: props.getMarketPlaceCourses
      };
    default:
      return props.history.push("/");
  }
};

class CourseList extends Component {
  showCourseDetails = course_code => {
    this.props.history.push(`/courses/overview/${course_code}`);
    this.props.selectMarketPlaceCourse(course_code);
  };

  editCourse = course_reference => {
    this.props.selectMarketPlaceCourse(course_reference);
    this.props.history.push(`/courses/${course_reference}/edit`);
  };

  render() {
    const { is_logged_in, profile_loaded, is_creator, list } = this.props;
    const course = is_logged_in
      ? getAuthCoursesList(this.props)
      : getCoursesList(this.props);
    const hide_enroll = list.length
      ? list.map(c => IsActiveCourse(c)).length === 0
      : true;
    const categories = is_logged_in ? AuthCategories(hide_enroll) : Categories;
    return (
      <div>
        <Layout title="Courses" categories={categories}>
          <CourseListView
            {...course}
            is_logged_in={is_logged_in}
            showCourseDetails={this.showCourseDetails}
            editCourse={this.editCourse}
            profile_loaded={profile_loaded}
            is_creator={is_creator}
          />
        </Layout>
      </div>
    );
  }
}

export default CourseList;

import React from "react";
import { useRouter } from "next/router"
import Layout from "../components/Layout";
import ListLayout from "../components/ListLayout";
import CourseListView from "../modules/courses/components/List/CourseListView"
import {
  IsAvailableCourse,
  IsComingSoonCourse
} from "../modules/courses/components/Shared/logic";

const categories = [
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

const getCoursesList = props => {
  const router = useRouter();
  switch (router.pathname) {
    case "/courses":
      return {
        items: [],
        // items: props.list.filter(
        //   course => IsAvailableCourse(course) || IsComingSoonCourse(course)
        // ),
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
      return router.push("/");
  }
};

const CourseList = props => {
  const router = useRouter();
  const showCourseDetails = course_code => {
    router.push(`/courses/overview/${course_code}`);
    // this.props.selectMarketPlaceCourse(course_code);
  };

  const courses = getCoursesList(props);


  return (
    <Layout>
      <ListLayout title="Courses" categories={categories}>
        <CourseListView
          {...courses}
          showCourseDetails={showCourseDetails}
        />
      </ListLayout>
    </Layout>
  );
}

export default CourseList;

import React from "react";
import nodeFetch from "node-fetch";
import { useRouter } from "next/router"
import Layout from "../components/Layout";
import ListLayout from "../components/ListLayout";
import CourseListView from "../modules/courses/components/List/CourseListView"
import {
  IsAvailableCourse,
  IsComingSoonCourse
} from "../modules/courses/components/Shared/logic";
import getStore from "../example/redux/store"
import {MARKETPLACE_COURSE_COLLECTION} from "../common/api/media-types"
import * as types from "../modules/courses/redux/types"
import {FETCH_WEBINARS_SUCCEEDED} from "../modules/home/redux/types"

const categories = [
  {
    title: "All",
    to: "/courses"
  },
  // {
  //   title: "Available",
  //   to: "/courses/available"
  // },
  // {
  //   title: "Upcoming",
  //   to: "/courses/upcoming"
  // }
];

const getCoursesList = props => {
  const router = useRouter();
  switch (router.pathname) {
    case "/courses":
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

export async function getServerSideProps() {
  const store = getStore();
  const get_marketplace_courses_default = {
    href: "/marketplace-courses",
    accept: MARKETPLACE_COURSE_COLLECTION
  };
  const url = "https://devapi.analyttica.com/marketplace-courses";
  const dummy_url = "http://www.mocky.io/v2/5ed3e0cd340000650001f518";
  const res = await nodeFetch(dummy_url);
  const courses = await res.json();

  const dispatchCourses = () => dispatch =>
    dispatch({
      type: types.FETCH_MARKETPLACE_COURSES_SUCCEEDED,
      payload: { courses, is_individual_course: false }
    });

  store.dispatch(dispatchCourses())

  return {
    props: {
      list: courses,
    },
  }
}

export default CourseList;

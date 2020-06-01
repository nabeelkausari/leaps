import React from "react";
import fetch from "node-fetch";
import { useRouter } from "next/router"
import {useDispatch, useSelector} from "react-redux"
import Layout from "../../components/Layout";
import ListLayout from "../../components/ListLayout";
import CourseListView from "../../modules/courses/components/List/CourseListView"
import {
  IsAvailableCourse,
  IsComingSoonCourse
} from "../../modules/courses/components/Shared/logic";
import * as types from "../../modules/courses/redux/types"
import {initializeStore} from "../../redux-config/store"
import {API_GATEWAY_URI} from "../../common/api/constants"

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
  const course_list = useSelector(state => state.courses);
  const showCourseDetails = course => {
    router.push(`/courses/[course]`, `/courses/${course}`);
  };

  const courses = getCoursesList(course_list);

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
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore


  const url = `${API_GATEWAY_URI}/marketplace-courses`;
  const options = {
    headers: {
      'Connection': 'keep-alive',
    }
  }
  const courses = await fetch(url, options).then(res => res.json())

  dispatch({
    type: types.FETCH_MARKETPLACE_COURSES_SUCCEEDED,
    payload: { courses, is_individual_course: false }
  });

  return {
    props: { initialReduxState: reduxStore.getState() },
  }
}

export default CourseList;

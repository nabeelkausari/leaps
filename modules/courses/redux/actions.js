import get from "lodash/get";
import { fetchLinkAs } from "../../../common/api/helpers";
import { notify } from "../../../common/utils/notification";
import * as types from "./types";
import {
  COURSE_REF,
  getCourseRef,
  removeCourseRef,
  setCourseRef
} from "../../../common/utils/storage";
import { MARKETPLACE_COURSE_COLLECTION } from "../../../common/api/media-types";

const get_marketplace_courses_default = {
  href: "/marketplace-courses",
  accept: MARKETPLACE_COURSE_COLLECTION
};

export const getMarketPlaceCourses = () => (dispatch, getState) => {

  const marketplace_course_link = get_marketplace_courses_default;
  removeCourseRef();
  dispatch({ type: types.FETCH_MARKETPLACE_COURSES_REQUESTED });
  fetchLinkAs(marketplace_course_link)
    .then(courses => {
      dispatch({
        type: types.FETCH_MARKETPLACE_COURSES_SUCCEEDED,
        payload: { courses, is_individual_course: false }
      });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_MARKETPLACE_COURSES_FAILED });
      notify.error("Error", error);
    });
};

export const getCourse = params_course_code => (dispatch, getState) => {
  dispatch({ type: types.FETCH_MARKETPLACE_COURSES_REQUESTED });
  const course_link_ref = getCourseRef();
  const course_link = course_link_ref && course_link_ref.course_link;
  const course_code = course_link_ref && course_link_ref.course_code;
  if (
    !course_link ||
    (params_course_code && params_course_code !== course_code)
  )
    return dispatch(getMarketPlaceCourses());
  fetchLinkAs(course_link)
    .then(courses => {
      dispatch({
        type: types.FETCH_MARKETPLACE_COURSES_SUCCEEDED,
        payload: { courses: [courses], is_individual_course: true }
      });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_MARKETPLACE_COURSES_FAILED });
      notify.error("Error", error);
    });
};

export const selectMarketPlaceCourse = course_reference => (
  dispatch,
  getState
) => {
  const {
    courses: { by_course_code }
  } = getState();
  const course_link = get(by_course_code[course_reference], "_links.self");
  dispatch({
    type: types.SET_SELECTED_COURSE_REFERENCE,
    payload: course_reference
  });
  setCourseRef(
    JSON.stringify({
      course_link: course_link,
      course_code: course_reference
    })
  );
};

export const fetchCourseInternal = () => (dispatch, getState) => {
  const course_link = getCourseRef().course_link;
  if (!course_link) return;
  fetchLinkAs(course_link)
    .then(courses => {
      dispatch(updateCourse(courses));
    })
    .catch(error => {
      console.log("failed to update course", error.message);
    });
};

export const updateCourse = course => (dispatch, getState) => {
  dispatch({ type: types.UPDATE_COURSE, payload: course });
};

export const updateAsCourseStarted = course_code => (dispatch, getState) => {
  const {
    courses: { by_course_code }
  } = getState();
  const course = by_course_code[course_code];
  if (course && course._links.start) {
    dispatch(fetchCourseInternal());
  }
};

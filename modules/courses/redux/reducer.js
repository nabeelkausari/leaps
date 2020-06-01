import { groupBy, map } from "ramda";
import { combineReducers } from "redux";
import * as types from "./types";
import { byUri } from "../../../common/utils/byUri";
import ModulesReducer from "../modules/courseModules/redux/reducer";
import concatenateReducers from "redux-concatenate-reducers";

const byCourseCode = courses =>
  map(
    courses => courses.shift(),
    groupBy(course => course.url_code, courses)
  );

const initialState = {
  list: [],
  by_course_code: {},
  by_uri: {},
  selected_course_reference: null,
  marketplace_courses_loading: null,
  fetch_marketplace_courses_succeeded: null,
  individual_course_loaded: null,
  single_course: null
};

const CourseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_MARKETPLACE_COURSES_REQUESTED:
      return {
        ...state,
        marketplace_courses_loading: true,
        fetch_marketplace_courses_requested: true,
        fetch_marketplace_courses_succeeded: null,
        fetch_marketplace_courses_failed: null
      };
    case types.FETCH_MARKETPLACE_COURSES_SUCCEEDED:
      return {
        ...state,
        marketplace_courses_loading: false,
        fetch_marketplace_courses_requested: null,
        fetch_marketplace_courses_succeeded: true,
        fetch_marketplace_courses_failed: false,
        individual_course_loaded: payload.is_individual_course,
        list: payload.courses,
        by_course_code: byCourseCode(payload.courses),
        by_uri: byUri(payload.courses)
      };
    case types.FETCH_MARKETPLACE_COURSES_FAILED:
      return {
        ...state,
        marketplace_courses_loading: false,
        fetch_marketplace_courses_requested: null,
        fetch_marketplace_courses_succeeded: false,
        fetch_marketplace_courses_failed: true
      };

    case types.SET_SELECTED_COURSE_REFERENCE:
      return {
        ...state,
        selected_course_reference: payload
      };

    case types.FETCH_SINGLE_COURSE_SUCCEEDED:
      return {
        ...state,
        single_course: payload
      };

    case types.UPDATE_COURSE:
      const items = [...state.list]
        .filter(item => item.course_id !== payload.course_id)
        .concat(payload);
      return {
        ...state,
        list: items,
        by_course_code: byCourseCode(items),
        by_uri: byUri(items)
      };

    default:
      return state;
  }
};

export default concatenateReducers([
  CourseReducer,
  combineReducers({
    modules: ModulesReducer
  })
]);


import * as types from "./types";
import { fetchLink, fetchLinkAs } from "../../../../../../common/api/helpers";
import { resumeCourse, updateAsCourseStarted } from "../../../redux/actions";
import { history } from "../../../../../../index";
import { notify } from "../../../../../../common/utils/notification";
import { setModuleContentReference } from "../../create/redux/actions";
import get from "lodash/get";
import {
  getCourseRef,
  getSolveLink
} from "../../../../../../common/utils/storage";
import {
  isCourseReviewer,
  isCreator
} from "../../../../../../common/utils/helperFunctions";

export const getModules = course_code => (dispatch, getState) => {
  const {
    courses: { by_course_code },
    auth: { is_logged_in },
    profile: { info }
  } = getState();
  const course = by_course_code[course_code];
  if (!course) return console.log("course not found");
  const modules_link = is_logged_in
    ? (course.category.toUpperCase() === "COURSE" &&
        course._links.enroll &&
        !isCourseReviewer(info)) ||
      (course.category.toUpperCase().includes("UPCOMING") && !isCreator(info))
      ? get(course, "_links.modules")
      : get(course, "_links.modules_contents_arranged")
    : get(course, "_links.modules");
  if (!modules_link) return console.log("modules_link not found");
  dispatch({ type: types.FETCH_COURSE_MODULES_REQUESTED });
  fetchLinkAs(modules_link)
    .then(modules =>
      dispatch({
        type: types.FETCH_COURSE_MODULES_SUCCEEDED,
        payload: { modules, course_code }
      })
    )
    .catch(payload =>
      dispatch({ type: types.FETCH_COURSE_MODULES_FAILED, payload })
    );
};

export const fetchModule = (
  link,
  module_reference,
  course_code,
  prev_module_content_reference = false,
  edit = false
) => (dispatch, getState) => {
  const {
    courses: {
      create: { selected_module_content_reference }
    }
  } = getState();
  dispatch({ type: types.FETCH_COURSE_MODULE_REQUESTED });
  fetchLinkAs(link)
    .then(module => {
      dispatch({
        type: types.FETCH_COURSE_MODULE_SUCCEEDED,
        payload: { module, module_reference, course_code }
      });
      if (prev_module_content_reference) {
        dispatch(setModuleContentReference(prev_module_content_reference));
      }
      const last_module_content = [...module.module_contents].pop();
      const last_module_content_href = get(
        last_module_content,
        "data._links.self.href"
      );
      if (selected_module_content_reference && edit) {
        dispatch(setModuleContentReference(selected_module_content_reference));
      }
      if (last_module_content_href && !prev_module_content_reference && !edit) {
        dispatch(setModuleContentReference(last_module_content_href));
      }
    })
    .catch(payload =>
      dispatch({ type: types.FETCH_COURSE_MODULE_FAILED, payload })
    );
};

export const updateModuleProgress = (module, course_code) => (
  dispatch,
  getState
) => {
  const params = { status: "STARTED" };
  fetchLink(module._links.updateModuleProgressStatus, params)
    .then(module =>
      dispatch(
        fetchModule(
          module._links.sequenced_module_content,
          module._links.self.href,
          course_code
        )
      )
    )
    .catch(payload => console.log(payload));
};

export const getModulesAndResumeCourse = course_code => (
  dispatch,
  getState
) => {
  const {
    courses: { by_course_code }
  } = getState();
  const course = by_course_code[course_code];
  if (!course) return console.log("course not found");
  dispatch({ type: types.FETCH_COURSE_MODULES_REQUESTED });
  fetchLinkAs(course._links.modules_contents_arranged)
    .then(modules => {
      dispatch({
        type: types.FETCH_COURSE_MODULES_SUCCEEDED,
        payload: { modules, course_code }
      });
      dispatch(resumeCourse(course_code));
    })
    .catch(payload =>
      dispatch({ type: types.FETCH_COURSE_MODULES_FAILED, payload })
    );
};

export const resumeModule = (course_code, module_reference) => (
  dispatch,
  getState
) => {
  const {
    courses: {
      modules: { by_uri }
    }
  } = getState();
  const module_by_uri = by_uri[module_reference];
  history.push(
    `/courses/${course_code}/modules/${module_by_uri.sequence_number}`
  );
};

export const updateQuizCompleteion = () => (dispatch, getState) => {
  const {
    quiz: {
      active_quiz: { id }
    }
  } = getState();
  dispatch({
    type: types.UPDATE_QUIZ_COMPLETION,
    payload: id
  });
};

export const markModuleContentAsViewed = (
  link,
  module_content_ref,
  module_ref,
  course_code
) => (dispatch, getState) => {
  const {
    courses: { by_course_code }
  } = getState();
  fetchLinkAs(link)
    .then(response => {
      dispatch({
        type: types.UPDATE_VIEW_COUNT,
        payload: {
          module_content_ref,
          module_ref,
          view_count: response.view_count,
          course_code,
          course_uri: by_course_code[course_code]._links.self.href
        }
      });
      dispatch(updateAsCourseStarted(course_code));
    })
    .catch(error => notify.error("Failed to mark as viewed", error.message));
};

export const updateSolveStatus = () => (dispatch, getState) => {
  let solve_href = getSolveLink();
  let course_ref = getCourseRef();
  dispatch({
    type: types.UPDATE_SOLVE_STATUS,
    payload: {
      solve_link: solve_href,
      course_code: course_ref.course_code,
      course_uri: course_ref.course_link.href
    }
  });
};

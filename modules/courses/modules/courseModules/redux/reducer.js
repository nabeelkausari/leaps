import { groupBy } from "ramda";
import get from "lodash/get";
import * as types from "./types";
import { byUri } from "../../../../../common/utils/byUri";

const initialState = {
  course_modules_loading: null,
  fetch_course_modules_requested: null,
  fetch_course_modules_succeeded: null,
  fetch_course_modules_failed: null,

  fetch_course_module_requested: null,
  fetch_course_module_succeeded: null,
  fetch_course_module_failed: null,

  items: [],
  by_uri: {},
  by_course_uri: {},
  by_course_code: {}
};

const byCourseUri = modules =>
  groupBy(item => item._links.course.href, modules);

export default (state = initialState, { type, payload }) => {
  let items;
  let by_uri;
  let by_course_uri;
  let by_course_code;
  switch (type) {
    case types.FETCH_COURSE_MODULES_REQUESTED:
      return {
        ...state,
        fetch_course_modules_requested: true,
        fetch_course_modules_succeeded: null,
        fetch_course_modules_failed: null
      };
    case types.FETCH_COURSE_MODULES_SUCCEEDED:
      const module_uris = payload.modules.map(m => m._links.self.href);
      items = state.items
        .filter(m => module_uris.indexOf(m._links.self.href) === -1)
        .concat(
          payload.modules.sort((a, b) => a.sequence_number - b.sequence_number)
        );
      by_uri = byUri(items);
      by_course_uri = byCourseUri(items);
      by_course_code = {
        ...state.by_course_code,
        [payload.course_code]: payload.modules.sort(
          (a, b) => a.sequence_number - b.sequence_number
        )
      };

      return {
        ...state,
        fetch_course_modules_requested: null,
        fetch_course_modules_succeeded: true,
        fetch_course_modules_failed: false,
        items,
        by_uri,
        by_course_uri,
        by_course_code
      };
    case types.FETCH_COURSE_MODULES_FAILED:
      return {
        ...state,
        fetch_course_modules_requested: null,
        fetch_course_modules_succeeded: false,
        fetch_course_modules_failed: true
      };
    case types.FETCH_COURSE_MODULE_REQUESTED:
      return {
        ...state,
        fetch_course_module_requested: true,
        fetch_course_module_succeeded: null,
        fetch_course_module_failed: null
      };

    case types.FETCH_COURSE_MODULE_SUCCEEDED:
      items = [...state.items]
        .filter(m => m._links.self.href !== payload.module_reference)
        .concat(payload.module)
        .sort((a, b) => a.sequence_number - b.sequence_number);
      by_uri = byUri(items);
      by_course_uri = byCourseUri(items);
      by_course_code = {
        ...state.by_course_code,
        [payload.course_code]: [...state.by_course_code[payload.course_code]]
          .filter(m => m._links.self.href !== payload.module_reference)
          .concat(payload.module)
          .sort((a, b) => a.sequence_number - b.sequence_number)
      };
      return {
        ...state,
        fetch_course_module_requested: false,
        fetch_course_module_succeeded: true,
        fetch_course_module_failed: false,
        items,
        by_uri,
        by_course_uri,
        by_course_code
      };
    case types.FETCH_COURSE_MODULE_FAILED:
      return {
        ...state,
        fetch_course_module_requested: false,
        fetch_course_module_succeeded: false,
        fetch_course_module_failed: true
      };

    case types.UPDATE_VIEW_COUNT:
      const modules = [...state.items];
      modules.forEach(m => {
        if (m._links.self.href === payload.module_ref) {
          m.module_contents.forEach(mc => {
            if (
              get(mc, "data._links.self.href") === payload.module_content_ref
            ) {
              if (mc.type === "VIDEO" || mc.type === "PDF") {
                mc.data.view_count = payload.view_count;
              } else if (mc.type === "WEBINAR") {
                mc.data.viewed = true;
              }
            }
          });
        }
      });
      by_uri = byUri(modules);
      by_course_uri = byCourseUri(modules);
      by_course_code = {
        ...state.by_course_code,
        [payload.course_code]: modules.filter(
          m => m._links.course.href === payload.course_uri
        )
      };
      return {
        ...state,
        items: modules,
        by_uri,
        by_course_uri,
        by_course_code
      };

    case types.UPDATE_SOLVE_STATUS:
      const updated_modules = [...state.items];
      updated_modules.forEach(m => {
        m.module_contents.forEach(mc => {
          if (get(mc, "data._links.self.href") === payload.solve_link.href) {
            mc.data.progress_status = "COMPLETED";
          }
        });
      });
      by_uri = byUri(updated_modules);
      by_course_uri = byCourseUri(updated_modules);
      by_course_code = {
        ...state.by_course_code,
        [payload.course_code]: updated_modules.filter(
          m => m._links.course.href === payload.course_uri
        )
      };
      return {
        ...state,
        items: updated_modules,
        by_uri,
        by_course_uri,
        by_course_code
      };

    case types.UPDATE_QUIZ_COMPLETION:
      const module_list = [...state.items];
      module_list.forEach(m => {
        m.module_contents.forEach(mc => {
          if (mc.data.id === payload) {
            mc.data.progress_status = "COMPLETED";
          }
        });
      });
      by_uri = byUri(module_list);
      by_course_uri = byCourseUri(module_list);
      by_course_code = {
        ...state.by_course_code,
        [payload.course_code]: module_list
      };
      return {
        ...state,
        items: module_list,
        by_uri,
        by_course_uri,
        by_course_code
      };

    default:
      return state;
  }
};

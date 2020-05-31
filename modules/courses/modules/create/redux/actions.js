import get from "lodash/get";
import { notify } from "../../../../../../common/utils/notification";
import * as types from "./types";
import { fetchLink, fetchLinkAs } from "../../../../../../common/api/helpers";
import { fetchModule, getModules } from "../../courseModules/redux/actions";
import { authorizer } from "../../../../../../common/api/auth";
import { API_GATEWAY_URI } from "../../../../../../common/api/constants";
import { updateCourse } from "../../../redux/actions";
import { dialogs } from "../../../../toPublish/Dialog";
import { history } from "../../../../../../index";

export const setLoading = params => (dispatch, getState) => {
  dispatch({ type: types.SET_LOADING });
};
export const resetLoading = params => (dispatch, getState) => {
  dispatch({ type: types.RESET_LOADING });
};

export const createCourse = params => (dispatch, getState) => {
  const {
    profile: { info }
  } = getState();
  const create_course_link = info._links.create_course;
  if (!create_course_link) return console.log("course link not found");
  fetchLinkAs(create_course_link, params)
    .then(course => {
      dispatch(updateCourse(course));
      notify.success("Success", "Successfully created the course");
      history.push(`/courses/course_storyboard/${course.url_code}`);
    })
    .catch(error => {
      notify.error("Something went wrong while creating course", error.message);
    });
};
export const editCourse = (course, params) => (dispatch, getState) => {
  const edit_course_link = course._links.editCourse;
  if (!edit_course_link) return console.log("edit course link not found");
  fetchLinkAs(edit_course_link, params)
    .then(course => {
      dispatch(updateCourse(course));
      notify.success("Success", "Successfully saved the course");
      history.push(`/courses/course_storyboard/${course.url_code}`);
    })
    .catch(error => {
      notify.error("Something went wrong while creating course", error.message);
    });
};

export const initiateCourseToEdit = course_code => (dispatch, getState) => {
  dispatch({
    type: types.INITIATE_EDIT_COURSE,
    payload: course_code
  });
};

export const setModuleReference = module_reference => (dispatch, getState) => {
  const {
    courses: {
      modules: { by_uri }
    }
  } = getState();
  const module_content_reference = by_uri[
    module_reference
  ].module_contents.sort((a, b) => a.module_seq_id - b.module_seq_id)[0].data
    ._links.self.href;
  dispatch({ type: types.SET_MODULE_REFERENCE, payload: module_reference });
  dispatch(setModuleContentReference(module_content_reference));
};

export const setModuleContentReference = module_content_reference => (
  dispatch,
  getState
) => {
  dispatch({
    type: types.SET_MODULE_CONTENT_REFERENCE,
    payload: module_content_reference
  });
};

export const updateModuleContentSequence = (module_reference, params) => (
  dispatch,
  getState
) => {
  const {
    courses: {
      modules: { by_uri }
    }
  } = getState();
  const module = by_uri[module_reference];
  if (!module) return console.log("module not found");
  fetchLink(module._links.resequenceModuleComponent, params)
    .then(response => {
      notify.success("Success", "Successfully rearranged module items ");
    })
    .catch(error => {
      notify.error(
        "Error",
        "Something went wrong while rearranging the module items"
      );
    });
};

export const deleteModuleContent = (
  link,
  module_content_uri,
  module_link,
  sequenced_module_content
) => (dispatch, getState) => {
  const {
    courses: {
      modules: { by_uri },
      create: {
        selected_course_code,
        selected_module_reference,
        selected_module_content_reference
      }
    }
  } = getState();
  fetchLink(link)
    .then(() => {
      let previous_module_content = null;
      if (module_content_uri === selected_module_content_reference) {
        const module = by_uri[selected_module_reference];

        module.module_contents.forEach((content, i) => {
          if (content.data._links.self.href === module_content_uri) {
            previous_module_content = module.module_contents[i - 1];
          }
        });
      }
      dispatch(
        fetchModule(
          sequenced_module_content,
          module_link,
          selected_course_code,
          get(previous_module_content, "data._links.self.href") || null
        )
      );
      notify.success("Success", "Successfully deleted");
    })
    .catch(reason => {
      notify.error("Operation failed", reason.message);
    });
};

export const saveModuleInputs = (name, value) => (dispatch, getState) => {
  dispatch({ type: types.SAVE_MODULE_INPUTS_DATA, payload: { name, value } });
};

export const resetModuleInputs = () => (dispatch, getState) => {
  dispatch({ type: types.RESET_MODULE_INPUTS_DATA });
};

export const createModule = course => (dispatch, getState) => {
  const {
    courses: {
      create: { module }
    }
  } = getState();
  fetchLink(course._links.createModule, module)
    .then(() => {
      notify.success("Success", "Module has been created");
      return dispatch(getModules(course.url_code));
    })
    .catch(reason => {
      notify.error("Operation failed", reason.message);
    });
};
export const editModule = (module, course_code) => (dispatch, getState) => {
  const {
    courses: { create }
  } = getState();
  fetchLinkAs(module._links.editModule, create.module)
    .then(() => {
      notify.success("Success", "Module details saved");
      return dispatch(
        fetchModule(
          module._links.sequenced_module_content,
          module._links.self.href,
          course_code,
          false,
          true
        )
      );
    })
    .catch(reason => {
      notify.error("Operation failed", reason.message);
    });
};
export const deleteModule = (module, course_code) => (dispatch, getState) => {
  const delete_module_link = get(module, "_links.deleteModule");
  fetchLink(delete_module_link)
    .then(() => {
      notify.success("Success", "Successfully deleted the module");
      return dispatch(getModules(course_code));
    })
    .catch(reason => {
      notify.error("Operation failed", reason.message);
    });
};

export const createOrEditModuleContent = (
  link,
  params,
  module_link,
  sequenced_module_content
) => (dispatch, getState) => {
  const {
    courses: {
      create: { selected_course_code }
    }
  } = getState();
  dispatch(setLoading());
  fetchLink(link, params)
    .then(() => {
      dispatch(resetLoading());
      notify.success("Success", "Successfully saved");
      dispatch(
        fetchModule(sequenced_module_content, module_link, selected_course_code)
      );
    })
    .catch(reason => {
      dispatch(resetLoading());
      notify.error("Operation failed", reason.message);
    });
};

export const createVideo = (
  link,
  param,
  module_link,
  sequenced_module_content
) => (dispatch, getState) => {
  const {
    courses: {
      create: { selected_course_code }
    }
  } = getState();
  dispatch(setLoading());
  const authorization = authorizer.getHeader();
  fetch(`${API_GATEWAY_URI}${link.href}`, {
    method: link.method,
    headers: {
      Authorization: authorization
    },
    body: param
  })
    .then(res => {
      res.json().then(response => {
        dispatch(resetLoading());
        if (response.uploadStatus !== undefined) {
          notify.success("Success", "Video has been created");
          return dispatch(
            fetchModule(
              sequenced_module_content,
              module_link,
              selected_course_code
            )
          );
        } else {
          dispatch(resetLoading());
          notify.error("Operation failed", response.message);
        }
      });
    })
    .catch(reason => {
      console.log(reason);
    });
};

export const editVideo = (
  link,
  param,
  module_link,
  sequenced_module_content
) => (dispatch, getState) => {
  const {
    courses: {
      create: { selected_course_code }
    }
  } = getState();
  dispatch(setLoading());
  fetchLink(link, param)
    .then(() => {
      dispatch(resetLoading());
      notify.success("Success", "Successfully saved");
      return dispatch(
        fetchModule(
          sequenced_module_content,
          module_link,
          selected_course_code,
          false,
          true
        )
      );
    })
    .catch(reason => {
      dispatch(resetLoading());
      notify.error("Operation failed", reason.message);
    });
};
export const createPdf = (
  link,
  param,
  module_link,
  sequenced_module_content
) => (dispatch, getState) => {
  const {
    courses: {
      create: { selected_course_code }
    }
  } = getState();
  dispatch(setLoading());
  const authorization = authorizer.getHeader();
  fetch(`${API_GATEWAY_URI}${link.href.replace("?documentName", "")}`, {
    method: link.method,
    headers: {
      Authorization: authorization
    },
    body: param
  })
    .then(res => {
      res.json().then(response => {
        dispatch(resetLoading());
        if (response.uploadStatus !== undefined) {
          notify.success("Success", "Pdf has been created");
          return dispatch(
            fetchModule(
              sequenced_module_content,
              module_link,
              selected_course_code
            )
          );
        } else {
          dispatch(resetLoading());
          notify.error("Operation failed", response.message);
        }
      });
    })
    .catch(reason => {
      console.log(reason);
    });
};

export const editPdf = (link, param, module_link, sequenced_module_content) => (
  dispatch,
  getState
) => {
  const {
    courses: {
      create: { selected_course_code }
    }
  } = getState();
  dispatch(setLoading());
  fetchLink(link, param)
    .then(() => {
      dispatch(resetLoading());
      notify.success("Success", "Successfully saved");
      return dispatch(
        fetchModule(
          sequenced_module_content,
          module_link,
          selected_course_code,
          false,
          true
        )
      );
    })
    .catch(reason => {
      dispatch(resetLoading());
      notify.error("Operation failed", reason.message);
    });
};

export const makeCoursePublic = course_code => (dispatch, getState) => {
  dispatch(changeStatus(course_code, { status: "Active" }));
};
export const makeCourseHidden = course_code => (dispatch, getState) => {
  dispatch(changeStatus(course_code, { status: "Created" }));
};

export const changeStatus = (course_code, status) => (dispatch, getState) => {
  const {
    courses: { by_course_code }
  } = getState();
  const course = by_course_code[course_code];
  dispatch(setLoading());
  fetchLinkAs(course._links.change_visibility, status)
    .then(course => {
      dispatch(updateCourse(course));
      dispatch(resetLoading());
      notify.success("Success", "Successfully changed the course visibility");
    })
    .catch(reason => {
      dispatch(resetLoading());
      notify.error("Couldn't change course visibility", reason.message);
    });
};

export const publishCourse = (course_code, text) => (dispatch, getState) => {
  const {
    courses: { by_course_code }
  } = getState();
  const course = by_course_code[course_code];
  dispatch(setLoading());
  fetchLinkAs(course._links.publish)
    .then(course => {
      dispatch(updateCourse(course));
      dispatch(resetLoading());
      notify.success("Success", `Successfully ${text}ed the course`);
    })
    .catch(reason => {
      dispatch(resetLoading());
      notify.error(`Couldn't ${text} the course`, reason.message);
    });
};

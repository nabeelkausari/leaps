import { connect } from "react-redux";
import { getCourse } from "../../../redux/actions";
import { getModules } from "../../courseModules/redux/actions";
import {
  createModule,
  createOrEditModuleContent,
  createPdf,
  createVideo,
  deleteModule,
  deleteModuleContent,
  editModule,
  editPdf,
  editVideo,
  initiateCourseToEdit,
  resetModuleInputs,
  saveModuleInputs,
  setModuleContentReference,
  setModuleReference,
  updateModuleContentSequence
} from "../redux/actions";
import { dialogs } from "../../../../toPublish/Dialog";

const mapStateToProps = (
  state,
  {
    match: {
      params: { course_code }
    }
  }
) => {
  const {
    courses: {
      marketplace_courses_loading,
      fetch_marketplace_courses_succeeded,
      modules: {
        fetch_course_modules_requested,
        fetch_course_modules_succeeded,
        fetch_course_module_succeeded,
        by_course_code
      },
      create: {
        selected_module_reference,
        selected_module_content_reference,
        loading,
        module
      }
    }
  } = state;

  return {
    fetch_course_modules_succeeded,
    fetch_course_module_succeeded,
    course: state.courses.by_course_code[course_code],
    list: by_course_code[course_code],
    fetch_marketplace_courses_succeeded,
    selected_module_reference,
    selected_module_content_reference,
    is_loading: marketplace_courses_loading || fetch_course_modules_requested,
    is_content_saving: loading,
    create_module: module
  };
};

export default connect(mapStateToProps, {
  setModuleReference,
  setModuleContentReference,
  saveModuleInputs,
  getCourse,
  getModules,
  updateModuleContentSequence,
  showDialog: dialogs.show,
  createModule,
  initiateCourseToEdit,
  createOrEditModuleContent,
  deleteModuleContent,
  createVideo,
  editVideo,
  createPdf,
  editPdf,
  resetModuleInputs,
  editModule,
  deleteModule
});

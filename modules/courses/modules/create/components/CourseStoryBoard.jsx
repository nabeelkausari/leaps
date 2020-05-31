import React, { Component } from "react";
import { camelCase, upperFirst } from "lodash";
import CourseStoryBoardContainer from "../containers/CourseStoryBoard";
import Loader from "../../../../../components/Loader";
import CourseContentList from "./CourseContentList";
import PdfInput from "./ContentInput/PdfInput";
import VideoInput from "./ContentInput/VideoInput";
import WebinarInput from "./ContentInput/WebinarInput";
import QuizInput from "./ContentInput/QuizInput";
import ApplyInput from "./ContentInput/ApplyInput";
import SolveInput from "./ContentInput/SolveInput";
import OverviewInput from "./ContentInput/OverviewInput";
import EmptyModules from "./ContentInput/EmptyModules";
import AddModule from "./AddModule";
import { fetchLink } from "../../../../../../common/api/helpers";
import { byUri } from "../../../../../../common/utils/byUri";
import { notify } from "../../../../../../common/utils/notification";
// import CourseContentList from "./CourseContentList";

const dummy_self_href = "2c52c54281ffda98357d89e2b48bacff";

class CourseStoryBoard extends Component {
  state = {
    is_new_content: false,
    new_content_type: null,
    upload_link: null
  };
  componentDidMount() {
    const {
      course,
      getCourse,
      getModules,
      match: {
        params: { course_code }
      }
    } = this.props;
    if (!course) {
      getCourse();
    }

    getModules(course_code);

    fetchLink({
      href: "/course/uploadSolve",
      type: "application/json",
      accept: "application/json"
    })
      .then(res => {
        res.json().then(result => {
          const upload_link = result.file_upload_url;
          this.setState({
            upload_link
          });
        });
      })
      .catch(reason => console.log(reason.message));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetch_marketplace_courses_succeeded,
      getModules,
      fetch_course_modules_succeeded,
      initiateCourseToEdit,
      setModuleReference,
      fetch_course_module_succeeded,
      list,
      setModuleContentReference,
      selected_module_reference,
      match: {
        params: { course_code }
      }
    } = this.props;

    if (
      fetch_marketplace_courses_succeeded &&
      fetch_marketplace_courses_succeeded !==
        prevProps.fetch_marketplace_courses_succeeded
    ) {
      getModules(course_code);
    }
    if (
      fetch_course_module_succeeded &&
      fetch_course_module_succeeded !== prevProps.fetch_course_module_succeeded
    ) {
      // const module = byUri(list)[selected_module_reference];
      // const last_content = module.module_contents.sort(
      //   (a, b) => b.module_seq - a.module_seq
      // )[0];
      // setModuleContentReference(last_content.data._links.self.href);
      this.deleteNewContent();
    }
    if (
      fetch_course_modules_succeeded &&
      fetch_course_modules_succeeded !==
        prevProps.fetch_course_modules_succeeded
    ) {
      initiateCourseToEdit(course_code);
      if (list.length) {
        setModuleReference(list[0]._links.self.href);
      }
    }
  }

  handleModuleContentAdd = type => {
    this.setState({
      is_new_content: true,
      new_content_type: type
    });
  };

  setModuleContentReference = module_content_ref => {
    const { is_new_content } = this.state;
    if (is_new_content)
      this.setState({ is_new_content: false, new_content_type: null });
    this.props.setModuleContentReference(module_content_ref);
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  deleteNewContent = () => {
    this.setState({ is_new_content: false, new_content_type: null });
  };

  validateCreateModule = () => {
    const { create_module } = this.props;
    if (create_module.name === "") {
      notify.error("Module name is mandatory");
      return false;
    } else if (!(Number(create_module.duration) > 0)) {
      notify.error("Invalid Duration");
      return false;
    }
    return true;
  };

  createModule = () => {
    const { course, createModule, resetModuleInputs } = this.props;
    resetModuleInputs();
    this.props.showDialog({
      title: "Add module",
      Component: AddModule,
      yesButton: {
        text: "Create",
        onClick: () => {
          if (this.validateCreateModule()) {
            createModule(course);
            return true;
          }
          return false;
        }
      },
      noButton: {
        text: "Cancel"
      }
    });
  };

  editModule = module => {
    const { course, editModule, saveModuleInputs } = this.props;
    saveModuleInputs("name", module.title);
    saveModuleInputs("duration", module.module_duration);
    saveModuleInputs("description", module.description);
    saveModuleInputs("sequence", module.sequence_number);
    this.props.showDialog({
      title: `Edit module:  ${module.title}`,
      Component: AddModule,
      yesButton: {
        text: "Save",
        onClick: () => {
          if (this.validateCreateModule()) {
            editModule(module, course.url_code);
            return true;
          }
          return false;
        }
      },
      noButton: {
        text: "Cancel"
      }
    });
  };

  deleteModule = module => {
    const {
      deleteModule,
      match: {
        params: { course_code }
      }
    } = this.props;
    deleteModule(module, course_code);
  };

  render() {
    const {
      is_loading,
      is_content_saving,
      course,
      selected_module_reference,
      selected_module_content_reference,
      list,
      setModuleReference,
      createOrEditModuleContent,
      updateModuleContentSequence,
      deleteModuleContent,
      createVideo,
      editVideo,
      editPdf,
      createPdf
    } = this.props;
    const { is_new_content, new_content_type, upload_link } = this.state;
    const modules_list_by_uri = (list && byUri(list)) || {};
    let selected_module = modules_list_by_uri[selected_module_reference];
    if (selected_module) {
      const module_contents_by_uri = {};
      selected_module.module_contents
        .sort((a, b) => a.module_seq_id - b.module_seq_id)
        .forEach(mc => {
          if (mc.data._links.self)
            module_contents_by_uri[mc.data._links.self.href] = { ...mc };
        });
      selected_module["module_contents_by_uri"] = module_contents_by_uri;
    }

    const selected_module_content =
      selected_module &&
      selected_module.module_contents_by_uri[selected_module_content_reference];
    const type =
      selected_module_content &&
      (!is_new_content ? selected_module_content.type : new_content_type);
    const data = !is_new_content
      ? selected_module_content && selected_module_content.data
      : {
          ["_links"]: {
            ["self"]: { ["href"]: dummy_self_href }
          },
          title: `New ${upperFirst(camelCase(type))} content`,
          name: `New ${upperFirst(camelCase(type))} content`,
          details: {
            name: `New ${upperFirst(camelCase(type))} content`
          }
        };
    return (
      <div className="course-creator">
        <Loader loading={is_loading} />
        <div className="course-creator__structure-panel">
          <CourseContentList
            course={course}
            new_module_content_data={data}
            is_new_content={is_new_content}
            selected_module_reference={selected_module_reference}
            selected_module_content_reference={
              selected_module_content_reference
            }
            selected_module={selected_module}
            module_list={list}
            setModuleReference={setModuleReference}
            handleBack={this.handleBack}
            setModuleContentReference={this.setModuleContentReference}
            handleModuleContentAdd={this.handleModuleContentAdd}
            updateModuleContentSequence={updateModuleContentSequence}
            createModule={this.createModule}
            editModule={this.editModule}
            deleteModule={this.deleteModule}
            deleteNewContent={this.deleteNewContent}
            deleteModuleContent={deleteModuleContent}
          />
        </div>
        <div className="course-creator__input-board">
          {(() => {
            if (!selected_module_content) return;
            return (
              <div className="content-input">
                <div className="content-input__title-wrapper">
                  {getContentTitle(type, is_new_content)}
                </div>
                {(() => {
                  switch (type) {
                    case "MATERIAL":
                      return (
                        <OverviewInput
                          loading={is_content_saving}
                          selected_module={selected_module}
                          content_data={data}
                          // saveOverView={saveOverView}
                        />
                      );
                    case "SOLVE":
                      return (
                        <SolveInput
                          loading={is_content_saving}
                          uploadLink={upload_link}
                          selected_module={selected_module}
                          content_data={data}
                          is_new_content={is_new_content}
                          createOrEditModuleSolve={createOrEditModuleContent}
                        />
                      );
                    case "APPLY":
                      return (
                        <ApplyInput
                          loading={is_content_saving}
                          uploadLink={upload_link}
                          selected_module={selected_module}
                          content_data={data}
                          is_new_content={is_new_content}
                          createOrEditModuleSolve={createOrEditModuleContent}
                        />
                      );
                    case "QUIZ":
                      return (
                        <QuizInput
                          // showError={showError}
                          loading={is_content_saving}
                          selected_module={selected_module}
                          content_data={data}
                          is_new_content={is_new_content}
                          createQuiz={createOrEditModuleContent}
                          // deleteQuizAtoms={deleteQuizAtoms}
                        />
                      );
                    case "WEBINAR":
                      return (
                        <WebinarInput
                          // showError={showError}
                          loading={is_content_saving}
                          selected_module={selected_module}
                          content_data={data}
                          is_new_content={is_new_content}
                          createOrUpdateWebinar={createOrEditModuleContent}
                        />
                      );
                    case "VIDEO":
                      return (
                        <VideoInput
                          // showError={showError}
                          loading={is_content_saving}
                          selected_module={selected_module}
                          content_data={data}
                          is_new_content={is_new_content}
                          createVideo={createVideo}
                          editVideo={editVideo}
                        />
                      );
                    case "PDF":
                      return (
                        <PdfInput
                          // showError={showError}
                          loading={is_content_saving}
                          selected_module={selected_module}
                          content_data={data}
                          is_new_content={is_new_content}
                          createPdf={createPdf}
                          editPdf={editPdf}
                        />
                      );
                    default:
                      return <EmptyModules />;
                  }
                })()}
              </div>
            );
          })()}
        </div>
      </div>
    );
  }
}

export default CourseStoryBoardContainer(CourseStoryBoard);

const getContentTitle = (type, is_new_content) => {
  switch (type) {
    case "SOLVE":
      return is_new_content ? "New Solve" : "Solve";
    case "QUIZ":
      return is_new_content ? "New Quiz" : "Quiz";
    case "APPLY":
      return is_new_content ? "New Data Case" : "Data Case";
    case "PDF":
      return is_new_content ? "New Pdf" : "Pdf";
    case "WEBINAR":
      return is_new_content ? "New Webinar" : "Webinar";
    case "VIDEO":
      return is_new_content ? "New Video" : "Video";
    case "MATERIAL":
      return "Overview";
    default:
      return null;
  }
};

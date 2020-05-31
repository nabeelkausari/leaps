import React, { Component } from "react";
import Input from "../../../../../components/Forms/Input";
import { validateCourseCode } from "../../../../../../common/utils/validate";
import Loader from "../../../../../components/Loader";
import { LeftArrowIcon } from "../../../../../../common/images";
import { isEqual } from "lodash";

class EditCourse extends Component {
  state = {
    name: "",
    code: "",
    urlCode: "",
    description: "",
    courseCreator: {
      name: ""
    },
    courseDuration: 90,
    category: "UPCOMING_COURSE",
    prices: [
      {
        price: 0,
        discount: 0,
        currency: "INR"
      },
      {
        price: 0,
        discount: 0,
        currency: "USD"
      }
    ],
    isFreeTrial: true,
    show_dropdown: false
  };

  initializeCoursForEdit = course => {
    const {
      title,
      description,
      code,
      url_code,
      author,
      duration,
      category
    } = course;
    this.setState({
      name: title,
      code,
      urlCode: url_code,
      description: description,
      courseCreator: {
        name: author.name
      },
      courseDuration: parseInt(duration),
      category
    });
  };

  componentDidMount() {
    const { course, getCourse } = this.props;
    if (!course) {
      getCourse();
    } else {
      this.initializeCoursForEdit(course);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fetch_marketplace_courses_succeeded, course } = this.props;
    if (
      fetch_marketplace_courses_succeeded &&
      fetch_marketplace_courses_succeeded !==
        prevProps.fetch_marketplace_courses_succeeded
    ) {
      this.initializeCoursForEdit(course);
    }

    if (!isEqual(course, prevProps.course)) {
      this.initializeCoursForEdit(course);
    }
  }

  hanldeBackBtnClick = () => {
    this.props.history.goBack();
  };

  setToState = (name, value) => {
    this.setState({ [name]: value });
  };

  handleEditCourse = () => {
    const { editCourse, course } = this.props;
    editCourse(course, this.state);
  };

  onInputChange = (name, value) => {
    switch (name) {
      case "code":
      case "urlCode":
        return validateCourseCode(value) && this.setToState(name, value);
      case "courseCreator":
        return this.setState({ [name]: { name: value } });
      default:
        this.setToState(name, value);
    }
  };

  selectVisibility = v => {
    const {
      match: {
        params: { course_code }
      }
    } = this.props;
    this.handleVisibility();
    if (v === "me") {
      this.props.makeCourseHidden(course_code);
    } else {
      this.props.makeCoursePublic(course_code);
    }
  };

  handleVisibility = () => {
    this.setState({ show_dropdown: !this.state.show_dropdown });
  };

  handlePublish = text => {
    const {
      match: {
        params: { course_code }
      }
    } = this.props;
    this.props.showDialog({
      title: `Are you sure you want to ${text} the course ?`,
      yesButton: {
        text: "Yes",
        onClick: () => {
          this.props.publishCourse(course_code, text);
          return true;
        }
      },
      noButton: {
        text: "No"
      }
    });
  };

  render() {
    const {
      name,
      code,
      urlCode,
      courseCreator,
      description,
      courseDuration,
      show_dropdown
    } = this.state;
    const {
      marketplace_courses_loading,
      course,
      publish,
      unPublishCourse
    } = this.props;
    const category = course && course.category;
    const canPublish = course && !!course._links.publish;
    const isVisibilityPublic =
      !!course && course.isVisibilityPublic !== undefined
        ? course.isVisibilityPublic
        : true;

    return (
      <div className="course-detail">
        <Loader loading={marketplace_courses_loading} is_component />
        <div className="course-detail__header">
          <span
            className="course-detail__back-icon"
            onClick={this.hanldeBackBtnClick}
          >
            <LeftArrowIcon />
          </span>
          <h1 className="course-detail__title">
            {`Edit Course Detail:  ${course && course.title}`}
          </h1>

          <div className="course-detail__btn-container">
            {/*<select name="" id="" className="course-detail__drop-down">*/}
            {/*  <option selected={isVisibilityPublic}>Only Me</option>*/}
            {/*  <option selected={isVisibilityPublic}>Public</option>*/}
            {/*</select>*/}
            <div className="course-detail__visibility">
              <button
                className="btn course-detail__btn-container--btn"
                onClick={this.handleVisibility}
              >
                {isVisibilityPublic ? (
                  <>
                    <i className="fa fa-globe" />
                    Public
                  </>
                ) : (
                  <>
                    <i className="fa fa-lock" />
                    Only Me
                  </>
                )}
                <i
                  className={`fa fa-angle-${
                    !show_dropdown ? "down" : "up"
                  } dropdown-icon`}
                />
              </button>
              {show_dropdown && (
                <div className="course-detail__drop-down">
                  <div
                    className="course-detail__drop-down--item"
                    onClick={() => this.selectVisibility("public")}
                  >
                    <i className="fa fa-globe" /> Public
                  </div>
                  <div
                    className="course-detail__drop-down--item"
                    onClick={() => this.selectVisibility("me")}
                  >
                    <i className="fa fa-lock" /> Only Me
                  </div>
                </div>
              )}
            </div>
            {!!category && category.toUpperCase().indexOf("UPCOMING") >= 0 ? (
              <button
                className="btn course-detail__btn-container--btn"
                onClick={() => this.handlePublish("publish")}
                disabled={!canPublish}
              >
                <i className="fa fa-share-square-o" />
                Publish
              </button>
            ) : (
              <button
                className="btn course-detail__btn-container--btn"
                onClick={() => this.handlePublish("un-publish")}
                disabled={!canPublish}
              >
                <i className="fa fa-repeat" />
                UnPublish
              </button>
            )}
          </div>
        </div>
        <div className="course-detail__body">
          <div className="course-detail__body--left">
            <Input
              type="text"
              name="name"
              value={name}
              label="Course Name"
              placeholder="Enter Course Name"
              onChange={this.onInputChange}
            />
            <Input
              type="text"
              name="code"
              value={code}
              label="Course Code"
              placeholder="Provide a short name (used internally)"
              onChange={this.onInputChange}
              disabled
            />
            <Input
              type="text"
              name="urlCode"
              value={urlCode}
              label="Course Url Code"
              placeholder="Name to be displayed in the url"
              onChange={this.onInputChange}
            />
            <Input
              type="text"
              name="courseCreator"
              value={courseCreator.name}
              label="Author"
              placeholder="Name of the author"
              onChange={this.onInputChange}
            />
            <Input
              type="number"
              name="courseDuration"
              value={courseDuration}
              label="Course Duration (In Days)"
              placeholder="Duration in days"
              onChange={this.onInputChange}
            />
          </div>

          <div className="course-detail__body--right material-froala-editor">
            <Input
              type="textarea"
              name="description"
              value={description}
              label="Description"
              placeholder="Course Description"
              onChange={this.onInputChange}
            />
          </div>
        </div>
        <div className="course-detail__footer">
          {/*<button className="btn btn-lg btn-outline btn btn-default course-detail__footer--btn">Save to draft</button>*/}
          <button
            className="btn btn-lg btn-outline btn btn-default ml-4 course-detail__footer--btn"
            onClick={this.handleEditCourse}
          >
            Save and Continue
          </button>
        </div>
      </div>
    );
  }
}

export default EditCourse;

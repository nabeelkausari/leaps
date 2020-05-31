import React, { Component } from "react";
import Input from "../../../../../components/Forms/Input";
import { validateCourseCode } from "../../../../../../common/utils/validate";

class CreateCourse extends Component {
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
    isFreeTrial: true
  };
  hanldeBackBtnClick = () => {
    this.props.history.goBack();
  };

  setToState = (name, value) => {
    this.setState({ [name]: value });
  };

  handleCreateCourse = () => {
    this.props.createCourse(this.state);
  };

  onInputChange = (name, value) => {
    switch (name) {
      case "code":
      case "urlCode":
        return validateCourseCode(value) && this.setToState(name, value);
      case "author":
        return this.setState({ ["courseCreator"]: { name: value } });
      default:
        this.setToState(name, value);
    }
  };
  render() {
    const {
      name,
      code,
      urlCode,
      author,
      description,
      courseDuration
    } = this.state;
    return (
      <div className="course-detail">
        <div className="course-detail__header">
          <span
            className="course-detail__back-icon"
            onClick={this.hanldeBackBtnClick}
          >
            {/*<img src={ArrowLeftBlack} alt="back"/>*/}
          </span>
          <h1 className="course-detail__title">Course Detail</h1>
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
              name="author"
              value={author}
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
            onClick={this.handleCreateCourse}
          >
            Save and Continue
          </button>
        </div>
      </div>
    );
  }
}

export default CreateCourse;

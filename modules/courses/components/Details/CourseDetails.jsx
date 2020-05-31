import React, { Component, Fragment } from "react";
import cx from "classnames";
import get from "lodash/get";
import { Link } from "react-router-dom";
import Pluralize from "react-pluralize";
import CourseTimelineView from "./CourseTimelineView";
import Loader from "../../../../components/Loader";
import { Button } from "../../../../components/Buttons/Button";
import { formatDate } from "../../../../../common/utils/helperFunctions";
import Material from "../../../../modules/material/components/Material";
import ProgressBar from "../../../../components/ProgressBar";
import {
  QuizIcon,
  ShlCertificateIcon,
  CalenderIcon,
  SimulationIcon,
  ModuleIcon
} from "../../../../../common/images";
import AuthModal from "../../../auth/components/shared/AuthModal";

class CourseDetails extends Component {
  state = {
    activeView: 1
  };

  componentDidMount() {
    const { getModules, match, course, getCourse, modules } = this.props;
    if (!course) {
      getCourse(match.params.course_code);
    }
    if (course && !modules) {
      getModules(match.params.course_code);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetch_marketplace_courses_succeeded,
      getModules,
      course,
      selectMarketPlaceCourse,
      match: {
        params: { course_code }
      },
      is_logged_in,
      profile_loaded,
      getMarketPlaceCourses
    } = this.props;
    if (
      fetch_marketplace_courses_succeeded &&
      fetch_marketplace_courses_succeeded !==
        prevProps.fetch_marketplace_courses_succeeded
    ) {
      setTimeout(() => selectMarketPlaceCourse(course.url_code), 1500);
      getModules(course_code);
    }

    if (
      is_logged_in &&
      profile_loaded &&
      profile_loaded !== prevProps.profile_loaded
    ) {
      getMarketPlaceCourses();
    }
  }

  ChangeCourseView = activeView => {
    this.setState({ activeView });
  };

  onPrimaryClick = () => {
    const {
      enroll,
      course: { url_code }
    } = this.props;
    enroll(url_code);
  };

  resumeModule = module_reference => {
    const {
      course: { url_code }
    } = this.props;

    this.props.resumeModule(url_code, module_reference);
  };

  render() {
    const { activeView } = this.state;
    const {
      course,
      marketplace_courses_loading,
      modules,
      name,
      is_logged_in,
      modules_requested
    } = this.props;
    const { progress_status, progress_percent, background_image } =
      (course && course) || {};

    //logic copied from learn
    const enroll_primary_caption =
      course == undefined
        ? undefined
        : course._links == undefined
        ? undefined
        : course._links.resume
        ? "Resume Course"
        : course._links.start
        ? "Start Course"
        : course._links.redo
        ? "Redo Course"
        : course._links.enroll
        ? "Enroll for free"
        : undefined;
    const is_upcoming_content =
      get(course, "category") &&
      get(course, "category")
        .toUpperCase()
        .indexOf("UPCOMING") >= 0;
    const hasEnrollLink = !!get(course, "_links.enroll");
    const hasStartLink = !!get(course, "_links.start");
    const hasResumeLink = !!get(course, "_links.resume");
    const hasRedoLink = !!get(course, "_links.redo");
    const hasUserEnrolled = hasStartLink || hasResumeLink || hasRedoLink;
    const hasStarted = !!get(course, "started_on");

    return (
      <>
        <Loader loading={marketplace_courses_loading} />
        <div className="course-overview">
          {course && (
            <div className="course-overview__header">
              <div className="course-overview__header--info">
                <div style={{ marginBottom: "1rem" }}>
                  <u>
                    <Link to="/courses">Courses</Link>
                  </u>{" "}
                  > {course.title}
                </div>
                <div className="course-overview__header--element u-margin-bottom-small">
                  <span className="course-overview__title">{course.title}</span>
                </div>
                <div className="course-overview__header--element u-margin-bottom-medium">
                  <span className="course-overview__description">
                    {course.description}
                  </span>
                </div>
                {/*<div className="course-overview__header--element u-margin-bottom-medium-large">*/}
                {/*<span className="course-overview__time">*/}
                {/*  Started on:{" "}*/}
                {/*  <span className="course-overview__time--bold">*/}
                {/*    {formatDate(course.started_on, "Do MMMM YYYY")}*/}
                {/*  </span>*/}
                {/*</span>*/}
                {/*{get(course, "remaining_days") !== 0 && (*/}
                {/*  <span className="course-overview__time">*/}
                {/*    Days Remaining:{" "}*/}
                {/*    <span className="course-overview__time--bold">*/}
                {/*      {course.remaining_days}*/}
                {/*    </span>*/}
                {/*  </span>*/}
                {/*)}*/}
                {/*</div>*/}
              </div>

              <div className="course-overview__header-card">
                <div
                  style={{
                    backgroundImage: `url(${
                      background_image
                        ? background_image
                        : "https://qasimulab.analyttica.com/static/media/backgroung-login.a6ee9db4.jpg"
                    })`
                  }}
                  className="course-overview__header-card--upper"
                />
                <div className="course-overview__header-card--lower">
                  {!!progress_percent &&
                    progress_status &&
                    progress_percent !== 0 &&
                    progress_status !== "NOT_STARTED" && (
                      <div className="course-overview__header-card--bar">
                        <ProgressBar
                          completed_percentage={progress_percent}
                          width={27}
                        />
                      </div>
                    )}
                  <div className="course-overview__tiles">
                    <div className="course-overview__tile-wrapper">
                      <div className="course-overview__tile">
                        <ModuleIcon className="course-overview__tile--icon" />
                        <div className="course-overview__tile--text">
                          <Pluralize
                            singular={"Module"}
                            count={get(course, "modules_count")}
                          />
                        </div>
                      </div>
                      <div className="course-overview__tile">
                        <SimulationIcon className="course-overview__tile--icon" />
                        <div className="course-overview__tile--text">
                          <Pluralize
                            singular={"Data Case"}
                            count={
                              Number(get(course, "simulations_count")) +
                              Number(get(course, "solves_count"))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="course-overview__tile-wrapper">
                      <div className="course-overview__tile">
                        <QuizIcon className="course-overview__tile--icon" />
                        <div className="course-overview__tile--text">
                          <Pluralize
                            singular={"Quiz"}
                            plural={"Quizzes"}
                            count={get(course, "quizzes_count") || 0}
                          />
                        </div>
                      </div>
                      <div className="course-overview__tile">
                        <ShlCertificateIcon className="course-overview__tile--icon" />
                        <div className="course-overview__tile--text">
                          <Pluralize
                            singular={"Certificate"}
                            count={get(course, "certificates_count") || 1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="course-overview__header--element">
                      {!is_logged_in ? (
                        is_upcoming_content ? (
                          <div className="course-overview__upcoming-coourse">
                            Upcoming Course
                          </div>
                        ) : (
                          <AuthModal
                            Trigger={({ handleClick }) => (
                              <Button
                                variant="primary"
                                className="course-overview__action"
                                size="lg"
                                onClick={handleClick}
                              >
                                Enroll for free
                              </Button>
                            )}
                          />
                        )
                      ) : !is_upcoming_content &&
                        (hasEnrollLink || hasUserEnrolled) ? (
                        <Button
                          variant="primary"
                          className="course-overview__action"
                          size="lg"
                          onClick={() => this.onPrimaryClick()}
                          disabled={modules_requested}
                        >
                          {enroll_primary_caption}
                        </Button>
                      ) : (
                        <div className="course-overview__upcoming-coourse">
                          Upcoming Course
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="course-overview__content">
            <ul className="course-view">
              <li
                className={cx("course-view__tabs", {
                  "active-view": activeView === 1
                })}
                onClick={() => this.ChangeCourseView(1)}
              >
                About the Course
              </li>
              <li
                className={cx("course-view__tabs", {
                  "active-view": activeView === 2
                })}
                onClick={() => this.ChangeCourseView(2)}
              >
                Timeline
              </li>
            </ul>

            {activeView === 1 ? (
              <div className="course-overview__material">
                {course && (
                  <Material
                    material_link={course._links.material}
                    course_content
                  />
                )}
              </div>
            ) : (
              <CourseTimelineView
                certificate_count={get(course, "certificates_count")}
                duration={get(course, "duration")}
                modules_count={get(course, "modules_count")}
                simulations_count={get(course, "simulations_count")}
                quizzes_count={get(course, "quizzes_count")}
                solves_count={get(course, "solves_count")}
                modules={modules}
                course={course}
                resumeModule={this.resumeModule}
                name={name}
                is_logged_in={is_logged_in}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CourseDetails;

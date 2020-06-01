import React, { useState, useEffect } from "react";
import cx from "classnames";
import get from "lodash/get";
import Link from "next/link";
import Pluralize from "react-pluralize";
import CourseTimelineView from "../../modules/courses/components/Details/CourseTimelineView"
import Loader from "../../components/Loader";
import { Button } from "../../components/Buttons/Button";
import Material from "../../modules/material/components/Material";
import ProgressBar from "../../components/ProgressBar";
import AuthModal from "../../modules/auth/components/shared/AuthModal"
import {useRouter} from "next/router"
import {initializeStore} from "../../redux-config/store"
import * as types from "../../modules/courses/redux/types"
import Layout from "../../components/Layout"
import {useSelector, useDispatch} from "react-redux"
import {API_GATEWAY_URI} from "../../common/api/constants"
import {getModules} from "../../modules/courses/modules/courseModules/redux/actions"

// import {
//   QuizIcon,
//   ShlCertificateIcon,
//   CalenderIcon,
//   SimulationIcon,
//   ModuleIcon
// } from "../../../../../common/images";

const CourseDetails = props => {
  const [activeView, setActiveView] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch()
  const {single_course: course, modules: { items: modules }, marketplace_courses_loading, name} = useSelector(state => state.courses)

  useEffect(() => {
    dispatch(getModules(router.query.course))
  }, [dispatch])

  const { progress_status, progress_percent, background_image } = (course && course) || {};

  return (
    <Layout>
      <Loader loading={marketplace_courses_loading} />
      <div className="course-overview">
        {course && (
          <div className="course-overview__header">
            <div className="course-overview__header--info">
              <div style={{ marginBottom: "1rem" }}>
                <u>
                  <Link href="/courses"><a>Courses</a></Link>
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
                      {/*<ModuleIcon className="course-overview__tile--icon" />*/}
                      <div className="course-overview__tile--text">
                        <Pluralize
                          singular={"Module"}
                          count={get(course, "modules_count")}
                        />
                      </div>
                    </div>
                    <div className="course-overview__tile">
                      {/*<SimulationIcon className="course-overview__tile--icon" />*/}
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
                      {/*<QuizIcon className="course-overview__tile--icon" />*/}
                      <div className="course-overview__tile--text">
                        <Pluralize
                          singular={"Quiz"}
                          plural={"Quizzes"}
                          count={get(course, "quizzes_count") || 0}
                        />
                      </div>
                    </div>
                    <div className="course-overview__tile">
                      {/*<ShlCertificateIcon className="course-overview__tile--icon" />*/}
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
              onClick={() => setActiveView(1)}
            >
              About the Course
            </li>
            <li
              className={cx("course-view__tabs", {
                "active-view": activeView === 2
              })}
              onClick={() => setActiveView(2)}
            >
              Timeline
            </li>
          </ul>

          {activeView === 1 ? (
            <div className="course-overview__material">
              <Material
                material_link={course._links.material}
                course_content
              />
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
              name={name}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore;

  const url = `${API_GATEWAY_URI}/marketplace-courses/code/${params.course}`;
  const options = {
    headers: {
      'Connection': 'keep-alive',
    }
  }

  const course = await fetch(url, options).then(res => res.json())

  dispatch({
    type: types.FETCH_SINGLE_COURSE_SUCCEEDED,
    payload: course
  });

  return {
    props: { initialReduxState: reduxStore.getState() },
  }
}

export default CourseDetails;

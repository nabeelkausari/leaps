import React, { Component } from "react";
import fetch from "node-fetch";
import UpSkill from "../modules/home/components/UpSkill"
import HowItWorks from "../modules/home/components/HowItWorks"
import CourseListing from "../modules/home/components/CourseListing";
import ApplySkills from "../modules/home/components/ApplySkills";
import Hackathon from "../modules/home/components/Hackathon";
import Blogs from "../modules/home/components/Blogs";
import Webinar from "../modules/home/components/Webinar";
import Podcast from "../modules/home/components/Podcast";
import CustomerReview from "../modules/home/components/CustomerReview";
import ReactModal from "react-modal";
import YouTube from "react-youtube";
import * as types from "../modules/courses/redux/types"

// import { CloseIcon } from "../../../../common/images";
import Footer from "../modules/home/components/Footer";
import {FETCH_WEBINARS_SUCCEEDED} from "../modules/home/redux/types"
import Layout from "../components/Layout"
import {initializeStore} from "../redux-config/store"
import {API_GATEWAY_URI} from "../common/api/constants"


class Home extends Component {
  state = {
    mobile_display: false,
    show_video_modal: false
  };

  componentDidMount() {
    if (window.innerWidth <= 900) {
      this.setState({ mobile_display: true });
      this.setGlobalFont();
      this.disableIncompatibleView();
    }

    window.showTawk && window.showTawk();
  }


  componentWillUnmount() {
    window.hideTawk && window.hideTawk();

    if (window.innerWidth <= 900) {
      this.unsetGlobalFont(".695vw");
      this.enableIncompatibleView();
    }
  }

  setGlobalFont = () => {
    let html_element = document.getElementsByTagName("html")[0];
    html_element.style.fontSize = "2.5vw";
    html_element.style.overflow = "hidden";
  };

  unsetGlobalFont = () => {
    let html_element = document.getElementsByTagName("html")[0];
    html_element.style.fontSize = null;
    html_element.style.overflow = null;
  };

  disableIncompatibleView = () => {
    document
      .getElementsByClassName("incompatible-view")[0]
      .setAttribute("class", "incompatible-view disabled");
  };

  enableIncompatibleView = () => {
    document
      .getElementsByClassName("incompatible-view")[0]
      .setAttribute("class", "incompatible-view");
  };

  handleCloseModal = () => {
    this.setState({ show_video_modal: false });
  };

  handleOpenModal = () => {
    this.setState({ show_video_modal: true });
  };

  render() {
    const { course_list, courses_loading } = this.props;
    const { mobile_display } = this.state;
    return (
      <Layout
        className={`shl-home ${mobile_display ? "shl-home--mobile" : ""}`}
      >
        <UpSkill
          mobile_display={mobile_display}
          handleOpenModal={this.handleOpenModal}
        />
        <HowItWorks mobile_display={mobile_display} />
        <CourseListing
          {...this.props}
          course_list={course_list}
          loading={courses_loading}
          mobile_display={mobile_display}
        />
        <ApplySkills mobile_display={mobile_display} />
        <Hackathon mobile_display={mobile_display} />
        <Webinar {...this.props} mobile_display={mobile_display} />
        <Blogs mobile_display={mobile_display} />
        <Podcast mobile_display={mobile_display} />
        <CustomerReview mobile_display={mobile_display} />
        <Footer mobile_display={mobile_display} />

        <ReactModal
          isOpen={this.state.show_video_modal}
          onRequestClose={this.handleCloseModal}
        >
          <YouTube
            videoId="OfSNX18Pnew"
            opts={{
              height: "100%",
              width: "100%",
              playerVars: {
                autoplay: 1
              }
            }}
          />
          <button
            className="no-btn modal-close"
            onClick={this.handleCloseModal}
          >
            <img alt="Close" src="/icons/close.svg"/>
          </button>
        </ReactModal>
      </Layout>
    );
  }
}

export async function getServerSideProps() {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  const courses_url = `${API_GATEWAY_URI}/marketplace-courses`;
  const webinars_url = `${API_GATEWAY_URI}/webinar/user/tenant/webinar`;
  const options = {
    headers: {
      'Connection': 'keep-alive',
    }
  }
  const courses = await fetch(courses_url, options).then(res => res.json())
  const webinars = await fetch(webinars_url, options).then(res => res.json())

  dispatch({
    type: types.FETCH_MARKETPLACE_COURSES_SUCCEEDED,
    payload: { courses, is_individual_course: false }
  });

  dispatch({
    type: FETCH_WEBINARS_SUCCEEDED,
    payload: webinars
  });

  return {
    props: { initialReduxState: reduxStore.getState() },
  }
}


export default Home;

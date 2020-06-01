import React, { Component } from "react";
import axios from "axios";
import UpSkill from "../modules/home/components/UpSkill"
import HowItWorks from "../modules/home/components/HowItWorks"
import CourseListing from "../modules/home/components/CourseListing";
import ApplySkills from "../modules/home/components/ApplySkills";
import Hackathon from "../modules/home/components/Hackathon";
import Blogs from "../modules/home/components/Blogs";
import Webinar from "../modules/home/components/Webinar";
import Podcast from "../modules/home/components/Podcast";
import Header from "../modules/header/components/Header";
import MobileHeader from "../modules/header/components/MobileHeader";
import CustomerReview from "../modules/home/components/CustomerReview";
import ReactModal from "react-modal";
import YouTube from "react-youtube";
import HomeContainer from "../modules/home/containers/home";
import getStore from "../example/redux/store"
import {serverRenderClock} from "../example/redux/actions"
import {getMarketPlaceCourses} from "../modules/courses/redux/actions"
import {API_GATEWAY_URI, APP_URL} from "../common/api/constants"
import * as types from "../modules/courses/redux/types"
import {MARKETPLACE_COURSE_COLLECTION} from "../common/api/media-types"

// import { CloseIcon } from "../../../../common/images";
import Footer from "../modules/home/components/Footer";
import {FETCH_WEBINARS_SUCCEEDED} from "../modules/home/redux/types"
import Layout from "../components/Layout"

const navigateToHash = () => {
  const { hash } = window.location;
  if (hash) {
    const id = hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ block: "start", behavior: "smooth" });
  }
};

class Home extends Component {
  state = {
    mobile_display: false,
    show_video_modal: false
  };

  componentDidMount() {
    // this.props.getMarketPlaceCourses();
    // this.props.fetchWebinars();
    if (window.innerWidth <= 900) {
      this.setState({ mobile_display: true });
      this.setGlobalFont();
      this.disableIncompatibleView();
    }

    window.showTawk && window.showTawk();




    // navigateToHash();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { is_logged_in, profile_loaded, webinars_succeeded } = this.props;
    // if (
    //   is_logged_in &&
    //   profile_loaded &&
    //   profile_loaded !== prevProps.profile_loaded
    // ) {
    //   this.props.getMarketPlaceCourses();
    //   this.props.fetchWebinars();
    // }

    // if (
    //   webinars_succeeded &&
    //   webinars_succeeded !== prevProps.webinars_succeeded
    // ) {
    //   navigateToHash();
    // }
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
  const store = getStore();
  const get_marketplace_courses_default = {
    href: "/marketplace-courses",
    accept: MARKETPLACE_COURSE_COLLECTION
  };
  const url = "https://devapi.analyttica.com/marketplace-courses";
  const dummy_url = "http://www.mocky.io/v2/5ed3e0cd340000650001f518";
  const courses = await fetch(url).then(res => res.json())

  const webinars_url = "https://devapi.analyttica.com/webinar/user/tenant/webinar";
  const webinars_url_dummy = "http://www.mocky.io/v2/5ed3dfae340000580001f515";
  const webinars = await fetch(webinars_url).then(res => res.json())


  store.dispatch(() => dispatch =>
    dispatch({
      type: types.FETCH_MARKETPLACE_COURSES_SUCCEEDED,
      payload: { courses, is_individual_course: false }
    })())

  store.dispatch(() => dispatch =>
    dispatch({
      type: FETCH_WEBINARS_SUCCEEDED,
      payload: webinars
    })())


  return {
    props: {
      course_list: courses,
      webinars
    },
  }
}


export default Home;

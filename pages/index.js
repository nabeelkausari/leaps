import React, { useState, useEffect } from "react";
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
import { setGlobalFont, disableIncompatibleView, enableIncompatibleView, unsetGlobalFont } from "../common/utils/home.utils"

// import { CloseIcon } from "../../../../common/images";
import Footer from "../modules/home/components/Footer";
import {FETCH_WEBINARS_SUCCEEDED} from "../modules/home/redux/types"
import Layout from "../components/Layout"
import {initializeStore} from "../redux-config/store"
import {API_GATEWAY_URI} from "../common/api/constants"
import {useSelector} from "react-redux"

const Home = () => {
  const [mobileDisplay, setMobileDisplay] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { list: course_list, courses_loading, ...course_props } = useSelector(state => state.courses);
  const { webinars } = useSelector(state => state.home);

  const handleCloseModal = () => {
    setShowVideoModal(false);
  };

  const handleOpenModal = () => {
    setShowVideoModal(true);
  };

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (window.innerWidth <= 900) {
        setMobileDisplay(true);
        setGlobalFont();
        disableIncompatibleView();
      }
      return () => {
        if (window.innerWidth <= 900) {
          unsetGlobalFont(".695vw");
          enableIncompatibleView();
        }
      }
    }, [window.innerWidth])
  }

  return (
    <Layout
      className={`shl-home ${mobileDisplay ? "shl-home--mobile" : ""}`}
    >
      <UpSkill
        mobile_display={mobileDisplay}
        handleOpenModal={handleOpenModal}
      />
      <HowItWorks mobile_display={mobileDisplay} />
      <CourseListing
        {...course_props}
        course_list={course_list}
        loading={courses_loading}
        mobile_display={mobileDisplay}
      />
      <ApplySkills mobile_display={mobileDisplay} />
      <Hackathon mobile_display={mobileDisplay} />
      <Webinar webinars={webinars} mobile_display={mobileDisplay} />
      <Blogs mobile_display={mobileDisplay} />
      <Podcast mobile_display={mobileDisplay} />
      <CustomerReview mobile_display={mobileDisplay} />
      <Footer mobile_display={mobileDisplay} />

      <ReactModal
        isOpen={showVideoModal}
        onRequestClose={handleCloseModal}
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
          onClick={handleCloseModal}
        >
          <img alt="Close" src="/icons/close.svg"/>
        </button>
      </ReactModal>
    </Layout>
  );
}

export async function getStaticProps() {
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

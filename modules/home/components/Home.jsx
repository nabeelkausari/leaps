import React, { Component } from "react";

import UpSkill from "./UpSkill";
import HowItWorks from "./HowItWorks";
import CourseListing from "./CourseListing";
import ApplySkills from "./ApplySkills";
import Hackathon from "./Hackathon";
import Blogs from "./Blogs";
import Webinar from "./Webinar";
import Podcast from "./Podcast";
import Header from "../../header/components/Header";
import { NewHeaderContent } from "../../header/components/HeaderVariants";
import MobileHeader from "../../header/components/MobileHeader";
import CustomerReview from "./CustomerReview";
import ReactModal from "react-modal";
import YouTube from "react-youtube";

import "video-react/styles/scss/video-react.scss";

import { CloseIcon } from "../../../../common/images";
import Footer from "./Footer";

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

  // home_container = React.createRef();
  // last_scroll = 0;
  //
  // global_font_ratio = window.innerWidth * 0.01 * 0.695;
  // innerHeight = window.innerHeight - this.global_font_ratio * 5.1;
  //
  // container_top_scroll_value =
  //   this.innerHeight + this.innerHeight * (1.2 / 100);

  componentDidMount() {
    this.props.getMarketPlaceCourses();
    this.props.fetchWebinars();
    if (window.innerWidth <= 900) {
      this.setState({ mobile_display: true });
      this.setGlobalFont();
      this.disableIncompatibleView();
    }

    window.showTawk && window.showTawk();

    navigateToHash();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { is_logged_in, profile_loaded, webinars_succeeded } = this.props;
    if (
      is_logged_in &&
      profile_loaded &&
      profile_loaded !== prevProps.profile_loaded
    ) {
      this.props.getMarketPlaceCourses();
      this.props.fetchWebinars();
    }

    if (
      webinars_succeeded &&
      webinars_succeeded !== prevProps.webinars_succeeded
    ) {
      navigateToHash();
    }
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

  // scroll_home = () => {
  //   const {
  //     mobile_display,
  //     lock_scroll,
  //     animate_scroll_is_active,
  //     current_point,
  //     preventThreshold
  //   } = this.state;
  //
  //   if (!mobile_display && !animate_scroll_is_active) {
  //     let scroll_top = this.home_container.current.scrollTop;
  //     // console.log(scroll_top);
  //
  //     if (!lock_scroll && !preventThreshold) {
  //       if (this.isScrollingDown(scroll_top)) {
  //         if (this.isBetweenUpperThreshold(scroll_top)) {
  //           this.setState({ current_point: 0 });
  //           this.animateLockIn(
  //             this.container_top_scroll_value - scroll_top,
  //             "down"
  //           );
  //           this.lockScroll();
  //         }
  //       } else {
  //         if (this.isBetweenLowerThreshold(scroll_top)) {
  //           this.setState({ current_point: 2 });
  //           this.animateLockIn(
  //             scroll_top - this.container_top_scroll_value,
  //             "up"
  //           );
  //           this.lockScroll();
  //         }
  //       }
  //     }
  //
  //     if (lock_scroll) {
  //       this.last_scroll = this.container_top_scroll_value;
  //       this.home_container.current.scrollTop = this.container_top_scroll_value;
  //       if (
  //         this.isDefiniteScrollDown(scroll_top) &&
  //         !this.state.block_transition
  //       ) {
  //         if (current_point < 2) {
  //           this.nextPoint();
  //         } else {
  //           this.toggleLockScroll();
  //           // this.animateLockIn(scroll_top - 810);
  //         }
  //       } else if (
  //         this.isDefiniteScrollUp(scroll_top) &&
  //         !this.state.block_transition
  //       ) {
  //         if (current_point > 0) {
  //           this.prevPoint();
  //         } else {
  //           this.toggleLockScroll();
  //           // this.animateLockIn(810 - scroll_top);
  //         }
  //       }
  //     }
  //     if (!lock_scroll) {
  //       this.last_scroll = scroll_top;
  //     }
  //   }
  // };
  //
  // toggleLockScroll = () => {
  //   this.setState({ lock_scroll: false, preventThreshold: true });
  //   setTimeout(() => {
  //     this.setState({ preventThreshold: false });
  //   }, 500);
  // };
  //
  // unBlockTransition = () => {
  //   setTimeout(() => {
  //     this.setState({ block_transition: false });
  //   }, 400);
  // };
  //
  // nextPoint = () => {
  //   this.setState(state => ({
  //     current_point: state.current_point + 1,
  //     block_transition: true
  //   }));
  //   this.unBlockTransition();
  // };
  //
  // prevPoint = () => {
  //   this.setState(state => ({
  //     current_point: state.current_point - 1,
  //     block_transition: true
  //   }));
  //   this.unBlockTransition();
  // };
  //
  // animateLockIn = (scroll_value, direction) => {
  //   let scroll_step_value = scroll_value / 100;
  //   this.setState({ animate_scroll_is_active: true });
  //
  //   if (direction === "down") {
  //     let animate_scroll_interval = setInterval(() => {
  //       if (
  //         this.home_container.current.scrollTop >=
  //         this.container_top_scroll_value
  //       ) {
  //         this.setState({ animate_scroll_is_active: false });
  //         clearInterval(animate_scroll_interval);
  //       } else {
  //         this.home_container.current.scrollTop += scroll_step_value;
  //       }
  //     }, 5);
  //   } else {
  //     let animate_scroll_interval = setInterval(() => {
  //       if (
  //         this.home_container.current.scrollTop <=
  //         this.container_top_scroll_value
  //       ) {
  //         this.setState({ animate_scroll_is_active: false });
  //         clearInterval(animate_scroll_interval);
  //       } else {
  //         this.home_container.current.scrollTop -= scroll_step_value;
  //       }
  //     }, 2);
  //   }
  // };
  //
  // isScrollingDown = scroll_top => {
  //   if (this.last_scroll <= scroll_top) {
  //     return true;
  //   }
  //   return false;
  // };
  //
  // isDefiniteScrollDown = scroll_top => {
  //   if (scroll_top - 10 > this.last_scroll) {
  //     return true;
  //   }
  //   return false;
  // };
  //
  // isDefiniteScrollUp = scroll_top => {
  //   if (scroll_top + 10 < this.last_scroll) {
  //     return true;
  //   }
  //   return false;
  // };
  //
  // isBetweenUpperThreshold = scroll_top => {
  //   if (
  //     scroll_top > this.container_top_scroll_value / 2 &&
  //     scroll_top <
  //       this.container_top_scroll_value / 2 +
  //         this.container_top_scroll_value / 10
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };
  //
  // isBetweenLowerThreshold = scroll_top => {
  //   if (
  //     scroll_top <
  //       this.container_top_scroll_value * 1.5 +
  //         this.container_top_scroll_value / 10 &&
  //     scroll_top > this.container_top_scroll_value * 1.5
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };
  //
  // lockScroll = () => {
  //   this.setState({ lock_scroll: true });
  // };

  render() {
    const { course_list, courses_loading, is_logged_in, logout } = this.props;
    const { mobile_display, current_point } = this.state;
    return (
      <div
        className={`shl-home ${mobile_display ? "shl-home--mobile" : ""}`}
        // onScroll={this.scroll_home}
        // ref={this.home_container}
      >
        {mobile_display ? (
          <MobileHeader is_logged_in={is_logged_in} logout={logout} />
        ) : (
          <Header Content={NewHeaderContent} />
        )}
        <UpSkill
          mobile_display={mobile_display}
          handleOpenModal={this.handleOpenModal}
        />
        <HowItWorks mobile_display={mobile_display} />
        <CourseListing
          {...this.props}
          course_list={course_list}
          loading={courses_loading}
          authenticated={is_logged_in}
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
            <CloseIcon />
          </button>
        </ReactModal>
      </div>
    );
  }
}

export default Home;

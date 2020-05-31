import React, { Component } from "react";
import { Button } from "../../../../components/Buttons/Button";
import { HackathonListItemTimings } from "../List/HackathonListItemTimings";
import TabList from "../../../../components/Tabs/TabList";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";
import Loader from "../../../../components/Loader";
import AuthModal from "../../../auth/components/shared/AuthModal";
import { HackathonTimeLine } from "./HackathonTimeLine";
import {
  SimulationIcon,
  BulbIcon,
  PenToolIcon
} from "../../../../../common/images";
import Home from "./Home";
import SubmissionRules from "./SubmissionRules";
import Tnc from "./Tnc";
import Rewards from "./Rewards";
import { BusinessObjective } from "./BusinessObjective";
import {
  setSessionStorage,
  SOLVE_LINK,
  SOLVE_TYPE
} from "../../../../../common/utils/storage";
import { get } from "lodash";
import {
  ENROLL_NOW,
  HACKATHON,
  UN_ENROLL
} from "../../../../../common/utils/constants";
import { CountDown } from "../../../home/components/CountDown";
import {
  convertToGmt,
  getGmtTime
} from "../../../../../common/utils/helperFunctions";
import { withRouter } from "react-router-dom";
import QuizBar from "../Quiz/QuizBar";
import queryString from "query-string";

class HackathonDetails extends Component {
  tabList = {
    home: {
      title: "Home",
      key: "home",
      component: Home
    },
    rewards: {
      title: "Rewards",
      key: "rewards",
      component: Rewards
    },
    rules: {
      title: "Submission Rules",
      key: "rules",
      component: SubmissionRules
    },
    terms: {
      title: "Terms & Condition",
      key: "terms",
      component: Tnc
    }
  };

  tabs = Object.values(this.tabList);

  crumb = [
    {
      text: "Hackathons",
      link: "/hackathons"
    }
  ];

  state = {
    active_tab: "home",
    show_quiz_bar: false
  };

  componentDidMount() {
    const {
      current_hackathon,
      fetchSingleHackathon,
      location,
      match: {
        params: { hackathon_id }
      }
    } = this.props;
    if (!current_hackathon) {
      fetchSingleHackathon(hackathon_id);
    }

    const query = queryString.parse(location.search);
    if (get(query, "active_quiz")) {
      this.setState({ show_quiz_bar: true });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { is_logged_in, profile_loaded, location } = this.props;
    if (
      is_logged_in &&
      profile_loaded &&
      profile_loaded !== prevProps.profile_loaded
    ) {
      this.props.fetchHackathons();
    }

    if (location.search !== prevProps.location.search) {
      const query = queryString.parse(location.search);
      this.setState({ show_quiz_bar: !!get(query, "active_quiz") });
    }
  }

  openBusinessObjective = props => {
    const {
      fetchSingleHackathon,
      match: {
        params: { hackathon_id }
      }
    } = this.props;
    this.props.showDialog({
      title: "Business Objective",
      Component: BusinessObjective,
      hide_footer: false,
      size: "md",
      component_props: {
        business_objective: props,
        fetchSingleHackathon,
        hackathon_id
      }
    });
  };

  openHackathonSolve = hackathon => {
    const solve = get(hackathon, "solve_details[0]");
    setSessionStorage(SOLVE_LINK, get(solve, "_links.get_solve_details"));
    setSessionStorage(SOLVE_TYPE, HACKATHON);
    this.props.history.push(
      `/solve/hackathon/${hackathon.hackathon_id}/dataset${this.props.location.search}`
    );
  };

  onTabSelect = key => {
    this.setState({ active_tab: key });
  };

  onPrimaryClick = () => {
    const {
      current_hackathon,
      unEnrollHackathon,
      enrollHackathon
    } = this.props;
    const has_enrolled = !get(current_hackathon, "_links.enrol_hackathon");

    if (has_enrolled) {
      return unEnrollHackathon(current_hackathon);
    }
    enrollHackathon(current_hackathon);
  };

  getHackathonTimeliineList = hackathon => {
    if (!hackathon) return [];
    const solves = (hackathon.solve_details || []).map((h, i) => ({
      title: "Solve",
      icon: SimulationIcon,
      completed: h.completed,
      onClick: () => this.openHackathonSolve(hackathon),
      visible: true
    }));
    const quizes = (hackathon.quiz_details || []).map((h, i) => ({
      title: "Quiz",
      icon: BulbIcon,
      completed: h.completed,
      onClick: () => {
        h.started
          ? this.props.history.push(
              this.props.location.pathname + "?active_quiz=true"
            )
          : this.props.history.push(
              this.props.location.pathname + "/quiz/instructions"
            );
      },
      visible: true
    }));
    const BO = {
      title: "Business Objective",
      icon: PenToolIcon,
      completed: get(hackathon, "business_objective.completed"),
      onClick: () => this.openBusinessObjective(hackathon.business_objective),
      visible: !!hackathon.business_objective
    };
    return [...solves, ...quizes, BO];
  };

  render() {
    const { active_tab, show_quiz_bar } = this.state;
    const {
      fetch_hackathon_list_requested,
      current_hackathon,
      is_logged_in,
      match: {
        params: { hackathon_id }
      }
    } = this.props;
    const hackathon_timeline_list = this.getHackathonTimeliineList(
      current_hackathon
    );
    const hackathon = current_hackathon || {};
    const has_enrolled = get(current_hackathon, "_links.unenrol_hackathon");
    return (
      <div className="hd">
        <Loader loading={fetch_hackathon_list_requested} />
        <div className="hd__header">
          <div className="hd__header--info">
            <Breadcrumb crumbs={this.crumb} final_crumb={hackathon.title} />
            <div className="hd__header--element u-margin-top-small u-margin-bottom-small">
              <h2 className="hd__title">{hackathon.title}</h2>
            </div>
            <div className="hd__header--element u-margin-bottom-medium">
              <span className="hd__description">
                {/*{hackathon.business_objective}*/}
              </span>
            </div>
            <HackathonListItemTimings
              start_time={hackathon.start_time}
              end_time={hackathon.end_time}
            />
          </div>

          <div className="hd__header-card">
            <div className="hd__header-card--upper">
              <img
                src={hackathon.image_url}
                alt="hackathon"
                className="hd__header-card--img"
              />
            </div>
            <div className="hd__header-card--lower">
              <div>
                <h4 className="hd__header-card--title">Hackathon </h4>
                <HackathonTimeLine
                  active={is_logged_in && hackathon.is_live && has_enrolled}
                  list={hackathon_timeline_list}
                />
              </div>
              <div>
                <div className="hd__header-card--element">
                  <HackathonCardFooter
                    is_logged_in={is_logged_in}
                    {...this.props}
                    onPrimaryClick={this.onPrimaryClick}
                    hackathon_id={hackathon_id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hd__content">
          <TabList
            list={this.tabs}
            active_key={active_tab}
            onTabClick={this.onTabSelect}
          />
          <div className="hd__material">
            {(() => {
              const Component = this.tabList[active_tab].component;
              return <Component {...this.props} />;
            })()}
          </div>
        </div>
        {show_quiz_bar && <QuizBar />}
      </div>
    );
  }
}

export default withRouter(HackathonDetails);

const HackathonCardFooter = props => {
  const {
    is_logged_in,
    current_hackathon,
    onPrimaryClick,
    hackathon_id,
    fetchSingleHackathon
  } = props;
  const { is_live, end_time } = current_hackathon || {};
  const has_enroll_link = get(current_hackathon, "_links.enrol_hackathon");
  const has_unenroll_link = get(current_hackathon, "_links.unenrol_hackathon");
  const has_enrolled = !has_enroll_link;
  const is_over = convertToGmt(end_time).isBefore(getGmtTime());
  if (is_over) return <span>"Hackathon has ended"</span>;
  if (!is_logged_in)
    return (
      <AuthModal
        Trigger={({ handleClick }) => (
          <Button
            variant="primary"
            className="hd__action"
            size="lg"
            onClick={handleClick}
          >
            {ENROLL_NOW}
          </Button>
        )}
      />
    );
  return is_live && has_enrolled ? (
    <CountDown
      completeMessage="The hackathon has ended the results
         would be published soon"
      date={convertToGmt(end_time)}
      onCompleteCallBack={() => fetchSingleHackathon(hackathon_id)}
    />
  ) : has_unenroll_link || has_enroll_link ? (
    <Button
      variant="primary"
      className="hd__action"
      size="lg"
      onClick={onPrimaryClick}
    >
      {has_enrolled ? UN_ENROLL : ENROLL_NOW}
    </Button>
  ) : null;
};

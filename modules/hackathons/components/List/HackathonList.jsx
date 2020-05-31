import React, { Component } from "react";
import {
  hackathon_launch,
  achieve_more,
  crack_code,
  learn_things
} from "../../../../../common/images";
import HackathonListItem from "./HackathonListItem";

class HackathonList extends Component {
  componentDidMount() {
    this.props.fetchHackathons();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { is_logged_in, profile_loaded } = this.props;
    if (
      is_logged_in &&
      profile_loaded &&
      profile_loaded !== prevProps.profile_loaded
    ) {
      this.props.fetchHackathons();
    }
  }

  render() {
    const {
      list,
      is_logged_in,
      enrollHackathon,
      unEnrollHackathon
    } = this.props;
    const hackathon_list = list.filter(l => l.category === "HACKATHON");
    return (
      <div className="hl">
        <div className="hl__container">
          <div className="hl__section hl__top-section">
            <div>
              <h1>
                <span className="highlight">Solve</span> and unleash <br /> the
                data scientist
              </h1>
              <h3>
                Data science is part art and part science,
                <br />
                apply yourself to build creative and <br />
                robust solutions
              </h3>
            </div>
            <div className="img-holder">
              <img alt="Hackathon Launch" src={hackathon_launch} />
            </div>
          </div>

          <div className="hl__highlight-bar">
            <div>
              <img src={crack_code} alt="Crack Code" />
              <h4>Crack the code</h4>
            </div>
            <div>
              <img src={learn_things} alt="Learn new things" />
              <h4>Learn new things</h4>
            </div>
            <div>
              <img src={achieve_more} alt="Achieve more" />
              <h4>Achieve more</h4>
            </div>
          </div>

          <div className="hl__list-view">
            <div className="hl__section">
              <div>
                <h1>
                  Test & <span className="highlight">practice</span> your skills
                </h1>
                <h3>
                  Compete against hundreds of data scientists, <br />
                  with our industry curated hackathons.
                </h3>
              </div>
            </div>

            <div className="hl__list-view--list">
              {hackathon_list.map(h => (
                <HackathonListItem
                  {...h}
                  is_logged_in={is_logged_in}
                  enrollHackathon={enrollHackathon}
                  unEnrollHackathon={unEnrollHackathon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HackathonList;

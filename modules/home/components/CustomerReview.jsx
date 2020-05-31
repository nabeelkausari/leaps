import React, { Component } from "react";
import CustomerImagesItem from "./CustomerImagesItem";

import CustomerTextItem from "./CustomerTextItem";

class CustomerReview extends Component {
  state = {
    active_index: 0
  };

  items = [
    {
      image: "/images/shl-person-1.png",
      title:
        "Data Scientist/ Kaggle Master- Working for Financial Services Corporation",
      text:
        "“Thank you for all the efforts of Analyttica team which helped me to learn predictive analytics in a\n" +
        "simpler way. I’m glad to share about my success on Kaggle post my learnings from ATH. I’m currently\n" +
        "ranked in top 200 data scientists on Kaggle among 50K participants globally and ranked 10th from\n" +
        "India.”"
    },
    {
      image: "/images/shl-person-2.png",
      title: "Director Analytics- Largest EHR Solution Provider",
      text:
        "“We have been engaged with Analyttica for almost a year and using their experiential analytics\n" +
        "platform, Analyttica TreasureHunt to set up our Analytics Eco-System to expedite our data analytics\n" +
        "adoption journey at a greater speed. Through ATH, they have developed powerful Artificial\n" +
        "Intelligence based solutions which are deployed at scale in our organization and enabling end\n" +
        "business users to make data-driven decisions in their day to day work. Our business functions are\n" +
        "leveraging these AI solutions to improve the efficiency and effectiveness of daily operations.\n\n" +
        " We would recommend Analyttica for enterprises to adopt to accelerate their AI journey and start\n" +
        "realizing business impact faster and better.”"
    },
    {
      image: "/images/shl-person-3.png",
      title: "Regional Analytics Head- Global Insurance Firm",
      text:
        "“I have test driven ATH myself and would recommend to any entry level or experienced analytical\n" +
        "professional. Congrats to the Analyttica team!”"
    },
    {
      image: "/images/shl-person-4.png",
      title: "Student - Premier Commerce College",
      text:
        "“It was truly a great learning experience and it helped me a lot to understand how data analytics\n" +
        "actually works from the scratch. I am thankful for this opportunity and the enriching experience.\n" +
        "Thank you once again”"
    },
    {
      image: "/images/shl-person-5.png",
      title: "Senior Manager- Largest Automobile Manufacturer",
      text:
        "“It was a wonderful mix of theory and practical application of data analytics using case study. I\n " +
        "completed the Fundamentals of Data Analytics course. Thank you for the course. Looking forward\n " +
        "for more courses from Analyttica”"
    },
    {
      image: "/images/shl-person-6.png",
      title: "Chief Risk Officer- New age financial company",
      text:
        "“My team had a very good experience working with Analyttica. The team was quick to understand\n " +
        "the work requirements and tools ownership of the projects. They were extremely efficient and had\n " +
        "quick project turnarounds.\n\n" +
        "In our start-up environment, the Analyttica team quickly learned the data nuances and proactively\n " +
        "worked towards setting up the Risk reporting structure which helped to track key risk parameters\n " +
        "like Delinquency, Fraud, First pay default, Charge offs, etc. over multiple dimensions on a\n " +
        "weekly/monthly basis.”"
    }
  ];

  onArrowClick = direction => {
    const { active_index } = this.state;

    const last_index = this.items.length - 1;

    if (direction === "-") {
      if (active_index === 0) {
        this.setState(state => ({ active_index: last_index }));
      } else {
        this.setState(state => ({ active_index: state.active_index - 1 }));
      }
    } else if (direction === "+") {
      if (active_index === last_index) {
        this.setState(state => ({ active_index: 0 }));
      } else {
        this.setState(state => ({ active_index: state.active_index + 1 }));
      }
    }
  };

  render() {
    const { mobile_display } = this.props;
    const { active_index } = this.state;

    let main_container_class = `shl-home__main-container shl-home--bg-light ${
      mobile_display
        ? "shl-home__main-container--padding-mobile shl-home--direction-column  shl-home--align-centre"
        : "shl-home__main-container--padding-full shl-home--direction-column shl-home--align-centre "
    }`;

    return (
      <div className={main_container_class} id="customers">
        <div className="shl-home__section-info-text  u-margin-bottom-large">
          <h2
            className={`shl-home__section-title-1 ${
              mobile_display ? "shl-home--centre-text" : ""
            }`}
          >
            What our customers are saying
          </h2>
        </div>

        <div
          className={`shl-home__customer-review${
            mobile_display ? "--mobile" : ""
          }`}
        >
          <CustomerImagesItem
            items={this.items}
            active_index={active_index}
            mobile_display={mobile_display}
          />

          <div className="shl-home__section-actions-wrapper shl-home__section-actions-wrapper--1 shl-home--justify-centre">
            <span className="shl-home__section-actions-wrapper--sub-1">
              <img
                src="/icons/scholar-left-arrow.svg"
                alt="left arrow"
                className={`shl-home__arrow-icon${
                  mobile_display ? "--mobile shl-home__arrow-icon" : ""
                }`}
                onClick={() => this.onArrowClick("-")}
              />
              <img
                src="/icons/scholar-right-arrow.svg"
                alt="right arrow"
                className={`shl-home__arrow-icon${
                  mobile_display ? "--mobile shl-home__arrow-icon" : ""
                }`}
                onClick={() => this.onArrowClick("+")}
              />
            </span>
          </div>

          <CustomerTextItem
            item={this.items[active_index]}
            mobile_display={mobile_display}
          />
        </div>
      </div>
    );
  }
}

export default CustomerReview;

import React from "react";
import get from "lodash/get";
import { Button } from "../../../../components/Buttons/Button";
import { HackathonListItemTimings } from "./HackathonListItemTimings";
import { Live, Past, Upcoming } from "./ListItemComponents";
import { withRouter } from "react-router-dom";
import AuthModal from "../../../auth/components/shared/AuthModal";
import {
  convertToGmt,
  getGmtTime
} from "../../../../../common/utils/helperFunctions";
import { ENROLL_NOW, UN_ENROLL } from "../../../../../common/utils/constants";

const HackathonListItem = props => {
  const {
    hackathon_id,
    title,
    image_url,
    start_time,
    end_time,
    is_logged_in,
    is_live
  } = props;
  const is_past = convertToGmt(start_time).isBefore(getGmtTime());

  const openDetails = id => {
    props.history.push(`/hackathons/${id}`);
  };

  const has_enroll_link = get(props, "_links.enrol_hackathon");
  const has_unenroll_link = get(props, "_links.unenrol_hackathon");

  const has_enrolled = !has_enroll_link;

  const onPrimaryClick = () => {
    if (has_enrolled) {
      return props.unEnrollHackathon(props);
    }
    props.enrollHackathon(props);
  };

  return (
    <div className="hli">
      <div className="hli__img">
        <img src={image_url} alt="Credit Card" />
      </div>
      <div className="hli__details">
        {is_live ? <Live /> : is_past ? <Past /> : <Upcoming />}
        <div className="hli__info">
          <h1>{title}</h1>
          {/*<p>{"business_objective"}</p>*/}
        </div>

        <HackathonListItemTimings start_time={start_time} end_time={end_time} />

        <div className="hli__actions">
          {is_logged_in
            ? (!is_past || is_live) &&
              (has_enroll_link || has_unenroll_link) && (
                <Button
                  variant="primary"
                  className=""
                  size="md"
                  onClick={() => onPrimaryClick()}
                >
                  {has_enrolled ? UN_ENROLL : ENROLL_NOW}
                </Button>
              )
            : is_past && (
                <AuthModal
                  Trigger={({ handleClick }) => (
                    <Button
                      variant="primary"
                      className=""
                      size="md"
                      onClick={handleClick}
                    >
                      {ENROLL_NOW}
                    </Button>
                  )}
                />
              )}
          <Button
            onClick={() => openDetails(hackathon_id)}
            size="md"
            variant="outline-primary"
          >
            More Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(HackathonListItem);

import * as types from "./types";
import get from "lodash/get";
import { fetchLinkAs } from "../../../common/api/helpers";
import { notify } from "../../../common/utils/notification";

export const fetchWebinars = () => (dispatch, getState) => {
  const { profile } = getState();
  const self_link = get(profile, "info._links.self.href");
  let href;
  if (!self_link) {
    href = "/webinar/user/tenant/webinar";
  } else {
    let user_id = self_link.split("/")[2];
    let tenant_id = get(profile, "info.tenant_id");
    href = `/webinar/user/${user_id}/tenant/${tenant_id}/webinar`;
  }

  dispatch({ type: types.FETCH_WEBINARS_REQUESTED });
  return fetchLinkAs({
    href,
    method: "GET",
    type: "application/vnd.Analyttica.TreasureHunt.WebinarDTO+json"
  })
    .then(payload =>
      dispatch({ type: types.FETCH_WEBINARS_SUCCEEDED, payload })
    )
    .catch(error =>
      dispatch({ type: types.FETCH_WEBINARS_FAILED, payload: error })
    );
};

export const enrolWebinar = ({ webinarSessionId, webinarId }) => (
  dispatch,
  getState
) => {
  const { profile } = getState();
  const self_link = get(profile, "info._links.self.href");
  let user_id = self_link.split("/")[2];
  let { tenant_id } = get(profile, "info");

  dispatch({ type: types.ENROL_WEBINAR_REQUESTED });
  return fetchLinkAs(
    {
      href: `/webinar/user/${user_id}/tenant/${tenant_id}/enrol`,
      method: "POST",
      type: "application/vnd.Analyttica.TreasureHunt.UserEnroleDTO+json"
    },
    { webinarSessionId, webinarId }
  )
    .then(payload => {
      dispatch({
        type: types.ENROL_WEBINAR_SUCCEEDED,
        payload: { webinarSessionId, webinarId, enrolId: payload.id }
      });
      notify.success("Done", "Successfully Enrolled");
    })
    .catch(error =>
      dispatch({ type: types.ENROL_WEBINAR_FAILED, payload: error })
    );
};

export const unenrolWebinar = ({ webinarSessionId, webinarId, enrolId }) => (
  dispatch,
  getState
) => {
  const { profile } = getState();
  const self_link = get(profile, "info._links.self.href");
  let user_id = self_link.split("/")[2];
  let { tenant_id } = get(profile, "info");

  dispatch({ type: types.UNENROL_WEBINAR_REQUESTED });
  return fetchLinkAs({
    href: `/webinar/user/${user_id}/tenant/${tenant_id}/enrol/${enrolId}`,
    method: "DELETE",
    type: "application/vnd.Analyttica.TreasureHunt.UserEnroleDTO+json"
  })
    .then(payload => {
      dispatch({
        type: types.UNENROL_WEBINAR_SUCCEEDED,
        payload: { webinarSessionId, webinarId, enrolId }
      });
      notify.success("Done", "Successfully Cancelled");
    })
    .catch(error =>
      dispatch({ type: types.UNENROL_WEBINAR_FAILED, payload: error })
    );
};

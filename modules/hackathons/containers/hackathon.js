import { connect } from "react-redux";
import {
  enrollHackathon,
  fetchHackathons,
  fetchSingleHackathon,
  unEnrollHackathon
} from "../redux/actions";
import { dialogs } from "../../toPublish/Dialog";

const mapStateToProps = (state, props) => {
  const {
    auth: { is_logged_in },
    profile: { profile_loaded },
    hackathon
  } = state;

  const { hackathon_id } = props.match.params;
  return {
    is_logged_in,
    profile_loaded,
    current_hackathon: (hackathon.list || [])
      .filter(h => h.hackathon_id === Number(hackathon_id))
      .shift(),
    ...hackathon
  };
};

export default connect(mapStateToProps, {
  fetchHackathons,
  fetchSingleHackathon,
  showDialog: dialogs.show,
  enrollHackathon,
  unEnrollHackathon
});

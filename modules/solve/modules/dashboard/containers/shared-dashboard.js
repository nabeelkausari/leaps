import { connect } from "react-redux";
import { getSharedDashboard } from "../../../../collaborators/redux/actions";

const mapStateToProps = ({
  collaborators: { shared_dashboard },
  profile: { theme }
}) => {
  return {
    shared_dashboard,
    theme
  };
};

export const SharedDashboardContainer = connect(mapStateToProps, {
  getSharedDashboard
});

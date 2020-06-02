import { connect } from "react-redux";
import {
  pinStep,
  addDashboardItem,
  getDashboardItems,
  updateDashboardItem,
  arrangeDashboardItems,
  addTitleToDashboardItem,
  removeDashboardItem
} from "../redux/actions";
import { dialogs } from "../../../../toPublish/Dialog";

const mapStateToProps = ({ cases, profile, solve: { dashboard } }) => {
  return {
    ...cases,
    ...dashboard,
    theme: profile.theme
  };
};

export const DashboardContainer = connect(mapStateToProps, {
  pinStep,
  addDashboardItem,
  getDashboardItems,
  updateDashboardItem,
  arrangeDashboardItems,
  addTitleToDashboardItem,
  removeDashboardItem,
  showDialog: dialogs.show
});

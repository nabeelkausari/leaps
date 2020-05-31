import React, { Component } from "react";
import find from "lodash/find";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import SharedDashboardRenderer from "../../../modules/solve/modules/dashboard/components/SharedDashboardRenderer";
import { API_GATEWAY_URI } from "../../../../common/api/constants";
import { notify } from "../../../../common/utils/notification";
import Loader from "../../../components/Loader";
import moment from "moment";
const crumbs = [
  {
    text: "Covid Analysis",
    link: "/covid-analysis"
  }
];

class CovidDashboardDetails extends Component {
  state = {
    dashboard: {},
    loading: false
  };

  fetchDashboardList = () => {
    const { dashboard_id } = this.props.match.params;
    this.setState({ loading: true });
    fetch(`${API_GATEWAY_URI}/course/dashBoard/getAllDashBoardDetails`)
      .then(res => res.json())
      .then(response => {
        const dashboard = find(response, d => d.id === Number(dashboard_id));
        this.setState({
          dashboard,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        notify.error("Failed to fetch dashboards", error.message);
      });
  };

  componentDidMount() {
    const {
      location: {
        state: { dashboard }
      }
    } = this.props;
    if (Object.keys(dashboard).keys() > 0) {
      this.setState({ dashboard });
    } else {
      this.fetchDashboardList();
    }
  }

  render() {
    const { loading, dashboard } = this.state;
    const dashboard_code = dashboard.url;
    const { title, description, date } = dashboard;
    return (
      <div className="covid-detail">
        <Loader loading={loading} />
        <div className="covid-detail-banner">
          <Breadcrumb crumbs={crumbs} final_crumb={title} />
          <div className="covid-detail-banner__left">
            <h2 className="covid-detail-banner__title">{title}</h2>
            <p className="covid-detail-banner__description">{description}</p>
            <div className="covid-detail-banner__bottom">
              <h4 className="covid-detail-banner__support">
                To view the complete case study, join us @ leaps.analyttica.com
              </h4>
              <div className="covid-detail-banner__date">
                Data as on: {moment(date).format("Do MMM YYYY")}
              </div>
            </div>
          </div>
        </div>

        {!!dashboard_code && (
          <div className="covid-detail__dashboard">
            <SharedDashboardRenderer
              {...this.props}
              dashboard_code={dashboard_code}
            />
          </div>
        )}
      </div>
    );
  }
}

export default CovidDashboardDetails;

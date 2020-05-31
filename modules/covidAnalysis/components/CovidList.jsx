import React, { Component, Fragment } from "react";
import { DashboardCard, doctors_icon } from "../../../../common/images";
import { API_GATEWAY_URI } from "../../../../common/api/constants";
import { notify } from "../../../../common/utils/notification";
import Loader from "../../../components/Loader";
import moment from "moment";
import { SearchInput } from "../../../components/Forms/FormInput";
import { searchStartsWith } from "../../../../common/utils/helperFunctions";
import { NavLink } from "react-router-dom";

class CovidList extends Component {
  state = {
    dashboard_list: [],
    loading: false,
    search_query: ""
  };
  openDashboard = dashboard => {
    this.props.history.push(`/covid-analysis/${dashboard.id}`, { dashboard });
  };

  onSearch = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`${API_GATEWAY_URI}/course/dashBoard/getAllDashBoardDetails`)
      .then(res => res.json())
      .then(response => {
        const dashboard_list = response.sort((a, b) => b.sequence - a.sequence);
        this.setState({
          dashboard_list,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        notify.error("Failed to fetch dashboards", error.message);
      });
  }

  render() {
    const { dashboard_list, loading, search_query } = this.state;
    const dashboard_list_filtered =
      search_query === ""
        ? dashboard_list
        : dashboard_list.filter(d => {
            const title_list = d.title.split(" ");
            const description_list = d.description.split(" ");
            return searchStartsWith(
              [...title_list, ...description_list],
              search_query
            );
          });
    return (
      <div className="covid-list">
        <Loader loading={loading} />
        <div className="covid-list-banner">
          <div className="covid-list-banner__left">
            <div className="covid-list-banner__title">
              Welcome to the LEAPS COVID-19 analysis page.
            </div>
            <p className="covid-list-banner__description">
              This page highlights how the LEAPS platform can be leveraged to
              explore, analyze & visualize the COVID-19 data.
              <br /> <br />
              The datasets have been sourced from the publicly available
              websites and the links to the same available in the dashboard.
              <br /> <br />
              The complete analysis and visualization of the COVID-19 data was
              executed in LEAPS, leveraging the different features and
              functionalities and the underlying datasets are also available as
              part of the preloaded datasets for anyone interested in exploring
              further. Refer to the sample case to explore the various
              visualizations and other features of the LEAPS platform.
              <br /> <br />
              Join us at LEAPS to Learn by Doing!!
            </p>
            <p className="covid-list-banner__disclaimer">
              Disclaimer: <br />
              Usage of this data and any reporting and/or analyses thereof is
              strictly for academic purpose only and must not be used for any
              directions and/or actions. Please see the detailed disclaimer at
              the end of every dashboard page
            </p>
          </div>

          <img
            src={doctors_icon}
            alt="doctors"
            className="covid-list-banner__right"
          />
        </div>
        <div className="covid-list__items">
          {!!dashboard_list.length && (
            <Fragment>
              <div className="covid-list__search-wrapper">
                <div className="covid-list__search">
                  <SearchInput
                    type="text"
                    name="search_query"
                    value={search_query}
                    onChange={this.onSearch}
                    placeholder="Search by tag, Keyword"
                    className="covid-list__search--input"
                  />
                </div>
              </div>
              {dashboard_list_filtered.map(d => (
                <DashboardListItem
                  key={d.id}
                  dashboard={d}
                  openDashboard={this.openDashboard}
                />
              ))}
            </Fragment>
          )}
          {!dashboard_list.length && <EmptyCovidDashboardList />}
        </div>
      </div>
    );
  }
}

export default CovidList;

const DashboardListItem = ({ dashboard, openDashboard }) => {
  const { id, title, description, file_type, file_data, date } = dashboard;
  return (
    <div className="dashboard-item" onClick={() => openDashboard(dashboard)}>
      <div className="dashboard-item__left">
        <h1 className="dashboard-item__title">{title}</h1>
        <p className="dashboard-item__description">{description}</p>
        <div className="dashboard-item__date">
          Data as on : {moment(date).format("Do MMM YYYY")}
        </div>
      </div>
      <div className="dashboard-item__right">
        <img
          src={`data:${file_type};base64,${file_data}`}
          alt="dashboard"
          className="dashboard-item__image"
        />
      </div>
    </div>
  );
};

const EmptyCovidDashboardList = () => {
  return (
    <div className="covid-list__empty">
      <h3 className="covid-list__empty--title">It’s Empty here, Stay Tuned</h3>
      <h4 className="covid-list__empty--sub-title">
        Experiment with your own dataset in the{" "}
        {
          <NavLink to="/cases" className="covid-list__empty--link">
            "Apply"
          </NavLink>
        }{" "}
        section
      </h4>
      <div className="covid-list__empty--image">
        <img src={DashboardCard} alt="dashboard" />
      </div>
    </div>
  );
};

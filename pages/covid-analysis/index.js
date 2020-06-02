import React, { useState } from "react";
import Link from "next/link"
import fetch from "node-fetch"
import { useRouter } from "next/router"
import { API_GATEWAY_URI } from "../../common/api/constants"
import moment from "moment";
import { SearchInput } from "../../components/Forms/FormInput"
import { searchStartsWith } from "../../common/utils/helperFunctions"
import Layout from "../../components/Layout"

const CovidList = ({ dashboard_list }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter();

  const openDashboard = dashboard => {
    router.push("/covid-analysis/[dashboard].js", `/covid-analysis/${dashboard.id}`, { dashboard });
  };

  const onSearch = e => {
    setSearchQuery(e.target.value);
  };

  const dashboard_list_filtered =
    searchQuery === ""
      ? dashboard_list
      : dashboard_list.filter(d => {
        const title_list = d.title.split(" ");
        const description_list = d.description.split(" ");
        return searchStartsWith(
          [...title_list, ...description_list],
          searchQuery
        );
      });
  return (
    <Layout>
      <div className="covid-list">
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
            src="/icons/doctors.svg"
            alt="doctors"
            className="covid-list-banner__right"
          />
        </div>
        <div className="covid-list__items">
          {!!dashboard_list.length && (
            <>
              <div className="covid-list__search-wrapper">
                <div className="covid-list__search">
                  <SearchInput
                    type="text"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={onSearch}
                    placeholder="Search by tag, Keyword"
                    className="covid-list__search--input"
                  />
                </div>
              </div>
              {dashboard_list_filtered.map(d => (
                <DashboardListItem
                  key={d.id}
                  dashboard={d}
                  openDashboard={openDashboard}
                />
              ))}
            </>
          )}
          {!dashboard_list.length && <EmptyCovidDashboardList />}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const url = `${API_GATEWAY_URI}/course/dashBoard/getAllDashBoardDetails`;
  const options = {
    headers: {
      'Connection': 'keep-alive',
    }
  }
  const response = await fetch(url, options).then(res => res.json())
  const dashboard_list = response.sort((a, b) => b.sequence - a.sequence);

  return {
    props: { dashboard_list },
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
          <Link href="/cases">
            <a className="covid-list__empty--link">Apply</a>
          </Link>
        }{" "}
        section
      </h4>
      <div className="covid-list__empty--image">
        <img src="/image/dashboard-card.png" alt="dashboard" />
      </div>
    </div>
  );
};

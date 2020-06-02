import React from "react";
import find from "lodash/find";
import fetch from "node-fetch"
import moment from "moment";

import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { API_GATEWAY_URI } from "../../common/api/constants";
import Layout from "../../components/Layout"

const CovidDashboardDetails = ({ title, description, date, url }) => {
  const crumbs = [
    {
      text: "Covid Analysis",
      link: "/covid-analysis"
    }
  ];

  return (
    <Layout className="height-minus-header">
      <div className="covid-detail">
        <div className="covid-detail-banner">
          <Breadcrumb crumbs={crumbs} final_crumb={title} />
          <div className="covid-detail-banner__left">
            <h2 className="covid-detail-banner__title" title={title}>{title}</h2>
            <p className="covid-detail-banner__description" title={description}>{description}</p>
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

        <div className="covid-detail__dashboard">
          {typeof window !== "undefined" && <iframe
            src={`https://leaps.analyttica.com/shared_dashboard/${url}`}
          />}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const url = `${API_GATEWAY_URI}/course/dashBoard/getAllDashBoardDetails`;
  const options = {
    headers: {
      'Connection': 'keep-alive',
    }
  }
  const dashboard_list = await fetch(url, options).then(res => res.json())

  const dashboard = find(dashboard_list, d => d.id === Number(params.dashboard))

  return {
    props: dashboard,
  }
}

export default CovidDashboardDetails;

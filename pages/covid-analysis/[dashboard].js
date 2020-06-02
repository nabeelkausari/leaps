import React, {useEffect} from "react";
import find from "lodash/find";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import SharedDashboardRenderer from "../../modules/solve/modules/dashboard/components/SharedDashboardRenderer";
import { API_GATEWAY_URI } from "../../common/api/constants";
import moment from "moment";
import fetch from "node-fetch"
import { getSharedDashboard } from "../../modules/collaborators/redux/actions"
import {useDispatch, useSelector} from "react-redux"
import Layout from "../../components/Layout"
import {useRouter} from "next/router"

const crumbs = [
  {
    text: "Covid Analysis",
    link: "/covid-analysis"
  }
];

const CovidDashboardDetails = props => {
  const { title, description, date, url } = props
  const dispatch = useDispatch();
  const router = useRouter();
  const {shared_dashboard} = useSelector(state => state.collaborators);

  console.log("CovidDashboardDetails props: ", props)
  console.log("CovidDashboardDetails router: ", router)
  useEffect(() => {
    dispatch(getSharedDashboard(url))
  }, [dispatch])

  return (
    <Layout>
      <div className="covid-detail">
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

        <div className="covid-detail__dashboard">
          <SharedDashboardRenderer
            shared_dashboard={shared_dashboard}
          />
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

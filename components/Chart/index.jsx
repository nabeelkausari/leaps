import React, { Fragment } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import get from "lodash/get";

// maps
import World from "fusioncharts/maps/fusioncharts.world";
import Usa from "fusioncharts/maps/fusioncharts.usa";
import India from "fusioncharts/maps/fusioncharts.india";
import Maps from "fusioncharts/fusioncharts.maps";
import TreeMap from "fusioncharts/fusioncharts.treemap";
import Widgets from "fusioncharts/fusioncharts.widgets";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import PowerCharts from "fusioncharts/fusioncharts.powercharts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import GammelTheme from "fusioncharts/themes/fusioncharts.theme.gammel";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import ZuneTheme from "fusioncharts/themes/fusioncharts.theme.zune";
import OceanTheme from "fusioncharts/themes/fusioncharts.theme.ocean";
import CarbonTheme from "fusioncharts/themes/fusioncharts.theme.carbon";

import { fetchLinkDirectlyAs } from "../../../common/api/helpers";

charts(FusionCharts);
ReactFC.fcRoot(
  FusionCharts,
  FusionTheme,
  GammelTheme,
  CandyTheme,
  ZuneTheme,
  OceanTheme,
  CarbonTheme,
  World,
  Usa,
  Maps,
  TreeMap,
  Widgets,
  TimeSeries,
  India,
  PowerCharts
);

class Chart extends React.Component {
  state = {
    chartData: {},
    loading: null,
    theme: ""
  };

  componentDidMount() {
    this.fetchChartData();
    let theme = this.props.theme === "dark" ? "candy" : "fusion";
    this.setState({ theme });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (get(this.props, "link.href") !== get(prevProps, "link.href")) {
      this.fetchChartData();
    }
  }

  fetchChartData = () => {
    this.setState({ loading: true });
    // if (!this.props.link) return;
    fetchLinkDirectlyAs(this.props.link)
      .then(chart => {
        this.setState({
          chartData: {
            ...chart,
            width: "100%",
            height: "500",
            dataSource: {
              ...chart.dataSource,
              chart: {
                ...chart.dataSource.chart,
                theme: this.state.theme
              }
            }
          },
          loading: false
        });
      })
      .catch(reason => {
        console.log(reason);
        this.setState({ loading: false });
      });
  };

  changeTheme = theme => {
    this.setState({ theme: theme });
    this.setState(state => {
      return {
        chartData: {
          ...state.chartData,
          dataSource: {
            ...state.chartData.dataSource,
            chart: {
              ...state.chartData.dataSource.chart,
              theme: theme
            }
          }
        }
      };
    });
  };

  render() {
    const { chartData, loading } = this.state;
    return (
      <div className="chart-area">
        {loading ? (
          <div className="chart-area__loader">
            <h2 className="chart-area__title">
              Please wait! Your chart is being prepared..
            </h2>
          </div>
        ) : (
          <Fragment>
            <ReactFC {...chartData} />
            {/*<div>*/}
            {/*    {*/}
            {/*       [ "fusion","gammel","candy","ocean","carbon"].map(item => (*/}
            {/*           <Form.Check*/}
            {/*               inline label={item}*/}
            {/*               type="radio"*/}
            {/*               id={`inline-radio-${item}`}*/}
            {/*               checked={this.state.theme === item}*/}
            {/*               onClick={() =>this.changeTheme(item)}*/}
            {/*           />*/}
            {/*       ))*/}
            {/*    }*/}
            {/*</div>*/}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Chart;

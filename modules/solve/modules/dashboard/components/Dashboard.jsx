import React, { Component, Fragment } from "react";
import get from "lodash/get";
import cx from "classnames";
import { DashboardContainer } from "../containers/dashboard";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { withRouter } from "react-router-dom";

import { EmptyScreen } from "./EmptyScreen";
import ResultComponent from "./ResultComponent";
import AddElement from "./AddElement";
import { TextHolder } from "./TextHolder";
import { DASHBOARD_GRID } from "../../../../../../common/utils/constants";

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends Component {
  static defaultProps = {
    className: "dashboard",
    items: 1,
    rowHeight: 1,
    cols: DASHBOARD_GRID,
    margin: [8, 8],
    preventCollision: true
  };

  state = {
    pinned_steps: [],
    full_screen_card_index: null
  };

  componentDidMount() {
    const {
      fetch_case_details_succeeded,
      match: {
        params: { scenario_id }
      }
    } = this.props;
    if (fetch_case_details_succeeded) {
      this.props.getDashboardItems(scenario_id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetch_case_details_succeeded,
      update_dashboard_item_succeeded,
      pin_output_succeeded,
      match: {
        params: { scenario_id }
      }
    } = this.props;

    const case_details_loaded =
      fetch_case_details_succeeded &&
      fetch_case_details_succeeded !== prevProps.fetch_case_details_succeeded;
    const dashboard_item_updated =
      update_dashboard_item_succeeded &&
      update_dashboard_item_succeeded !==
        prevProps.update_dashboard_item_succeeded;
    const un_pinned =
      pin_output_succeeded &&
      pin_output_succeeded !== prevProps.pin_output_succeeded;

    if (case_details_loaded || dashboard_item_updated || un_pinned) {
      this.props.getDashboardItems(scenario_id);
    }

    if (scenario_id && scenario_id !== prevProps.match.params.scenario_id) {
      this.props.getDashboardItems(scenario_id);
    }
  }

  handleFullScreen = index => {
    this.setState(({ full_screen_card_index }) => ({
      full_screen_card_index: full_screen_card_index === index ? null : index
    }));
  };

  handleResize = (data, item, i) => {
    const {
      match: {
        params: { scenario_id }
      }
    } = this.props;
    let [changed_item] = this.props.dashboard_items.filter(p => p.i === item.i);
    if (changed_item.h !== i.h || changed_item.w !== i.w) {
      this.props.arrangeDashboardItems(data, scenario_id);
    }
  };

  handleDrag = (data, item, i) => {
    const {
      match: {
        params: { scenario_id }
      }
    } = this.props;
    let [changed_item] = this.props.dashboard_items.filter(p => p.i === item.i);
    if (changed_item.x !== i.x || changed_item.y !== i.y) {
      this.props.arrangeDashboardItems(data, scenario_id);
    }
  };

  handleSaveTitle = (title, pin) => {
    this.props.addTitleToDashboardItem({ ...pin, title });
  };

  handleAccItemClick = obj => {
    const {
      match: {
        params: { scenario_id }
      }
    } = this.props;
    this.props.addDashboardItem(obj, scenario_id);
  };

  render() {
    const { full_screen_card_index } = this.state;
    const {
      read_only,
      dashboard_items,
      remove_dashboard_item_succeeded,
      match: {
        params: { scenario_id }
      },
      showDialog,
      details
    } = this.props;
    const full_screen_step =
      (full_screen_card_index || full_screen_card_index === 0) &&
      dashboard_items.find(item => item.i === full_screen_card_index);
    const modify_dashboard = get(details, "_links.modify_dashboard");
    const readonly_dashboard = read_only || !modify_dashboard;
    return (
      <Fragment>
        {!readonly_dashboard && (
          <AddElement handleClick={this.handleAccItemClick} />
        )}
        {(full_screen_card_index || full_screen_card_index === 0) && (
          <div
            key={full_screen_card_index}
            className="card-output card-output--full-screen"
          >
            {
              <ResultComponent
                {...this.props}
                pin={full_screen_step}
                handleFullScreen={this.handleFullScreen}
                handleSaveTitle={this.handleSaveTitle}
                full_screen
                readonly_dashboard={readonly_dashboard}
              />
            }
          </div>
        )}
        {!full_screen_card_index && dashboard_items.length > 0 ? (
          <ReactGridLayout
            {...this.props}
            compactType={null}
            layout={dashboard_items}
            onDragStop={this.handleDrag}
            onResizeStop={this.handleResize}
            style={{ width: "100%" }}
            isDraggable={!readonly_dashboard}
            isResizable={!readonly_dashboard}
            draggableHandle=".draggable-element"
          >
            {dashboard_items.map((pin, i) => {
              if (pin.step_id) {
                return (
                  <div key={i} className="card-output">
                    {
                      <ResultComponent
                        {...this.props}
                        key={i}
                        i={i}
                        pin={pin}
                        handleFullScreen={this.handleFullScreen}
                        handleSaveTitle={this.handleSaveTitle}
                        readonly_dashboard={readonly_dashboard}
                      />
                    }
                  </div>
                );
              } else {
                return (
                  <div
                    className={cx(["text-item", read_only && "read-only"])}
                    key={i}
                  >
                    <TextHolder
                      remove={pin =>
                        this.props.removeDashboardItem(pin, scenario_id)
                      }
                      read_only={readonly_dashboard}
                      key={i}
                      pin={pin}
                      changeText={this.props.updateDashboardItem}
                      remove_dashboard_item_succeeded={
                        remove_dashboard_item_succeeded
                      }
                      showDialog={showDialog}
                    />
                  </div>
                );
              }
            })}
          </ReactGridLayout>
        ) : (
          <EmptyScreen theme={this.props.theme} />
        )}
      </Fragment>
    );
  }
}

export default withRouter(DashboardContainer(Dashboard));

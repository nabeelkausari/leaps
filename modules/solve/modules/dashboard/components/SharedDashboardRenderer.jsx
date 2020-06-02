import React, { Component, Fragment } from "react";
import RGL, { WidthProvider } from "react-grid-layout";

import { DashboardLinkEmptyScreen } from "./EmptyScreen";
import ResultComponent from "./ResultComponent";
import EditorView from "../../../../../components/Editor/EditorView";

const ReactGridLayout = WidthProvider(RGL);

class SharedDashboardRenderer extends Component {
  static defaultProps = {
    className: "dashboard",
    items: 1,
    rowHeight: 1,
    cols: 96,
    margin: [8, 8],
    preventCollision: true
  };

  state = {
    pinned_steps: [],
    full_screen_card_index: null,
    is_accordion_open: false
  };

  componentDidMount() {
    const { dashboard_code, shared_dashboard } = this.props;
    if (dashboard_code && !shared_dashboard) {
      this.props.getSharedDashboard(dashboard_code);
    }
  }

  handleFullScreen = index => {
    this.setState(({ full_screen_card_index }) => ({
      full_screen_card_index: full_screen_card_index === index ? null : index
    }));
  };

  render() {
    const { full_screen_card_index } = this.state;
    const { shared_dashboard } = this.props;
    if (!shared_dashboard) return <div />;
    const full_screen_step =
      (full_screen_card_index || full_screen_card_index === 0) &&
      shared_dashboard.find(item => item.i === full_screen_card_index);
    return (
      <Fragment>
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
                full_screen
                readonly_dashboard
              />
            }
          </div>
        )}
        {!full_screen_card_index && shared_dashboard.length > 0 ? (
          <ReactGridLayout
            compactType={null}
            layout={shared_dashboard}
            style={{ width: "100%" }}
            isDraggable={false}
            isResizable={false}
            draggableHandle=".draggable-element"
            {...this.props}
          >
            {shared_dashboard.map((pin, i) => {
              if (pin.step_id) {
                return (
                  <div key={i} className="card-output read-only">
                    <ResultComponent
                      {...this.props}
                      key={i}
                      i={i}
                      pin={pin}
                      handleFullScreen={this.handleFullScreen}
                      readonly_dashboard
                    />
                  </div>
                );
              } else {
                return (
                  <div className="text-item read-only" key={i}>
                    <div className={"text-item__content " + pin.type}>
                      <div className="dashboard-element__wrapper">
                        <div className="dashboard-element__input-wrapper">
                          <span
                            className={
                              "dashboard-element__text " + pin.detail.type
                            }
                          >
                            {pin.detail.type === "heading" ||
                            pin.detail.type === "sub-heading" ||
                            pin.detail.type === "paragraph" ? (
                              pin.detail.value
                            ) : (
                              <EditorView content={pin.detail.value} />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </ReactGridLayout>
        ) : (
          <DashboardLinkEmptyScreen />
        )}
      </Fragment>
    );
  }
}

export default SharedDashboardRenderer;

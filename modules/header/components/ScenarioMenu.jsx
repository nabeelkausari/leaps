import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import get from "lodash/get";
import cx from "classnames";

import { removeUnderscores } from "../../../../common/utils/helperFunctions";
import { ArrowDownIcon } from "../../../../common/images";
import {
  setSessionStorage,
  SOLVE_LINK
} from "../../../../common/utils/storage";
import onClickOutside from "react-onclickoutside";

class ScenarioMenu extends Component {
  state = {
    is_scenario_menu_open: false,
    selected_scenario: null
  };

  navigateToScenario = scenario => {
    const {
      match: {
        params: { case_id }
      },
      location: { pathname }
    } = this.props;
    this.setState({ selected_scenario: scenario });
    this.toggleScenarioDropDown();
    let view = pathname.split("/");
    this.props.history.push(
      `/cases/${case_id}/${scenario.id}/${view[view.length - 1]}`
    );
    setSessionStorage(SOLVE_LINK, get(scenario, "_links.get_scenario_details"));
  };

  toggleScenarioDropDown = () => {
    this.setState({ is_scenario_menu_open: !this.state.is_scenario_menu_open });
  };

  setScenario = () => {
    const {
      current_case,
      match: {
        params: { scenario_id }
      }
    } = this.props;
    let selected_scenario = current_case.scenarios.find(
      s => s.id.toString() === scenario_id
    );
    // this.setState({selected_scenario: selected_scenario ? selected_scenario : current_case.scenarios[0]});
    this.setState({ selected_scenario });
  };

  handleClickOutside = evt => {
    this.setState({ is_scenario_menu_open: false });
  };

  componentDidMount() {
    const { current_case } = this.props;
    if (current_case.scenarios !== undefined) {
      this.setScenario();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetch_case_details_succeeded,
      match: {
        params: { scenario_id }
      }
    } = this.props;

    let scenario_changed =
      scenario_id && scenario_id !== prevProps.match.params.scenario_id;
    let case_loaded =
      fetch_case_details_succeeded &&
      fetch_case_details_succeeded !== prevProps.fetch_case_details_succeeded;
    if (case_loaded || scenario_changed) {
      this.setScenario();
    }
  }

  render() {
    const { current_case } = this.props;
    const { selected_scenario, is_scenario_menu_open } = this.state;
    const scenario_menu =
      (current_case.scenarios &&
        selected_scenario &&
        current_case.scenarios
          .filter(s => !s.reference_scenario)
          .filter(s => s.id !== selected_scenario.id)) ||
      [];
    return (
      <div className="scenario-list">
        <div className="scenario-item" onClick={this.toggleScenarioDropDown}>
          <span className="scenario-item__name">
            {removeUnderscores(get(selected_scenario, "name"))}
          </span>
          {scenario_menu.length > 0 && (
            <ArrowDownIcon
              className={cx("scenario-item__icon-arrow", {
                "scenario-item__icon-arrow-up": is_scenario_menu_open
              })}
            />
          )}
        </div>

        {is_scenario_menu_open && scenario_menu.length > 0 && (
          <ul className="scenario-list__dropdown">
            {scenario_menu.map((scenario, i) => (
              <li
                key={i}
                className="scenario-list__dropdown--item"
                onClick={() => this.navigateToScenario(scenario)}
              >
                {removeUnderscores(scenario.name)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

ScenarioMenu.propTypes = {
  current_case: PropTypes.object,
  fetch_case_details_succeeded: PropTypes.bool
};

export default withRouter(onClickOutside(ScenarioMenu));

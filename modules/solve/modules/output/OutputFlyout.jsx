import React, { Component, Fragment } from "react";
import get from "lodash/get";
import Flyout from "../../../../components/Flyout/Flyout";
import OutputContainer from "./results/containers/results";
import { FlyoutContent } from "./FlyoutContent";
import { withRouter } from "react-router-dom";

class OutputFlyout extends Component {
  print_ref = React.createRef();
  render() {
    const {
      details,
      secondary,
      is_secondary_step_set,
      results_primary,
      results_secondary,
      is_primary_flyout_full_screen,
      setFlyoutFullScreen,
      fetch_function_desc_requested
    } = this.props;

    const { scenario_id } = this.props.match.params;
    const show_pin = !!get(details, "_links.modify_dashboard");
    return (
      <Fragment>
        <Flyout
          require_pin={true}
          require_download={true}
          require_full_screen={true}
          sequence_no={
            results_primary && !secondary
              ? results_primary.sequence_number
              : results_secondary &&
                is_secondary_step_set &&
                results_secondary.sequence_number
          }
          title={
            results_primary && !secondary
              ? results_primary.operation_name
              : results_secondary &&
                is_secondary_step_set &&
                results_secondary.operation_name
          }
          show_pin={
            show_pin && results_primary && !secondary
              ? !results_primary.is_error
              : results_secondary &&
                is_secondary_step_set &&
                !results_secondary.is_error
          }
          OnCLickFullScreen={setFlyoutFullScreen}
          is_flyout_full_screen={is_primary_flyout_full_screen}
          print_ref={this.print_ref}
          scenario_id={scenario_id}
          {...this.props}
        >
          <FlyoutContent
            function_desc_loading={fetch_function_desc_requested}
            {...this.props}
            print_ref={this.print_ref}
          />
        </Flyout>
      </Fragment>
    );
  }
}

export default OutputContainer(withRouter(OutputFlyout));

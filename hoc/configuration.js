import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return state;
}

export default ComposedComponent => {
  class Configuration extends Component {
    state = {
      add_dataset: true
    };

    render() {
      return <ComposedComponent {...this.state} />;
    }
  }

  return connect(mapStateToProps)(Configuration);
};

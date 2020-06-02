import * as React from "react";
import { Component } from "react";

export class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processed: false,
      processing: false,
      error_text: ""
    };
  }
  componentDidMount() {
    const { error_link, download } = this.props;
    this.setState({
      processing: true
    });
    if (!download) {
      this.setState({
        processing: false,
        processed: true,
        error_link
      });
      return;
    }
    const headers = new Headers();
    headers.append("Accept", "text/plain");
    fetch(error_link.href, { method: "GET", headers })
      .then(response => response.text())
      .then(error_text =>
        this.setState({
          processing: false,
          processed: true,
          error_text
        })
      );
  }
  render() {
    const { error_text } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <i
          className="fa fa-warning"
          style={{ marginRight: "10px", fontSize: "10px" }}
        />
        <p style={{ marginTop: "-4px" }}>{error_text}</p>
      </div>
    );
  }
}

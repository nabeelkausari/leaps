import React, { Component } from "react";

class CustomerTextItem extends Component {
  render() {
    const {
      item: { title, text },
      mobile_display
    } = this.props;

    return (
      <div
        className={`shl-home__customer-review--reviews-wrapper${
          mobile_display ? "--mobile" : ""
        }`}
      >
        <h5 className="shl-home__customer-review--title">{title}</h5>
        <p className="shl-home__customer-review--text">{text}</p>
      </div>
    );
  }
}

export default CustomerTextItem;

import React, { Component } from "react";
import cx from "classnames";

class CustomerImagesItem extends Component {
  getDisplayList = (items, active_index) => {
    let display_arr = [];
    let length = items.length - 1;

    let first_elem_index = active_index - 1;
    let second_elem_index = active_index - 2;
    let fourth_elem_index = active_index + 1;
    let fifth_elem_index = active_index + 2;

    let first_element = null;
    let second_element = null;
    let fourth_element = null;
    let fifth_element = null;

    if (first_elem_index < 0) {
      first_element = { ...items[length - 1] };
    } else {
      first_element = { ...items[first_elem_index] };
    }

    if (second_elem_index < 0) {
      second_element = { ...items[length + second_elem_index] };
    } else {
      second_element = { ...items[second_elem_index] };
    }

    if (fourth_elem_index > length) {
      fourth_element = { ...items[0] };
    } else {
      fourth_element = { ...items[fourth_elem_index] };
    }

    if (fifth_elem_index > length) {
      fifth_element = { ...items[fifth_elem_index - items.length] };
    } else {
      fifth_element = { ...items[fifth_elem_index] };
    }

    first_element["size"] = "1";
    fifth_element["size"] = "1";

    second_element["size"] = "2";
    fourth_element["size"] = "2";

    let active_item = { ...items[active_index] };
    active_item["size"] = "active";

    display_arr.push(first_element);
    display_arr.push(second_element);
    display_arr.push(active_item);
    display_arr.push(fourth_element);
    display_arr.push(fifth_element);

    return display_arr;
  };

  render() {
    const { items, active_index, mobile_display } = this.props;
    let display_items = this.getDisplayList(items, active_index);
    return (
      <div className="shl-home__customer-review--images-wrapper">
        {display_items.map((item,i) => {
          let image_classname = `shl-home__customer-review--image ${
            mobile_display
              ? "shl-home__customer-review--image--mobile--" + item.size
              : "shl-home__customer-review--image--" + item.size
          }`;

          return (
            <img key={i} src={item.image} alt="customer" className={image_classname} />
          );
        })}
      </div>
    );
  }
}

export default CustomerImagesItem;

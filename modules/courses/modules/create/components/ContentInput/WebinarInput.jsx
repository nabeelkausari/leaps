import * as React from "react";
import { Component, Fragment } from "react";
import DatePicker from "react-datepicker";
// import TimePicker from "react-time-picker";
import moment from "moment";

import "./styles.scss";
import Input from "../../../../../../components/Forms/Input";
import get from "lodash/get";
import { notify } from "../../../../../../../common/utils/notification";
import Loader from "../../../../../../components/Loader";
import { Button } from "../../../../../../components/Buttons/Button";

class WebinarInput extends Component {
  state = {
    startTime: new Date(),
    date: new Date(),
    duration: 1,
    name: "",
    description: "",
    recordedLink: "",
    link: ""
  };

  componentDidMount() {
    const { content_data, is_new_content } = this.props;
    if (content_data !== undefined && !is_new_content) {
      const startTime = content_data.startTime.replace("IST", "");
      this.setState({
        startTime: new Date(content_data.date + " " + startTime),
        date: new Date(content_data.date),
        duration: content_data.duration.replace(" minutes", ""),
        name: content_data.name,
        description: "",
        recordedLink: "",
        link: content_data.liveLink
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { content_data, is_new_content } = this.props;
    if (
      content_data &&
      !is_new_content &&
      content_data._links.self.href !== prevProps.content_data._links.self.href
    ) {
      const startTime = content_data.startTime.replace("IST", "");
      this.setState({
        startTime: new Date(content_data.date + " " + startTime),
        date: new Date(content_data.date),
        duration: content_data.duration.replace(" minutes", ""),
        name: content_data.name,
        description: "",
        recordedLink: "",
        link: content_data.liveLink
      });
    } else if (is_new_content && is_new_content !== prevProps.is_new_content) {
      this.setState({
        startTime: new Date(),
        date: new Date(),
        duration: 1,
        name: "",
        description: "",
        recordedLink: "",
        link: ""
      });
    }
  }

  onChange = startTime => this.setState({ startTime });

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  handleCreate = () => {
    const { selected_module, content_data, is_new_content } = this.props;
    const { name, startTime, duration } = this.state;
    if (name === "")
      return notify.error("Error", "Webinar name cannot be empty");
    if (!(Number(duration) >= 1)) return notify.error("Invalid Duration");
    const date = moment(this.state.date).format("YYYY-MM-DD");
    const param = {
      ...this.state,
      startTime: moment(startTime)
        .format("hh:mm a")
        .concat(" IST")
        .toUpperCase(),
      date,
      duration: parseInt(this.state.duration)
    };
    const editOrUpdateLink = is_new_content
      ? selected_module._links.addWebinar
      : content_data._links.editWebinar;
    this.props.createOrUpdateWebinar(
      editOrUpdateLink,
      param,
      selected_module._links.self.href,
      selected_module._links.sequenced_module_content
    );
  };

  render() {
    const { duration, name, description, recordedLink, link } = this.state;
    const { is_new_content, content_data, loading } = this.props;

    return (
      <Fragment>
        <div className="content-input__main">
          <Loader loading={loading} is_component />
          <div className="content-input__element-wrapper--4">
            <div className="content-input__element-wrapper--3">
              <p className="content-input__label">Webinar Date</p>
              <DatePicker
                onChange={this.handleDateChange}
                minDate={new Date()}
                selected={this.state.date}
                required
                className="content-input__date-picker"
              />
            </div>

            <div className="content-input__element-wrapper--3">
              <p className="content-input__label">Webinar Time</p>
              <DatePicker
                selected={this.state.startTime}
                onChange={this.onChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="content-input__date-picker"
              />
              {/*<TimePicker*/}
              {/*  onChange={this.onChange}*/}
              {/*  value={this.state.startTime}*/}
              {/*  format="hh:mm a"*/}
              {/*  disableClock*/}
              {/*/>*/}
            </div>

            <div className="content-input__element-wrapper--3">
              <Input
                name="duration"
                type="number"
                value={duration}
                label="Duration (In minutes)"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="content-input__element-wrapper">
            <Input
              name="name"
              type="text"
              value={name}
              label="Enter Webinar Name"
              onChange={this.handleChange}
            />
          </div>

          <div className="content-input__element-wrapper">
            <Input
              name="description"
              type="textarea"
              value={description}
              label="Enter Webinar Description"
              onChange={this.handleChange}
            />
          </div>

          <div className="content-input__element-wrapper">
            <Input
              name="link"
              type="text"
              value={link}
              label="Enter Webinar Link"
              onChange={this.handleChange}
            />
          </div>

          {/*<div className="content-input__element-wrapper">*/}
          {/*  <Input*/}
          {/*    name="recordedLink"*/}
          {/*    type="text"*/}
          {/*    value={recordedLink}*/}
          {/*    label="Enter Recorded webinar location"*/}
          {/*    onChange={this.handleChange}*/}
          {/*  />*/}
          {/*</div>*/}

          <Button
            disabled={loading}
            onClick={this.handleCreate}
            variant="primary"
            size="md"
          >
            {is_new_content ? "Create" : "Save"}
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default WebinarInput;

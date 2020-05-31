import React, { Component } from "react";
import Input from "../../../../../components/Forms/Input";
import AddModuleContainer from "../containers/addModule";

class AddModule extends Component {
  state = {};

  handleInputChange = (name, value) => {
    this.props.saveModuleInputs(name, value);
  };
  render() {
    const { name, description, duration } = this.props.module;
    return (
      <div className="add-module">
        <Input
          name="name"
          type="text"
          value={name}
          label="Module Name"
          placeholder="Name"
          onChange={this.handleInputChange}
        />
        <Input
          name="description"
          type="text"
          value={description}
          label="Module Description"
          placeholder="Description"
          onChange={this.handleInputChange}
        />
        <Input
          name="duration"
          type="number"
          value={duration}
          label="Module duration (In Days)"
          placeholder="Duration (In Days)"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default AddModuleContainer(AddModule);

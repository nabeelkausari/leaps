import React, { Component } from "react";
import CloneCaseContainer from "../../containers/Clone/CloneCase";
import Input from "../../../../components/Forms/Input";

class CloneCase extends Component {
  state = {
    clone_case_name: ""
  };

  componentDidMount() {
    this.props.setCloneCaseName("");
  }

  handleInputChange = (name, value) => {
    this.props.setCloneCaseName(value);
  };

  render() {
    const { clone_case_name } = this.props;
    return (
      <div style={{ padding: " 1rem 2rem" }}>
        <Input
          input_type="text"
          name="clone_case_name"
          value={clone_case_name}
          label="New Case Name"
          placeholder="Enter a name for your cloned case"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default CloneCaseContainer(CloneCase);

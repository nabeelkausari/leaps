import React, { Component } from "react";
import Input from "../../../../../components/Forms/Input";
import { default as CaseDetailContainer } from "../../../containers/Detail/detail";
import { Button } from "../../../../../components/Buttons/Button";

class CaseDetailEdit extends Component {
  componentDidMount() {
    const {
      current_case: {
        info: { overview }
      }
    } = this.props;
    this.setState({ overview: overview });
  }

  state = {
    overview: ""
  };

  onChange = (name, value) => {
    this.setState({ overview: value });
  };

  onSave = () => {
    const {
      current_case: {
        info: { _links }
      },
      editCaseOverview,
      onClose
    } = this.props;
    editCaseOverview(_links.edit_case_overview, this.state.overview, true);
    onClose();
  };

  render() {
    const { overview } = this.state;
    return (
      <div className="case-detail__edit-dialog-content">
        <Input
          label="Overview"
          name="overview"
          type="textarea"
          onChange={this.onChange}
          value={overview}
          placeholder="Overview"
        />
        <div className="case-detail__edit-dialog-actions-wrapper">
          <Button
            variant="outline-primary"
            size="lg"
            onClick={this.props.onClose}
          >
            Cancel
          </Button>
          <Button variant="primary" size="lg" onClick={this.onSave}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default CaseDetailContainer(CaseDetailEdit);

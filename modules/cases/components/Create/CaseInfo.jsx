import React, { Component } from "react";
import ReactSelect from "react-select";

import { Button } from "../../../../components/Buttons/Button";
import CaseContainer from "../../containers/Create/createCase";
import Loader from "react-loader";
import { notify } from "../../../../../common/utils/notification";
import Input from "../../../../components/Forms/Input";

class CaseInfo extends Component {
  state = {
    name: "",
    description: "",
    category: "",
    overview: ""
  };

  componentDidMount() {
    this.props.getCaseCategories();
    if (this.props.case_create.problem._links === undefined)
      return this.props.history.push("/create");
  }

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleDescriptionChange = content => {
    this.setState({ description: content });
  };

  onCategorySelect = option => {
    this.setState({ category: option.value });
  };

  validateForm = () => {
    const { name, description, category, overview } = this.state;
    return (
      name !== "" && description !== "" && category !== "" && overview !== ""
    );
  };

  saveCase = () => {
    if (this.validateForm()) {
      this.props.createCaseAtoms(this.state);
    } else {
      notify.error("All fields are mandatory");
    }
  };

  clearRecommendations = () => {
    this.props.history.push("/cases");
    this.props.selectRecommendation([]);
  };

  render() {
    const { name, description, overview } = this.state;
    const { is_create_case_loading } = this.props;
    const options = this.props.case_categories.map(category => ({
      label: category,
      value: category
    }));
    return (
      <div className="case-info">
        <div className="case-info__header">
          <h4 className="case-info__title">Add Case Information</h4>
        </div>
        <div className="case-info__content">
          <div className="case-info__container">
            <Input
              label="Case name"
              type="text"
              name="name"
              value={name}
              placeholder="Case Name"
              onChange={this.handleInputChange}
              tabIndex="0"
            />
          </div>

          <div className="case-info__container">
            <Input
              label="Case Overview"
              type="textarea"
              name="overview"
              value={overview}
              placeholder="Case Overview"
              onChange={this.handleInputChange}
              tabIndex="0"
            />
          </div>

          <div className="case-info__container">
            <Input
              label="Case Description"
              type="editor"
              value={description}
              onChange={this.handleDescriptionChange}
              tabIndex="0"
            />
          </div>

          <div className="case-info__container">
            <p className="case-info__text">Category</p>
            <ReactSelect
              onChange={this.onCategorySelect}
              options={options}
              classNamePrefix="ath-select"
              className="ath-select-container"
              menuPlacement="top"
              tabIndex="0"
            />
          </div>
        </div>
        <div className="footer">
          <Button
            className="create-case-btn create-case-btn--secondary-left"
            buttonType="primary"
            onClick={this.clearRecommendations}
          >
            Cancel
          </Button>

          <div className="case-info__save-btn-wrapper">
            {is_create_case_loading && (
              <div className="case-info__loader-wrapper">
                <Loader />
              </div>
            )}
            <Button
              className="create-case-btn create-case-btn--primary create-case-btn--save"
              buttonType="primary"
              onClick={this.saveCase}
              disabled={is_create_case_loading}
            >
              Save Case
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CaseContainer(CaseInfo);

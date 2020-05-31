import React, { Component } from "react";
import { Button } from "../../../../components/Buttons/Button";
import { FormInput } from "../../../../components/Forms/FormInput";
import { SelectableCaseCard } from "../../../../../tenants/atoms/modules/cases/components/List/shared/caseCard";
import Loader from "../../../../components/Loader";
import CaseContainer from "../../containers/Create/createCase";

class Recommendations extends Component {
  state = {
    selected_recommendations: []
  };
  continueToCaseInfo = () => {
    this.props.history.push("/create/case_info");
  };

  skipToCaseInfo = () => {
    this.props.history.push("/create/case_info");
  };

  componentDidMount() {
    if (this.props.case_create.problem._links === undefined)
      return this.props.history.push("/create");
    this.props.getRecommendations();
  }

  selectRecommendation = id => {
    this.setState({ selected_recommendations: [id] });
    this.props.selectRecommendation([id]);
  };

  clearRecommandations = () => {
    this.props.history.push("/cases");
    this.props.selectRecommendation([]);
  };

  render() {
    const { recommendations, recommendations_selections } = this.props;
    return (
      <div className="recommendations">
        <Loader
          loading={recommendations.fetch_case_recommendations_requested}
        />
        <div className="recommendations__header">
          <h4 className="recommendations__title">
            Select any of our recommended reference case
          </h4>
          <div className="recommendations__search-wrapper">
            <FormInput
              type="text"
              placeholder="Search by tag, Keyword"
              className="recommendations__search-wrapper"
            />
          </div>
        </div>

        <div className="recommendations__content">
          {recommendations.list !== undefined &&
            recommendations.list.map((item, i) => (
              <SelectableCaseCard
                selected={
                  recommendations_selections.length > 0 &&
                  recommendations_selections.some(rs => rs === item.id)
                }
                selectRecommendation={this.selectRecommendation}
                key={i}
                cases={item}
              />
            ))}
        </div>

        <div className="footer">
          <Button
            className="create-case-btn create-case-btn--secondary-left"
            buttonType="primary"
            onClick={this.clearRecommandations}
          >
            Cancel
          </Button>
          <div className="footer__btn-container">
            <Button
              className="create-case-btn create-case-btn--secondary"
              buttonType="primary"
              onClick={this.skipToCaseInfo}
            >
              Skip
            </Button>
            <Button
              className="create-case-btn create-case-btn--primary"
              buttonType="primary"
              onClick={this.continueToCaseInfo}
              disabled={this.state.selected_recommendations.length === 0}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CaseContainer(Recommendations);

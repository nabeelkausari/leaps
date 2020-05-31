import React, { Component, Fragment } from "react";
import get from "lodash/get";
import Loader from "../../../../../../components/Loader";
import Select from "../../../../../../components/Forms/Select";
import QuizQuestionCard from "./QuizQuestionCard";
import { Button } from "../../../../../../components/Buttons/Button";

class QuizAnswers extends Component {
  state = {
    selected_attempt: null
  };
  handleAttemptChange = ({ label, value }) => {
    this.props.fetchAttemptsDetails(value);
  };

  getUserSelectedOption = options => {
    const [option] = options.filter(
      option => !option.is_answer && option.is_user_option
    );
    return option && option.id;
  };

  onOptionSelect = () => {};

  render() {
    const {
      loading,
      attempts,
      attempt_details_by_uri,
      selected_attempt_reference,
      hideQuizAnswers,
      from_quiz_bar,
      closeQuizResults
    } = this.props;
    const options =
      attempts &&
      attempts.map((item, index) => ({
        label: `Attempt ${index + 1}`,
        value: item
      }));
    const attempt_details =
      Object.keys(attempt_details_by_uri).length > 0 &&
      attempt_details_by_uri[selected_attempt_reference];

    let [selected_option] = options.filter(
      option => option.value.href === selected_attempt_reference
    );

    return (
      <Fragment>
        <Loader loading={loading} is_component />
        <div className="quiz__header">
          <div className="quiz__header-info-wrapper">
            <div className="quiz__title">Quiz Results</div>
            <div className="quiz__attempts-select-wrapper">
              <Select
                value={selected_option}
                options={options}
                onChange={this.handleAttemptChange}
              />
            </div>
          </div>
        </div>
        <div className="quiz__content">
          {!attempt_details_by_uri[selected_attempt_reference] ? (
            <div>
              Please select the attempt of which you want to view the answers
            </div>
          ) : (
            attempt_details &&
            attempt_details.questions.map((question, index) => (
              <QuizQuestionCard
                question={question}
                index={index}
                onOptionSelect={() => {}}
                selected_option={this.getUserSelectedOption(question.options)}
              />
            ))
          )}
        </div>
        {selected_attempt_reference && (
          <div className="quiz__footer">
            <Button
              size="md"
              variant="secondary"
              onClick={from_quiz_bar ? closeQuizResults : hideQuizAnswers}
              className="quiz__done-btn"
            >
              Done
            </Button>
            <div className="quiz__scores">
              <div className="quiz__scores--text">Total score</div>
              <div className="quiz__scores--numbers">
                {attempt_details && (
                  <Fragment>
                    <span className="quiz__scores--highlight">
                      {attempt_details.user_score}
                    </span>
                    <span>{` / ${attempt_details.total_score}`}</span>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default QuizAnswers;

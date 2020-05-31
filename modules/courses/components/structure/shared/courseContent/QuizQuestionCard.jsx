import React, { Component } from "react";
import RadioGroup from "../../../../../../components/Forms/Radio/radio";
import cx from "classnames";

class QuizQuestionCard extends Component {
  getRadioOptions = options => {
    let radio_options = [];
    options.forEach(option => {
      if (this.props.quiz_active) {
        radio_options.push({
          label: option.text,
          value: option.id
        });
      } else {
        radio_options.push({
          label: option.text,
          value: option.id,
          wrong: option.is_user_option && !option.is_answer,
          correct: !option.is_user_option && option.is_answer,
          user_selected_correct: option.is_user_option && option.is_answer
        });
      }
    });

    return radio_options;
  };

  onOptionSelect = selected_id => {
    // this.setState({selected_id});
    let option = this.getOption(selected_id);
    this.props.onOptionSelect(option);
  };

  getOption = selected_id => {
    const { question } = this.props;
    let answered_question = {
      question_id: question.id
    };
    question.options.forEach(option => {
      if (option.id === selected_id) {
        answered_question.option = option;
      }
    });
    return answered_question;
  };

  render() {
    const { question, index, selected_option, className } = this.props;
    // const {selected_id} = this.state
    const radio_options = this.getRadioOptions(question.options);
    return (
      <div
        className={cx("question", `${className ? className : ""}`)}
        key={index}
      >
        <div className="question__title-wrapper">
          <div className="question__title">
            Q{index + 1}.&nbsp;{question.text}
          </div>
          <div className="question__marks">({question.score} marks)</div>
        </div>
        <div className="question__options-wrapper">
          <RadioGroup
            radio_list={radio_options}
            onSelect={this.onOptionSelect}
            selected_id={selected_option}
          />
        </div>
      </div>
    );
  }
}

export default QuizQuestionCard;

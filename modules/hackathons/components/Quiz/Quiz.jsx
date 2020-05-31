import React, { Component, Fragment } from "react";
import QuizQuestionCard from "../../../courses/components/structure/shared/courseContent/QuizQuestionCard";
import QuizContainer from "../../containers/quiz";
import { FullScreenIcon } from "../../../../../common/images";

import "../../styles/quizDetail.scss";
import { Button } from "../../../../components/Buttons/Button";
import Loader from "../../../../components/Loader";

class Quiz extends Component {
  onOptionSelect = ({ option, question_id }) => {
    this.props.selectQuizOptionInternal(question_id, option.id);
    this.props.selectQuizOption(option._links.answer);
  };

  render() {
    const {
      selected_options,
      minimizeActiveQuiz,
      questions,
      quiz_loading
    } = this.props;

    if (quiz_loading) return <Loader />;

    return (
      <Fragment>
        <div className="quiz-header">
          <h1 className="quiz-header__title">Questions</h1>
          <Button
            variant="primary"
            size="md"
            className="quiz-header__minimize-btn"
            onClick={minimizeActiveQuiz}
          >
            <FullScreenIcon className="quiz-header__minimize-icon" />
            Minimize
          </Button>
        </div>
        <div className="hackathon-quiz__questions-wrapper">
          {questions.map((question, index) => (
            <QuizQuestionCard
              question={question}
              index={index}
              onOptionSelect={this.onOptionSelect}
              selected_option={selected_options[question.id]}
              className={"quiz-question"}
              quiz_active
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default QuizContainer(Quiz);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { Button } from "../../../../components/Buttons/Button";

class Details extends Component {
  state = {
    info_list: [],
    instructions: []
  };

  componentDidMount() {
    const {
      current_hackathon,
      current_quiz,
      fetchSingleHackathon,
      fetchQuizInstruction,
      match: {
        params: { hackathon_id }
      }
    } = this.props;
    if (!current_hackathon) {
      fetchSingleHackathon(hackathon_id);
    }
    if (current_quiz) {
      fetchQuizInstruction(current_quiz._links.quiz_instructions);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      fetch_hackathon_list_succeeded,
      fetchQuizInstruction,
      current_quiz,
      instructions_loaded
    } = this.props;
    if (
      fetch_hackathon_list_succeeded &&
      fetch_hackathon_list_succeeded !==
        prevProps.fetch_hackathon_list_succeeded
    ) {
      fetchQuizInstruction(current_quiz._links.quiz_instructions);
    }

    if (
      instructions_loaded &&
      instructions_loaded !== prevProps.instructions_loaded
    ) {
      this.setInstructions();
    }
  }

  setInstructions = () => {
    const { details } = this.props;

    let list = [
      { label: "Hours Timer", value: "24" },
      { label: "Number of Questions", value: details.totalQuestions },
      { label: "Total Marks", value: details.totalMarks }
    ];

    this.setState({
      info_list: list,
      instructions: details.general
    });
  };

  startQuiz = () => {
    const {
      history,
      match: {
        params: { hackathon_id }
      },
      setActiveQuizFullScreen
    } = this.props;
    setActiveQuizFullScreen();
    history.push(`/hackathons/${hackathon_id}?active_quiz=true`);
  };

  render() {
    const { instructions_loaded } = this.props;

    const { info_list, instructions } = this.state;

    if (!info_list.length && !instructions_loaded)
      return <Loader loading={true} />;

    return (
      <div className="hackathon-quiz">
        <div className="details-header">
          <div className="details-header--bg" />
          <QuizInfo list={info_list} />
          <div className="hackathon-quiz__action-wrapper">
            <Button
              variant="primary"
              size="xl"
              className="hackathon-quiz__info-btn"
              onClick={this.startQuiz}
            >
              Start Quiz
            </Button>
          </div>
        </div>
        <div className="quiz-instructions">
          <h3 className="quiz-instructions__label">Instructions</h3>
          <div>
            {instructions.map((instruction, i) => (
              <div className="quiz-instructions__item">
                {`${i + 1}.`} &nbsp; {`${instruction}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);

const QuizInfo = props => {
  return (
    <div className="quiz-info">
      {props.list.map(item => (
        <div className="quiz-info__item">
          <h2 className="quiz-info__value">{item.value}</h2>
          <p className="quiz-info__label">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

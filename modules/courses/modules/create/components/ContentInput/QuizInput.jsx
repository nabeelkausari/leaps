import React, { Component, Fragment } from "react";
import { uniq } from "ramda";
import Loader from "../../../../../../components/Loader";
import Input from "../../../../../../components/Forms/Input";
import { Button } from "../../../../../../components/Buttons/Button";

class QuizInput extends Component {
  state = {
    configs: [],
    duration: 60,
    name: "",
    maxAttempts: 1,
    questions: [
      {
        answer: { optionTexts: "" },
        complexity: "",
        questionText: "",
        options: []
      }
    ],
    option: ""
  };

  getComplexityCount = () => {
    let questions = this.state.questions;
    const uniqueQuestionComplexity = uniq(
      questions.map(question => question.complexity)
    ); //Storing unique complexity from questions
    let configs = [];
    uniqueQuestionComplexity.forEach(complexity => {
      const configureComplexity = complexity;
      const count = questions.filter(
        question => question.complexity === configureComplexity
      ).length;
      configs.push({
        complexity: configureComplexity,
        countOfQuestions: count
      }); //Pushing elements to an array
    });
    this.setState({
      configs
    });

    return configs;
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleQuizQuestionChange = (name, value, index) => {
    const { questions } = this.state;
    this.setState({
      questions: [
        ...questions.slice(0, index),
        {
          ...questions.slice()[index],
          [name]: value
        },
        ...questions.slice(index + 1)
      ]
    });
  };

  handleQuizQuestionAnswerChange = (name, value, index) => {
    const { questions } = this.state;
    this.setState({
      questions: [
        ...questions.slice(0, index),
        {
          ...questions.slice()[index],
          answer: { optionText: value }
        },
        ...questions.slice(index + 1)
      ]
    });
  };

  addOptionToCurrentQuestion = index => {
    const { questions, option } = this.state;
    this.setState({
      questions: [
        ...questions.slice(0, index),
        {
          ...questions.slice()[index],
          options: [...questions.slice()[index].options, { optionText: option }]
        },
        ...questions.slice(index + 1)
      ],
      option: ""
    });
  };
  removeOptionToCurrentQuestion = (index, optionIndex) => {
    const { questions } = this.state;
    this.setState({
      questions: [
        ...questions.slice(0, index),
        {
          ...questions.slice()[index],
          options: [
            ...questions[index].options.slice(0, optionIndex),
            ...questions[index].options.slice(optionIndex + 1)
          ]
        },
        ...questions.slice(index + 1)
      ]
    });
  };

  handleSave = () => {
    const { selected_module, showError } = this.props;
    const { option, ...payload } = this.state;
    if (this.state.name === "") return showError("Quiz name cannot be empty");
    payload["configs"] = this.getComplexityCount();
    this.props.createQuiz(
      selected_module._links.createQuiz,
      payload,
      selected_module._links.self.href,
      selected_module._links.sequenced_module_content
    );
  };

  handleAddQuestion = () => {
    const new_question = {
      answer: { optionTexts: "" },
      complexity: "",
      configs: [],
      questionText: "",
      options: []
    };
    this.setState({
      questions: [...this.state.questions, new_question]
    });
  };

  handleClear = () => {
    this.setState({
      configs: [],
      option: "",
      questions: [
        {
          answer: { optionTexts: "" },
          complexity: "",
          questionText: "",
          options: []
        }
      ]
    });
  };

  deleteQuestion = index => {
    const { questions } = this.state;
    if (questions.length > 1) {
      this.setState({
        questions: [...questions.slice(0, index), ...questions.slice(index + 1)]
      });
    } else {
      alert("Quiz must contain atleast one question");
    }
  };

  handleDeleteQuiz = () => {
    const { selected_module, content_data, deleteQuizAtoms } = this.props;

    const link = content_data.data.data._links.deleteQuiz;

    deleteQuizAtoms(
      link,
      selected_module._links.self.href,
      selected_module._links.sequenced_module_content
    );
  };

  render() {
    const { name, duration, maxAttempts, questions, option } = this.state;
    const { is_new_content, loading } = this.props;

    return (
      <Fragment>
        {!is_new_content && (
          <div className="content-input__empty">
            {/*<button className="content-input__btn content-input__btn--filled-1" onClick={this.handleDeleteQuiz}>Delete</button>*/}
            <h4 className="content-input__empty--title">
              You cannot edit the quiz
            </h4>
          </div>
        )}

        {is_new_content && (
          <div className="content-input__main">
            <Loader loading={loading} is_component />
            <div className="content-input__element-wrapper--2">
              <span className="content-input__sub-element-wrapper">
                <Input
                  name="name"
                  type="text"
                  value={name}
                  label="Quiz Name"
                  placeholder="Quiz Name"
                  onChange={this.handleChange}
                />
              </span>

              <span className="content-input__sub-element-wrapper">
                <Input
                  name="duration"
                  type="text"
                  value={duration}
                  label="Quiz Time (In Seconds)"
                  placeholder="Quiz Time"
                  onChange={this.handleChange}
                />
              </span>

              <span className="content-input__sub-element-wrapper">
                <Input
                  name="maxAttempts"
                  type="text"
                  value={maxAttempts}
                  label="Quiz Attempts"
                  placeholder="Quiz Time"
                  onChange={this.handleChange}
                />
              </span>
            </div>

            <div className="content-input__action-wrapper">
              <Button
                className=""
                onClick={this.handleClear}
                variant="outline-primary"
                size="xs"
              >
                Clear
              </Button>

              <Button
                className="content-input__btn--2 "
                onClick={this.handleAddQuestion}
                variant="outline-primary"
                size="xs"
              >
                Add Question
              </Button>

              <Button
                style={{ marginLeft: "2rem" }}
                onClick={this.handleSave}
                variant="primary"
                size="xs"
              >
                Save
              </Button>
            </div>

            <div className="questions-wrapper">
              {questions.map((question, index) => (
                <div className="question-wrapper">
                  <div className="question-wrapper__title">
                    <p>Question {index + 1}</p>
                    <i
                      className="fa fa-trash-o"
                      onClick={() => this.deleteQuestion(index)}
                    />
                  </div>

                  <div className="question-wrapper__main">
                    <div className="question-wrapper__left">
                      <div className="question-wrapper__element-wrapper">
                        <Input
                          name="questionText"
                          type="textarea"
                          value={question.questionText}
                          label="Question Text"
                          onChange={(name, value) =>
                            this.handleQuizQuestionChange(name, value, index)
                          }
                          rows={3}
                        />
                      </div>

                      <div className="question-wrapper__element-wrapper">
                        <Input
                          name="answer"
                          type="text"
                          value={question.answer.optionTexts}
                          label="Answer"
                          onChange={(name, value) =>
                            this.handleQuizQuestionAnswerChange(
                              name,
                              value,
                              index
                            )
                          }
                        />
                      </div>

                      <div className="question-wrapper__element-wrapper">
                        <p className="question-wrapper__label">Complexity</p>

                        <select
                          name="complexity"
                          value={question.complexity}
                          onChange={e =>
                            this.handleQuizQuestionChange(
                              e.target.name,
                              e.target.value,
                              index
                            )
                          }
                          className="question-wrapper__drop-down"
                        >
                          <option value="" key="">
                            Select Complexity
                          </option>
                          <option value="COMPLEXITY_LOW" key="COMPLEXITY_LOW">
                            COMPLEXITY_LOW
                          </option>
                          <option
                            value="COMPLEXITY_MEDIUM"
                            key="COMPLEXITY_MEDIUM"
                          >
                            COMPLEXITY_MEDIUM
                          </option>
                          <option value="COMPLEXITY_HIGH" key="COMPLEXITY_HIGH">
                            COMPLEXITY_HIGH
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="question-wrapper__right">
                      <p className="question-wrapper__label">Options</p>
                      <div className="question-wrapper__main-options-container">
                        <div className="question-wrapper__option-input">
                          <input
                            type="text"
                            name="option"
                            value={option}
                            onChange={e =>
                              this.handleChange(e.target.name, e.target.value)
                            }
                            className="content-input__text-box"
                          />
                          <button
                            className="question-wrapper__add-btn"
                            onClick={() =>
                              this.addOptionToCurrentQuestion(index)
                            }
                            disabled={option === ""}
                          >
                            +
                          </button>
                        </div>

                        <div className="question-wrapper__options-container">
                          {question.options.length > 0 &&
                            question.options.map((option, optionIndex) => (
                              <div className="question-wrapper__option-card">
                                <p className="question-wrapper__option-text">
                                  {option.optionText}
                                </p>
                                <button
                                  className="question-wrapper__option-delete"
                                  onClick={() =>
                                    this.removeOptionToCurrentQuestion(
                                      index,
                                      optionIndex
                                    )
                                  }
                                  disabled={loading}
                                >
                                  &times;
                                </button>
                              </div>
                            ))}

                          {question.options.length === 0 && (
                            <p>No Options are added yet, Please add</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default QuizInput;

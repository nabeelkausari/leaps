import React, { Component } from "react";
import get from "lodash/get";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ResultFlyout from "./ResultFlyout";
import UserCode from "./code/components/UserCode";
import Notes from "../notes/components/Notes";
import {
  ResultsIcon,
  NotesIcon,
  CodeIcon,
  CommentIcon
} from "../../../../../common/images/index";
import Comments from "./comments/components/Comments";

export class FlyoutContent extends Component {
  state = {
    key: 0
  };

  setKey = k => {
    this.setState({
      key: k
    });
  };

  handleSelect = key => {
    this.setKey(key);
    this.props.handleOutputFlyoutTabSelect(
      key,
      this.props.secondary ? "secondary" : "primary"
    );
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      getStepNote,
      results_primary,
      secondary,
      primary_flyout_tab_index,
      secondary_flyout_tab_index
    } = this.props;
    if (
      results_primary &&
      this.props.results_primary !== prevProps.results_primary
    ) {
      if (secondary) {
        this.setKey(secondary_flyout_tab_index);
      } else {
        getStepNote(results_primary, secondary ? "secondary" : "primary");
        this.setKey(primary_flyout_tab_index);
      }
    }
  }

  componentDidMount() {
    const {
      results_primary,
      getStepNote,
      secondary,
      primary_flyout_tab_index,
      secondary_flyout_tab_index
    } = this.props;

    if (secondary) {
      this.setKey(secondary_flyout_tab_index);
    } else {
      this.setKey(primary_flyout_tab_index);
      getStepNote(results_primary, secondary ? "secondary" : "primary");
    }

    if (results_primary === undefined) return;
  }

  render() {
    const { key } = this.state;
    const {
      is_primary_step_set,
      results_primary,
      results_secondary,
      secondary,
      code_primary,
      code_secondary,
      fetchUserCode,
      fetchUserLearnR,
      fetchUserLearnPython,
      notes_primary,
      notes_secondary,
      getStepNote,
      fetch_notes_succeeded_primary,
      fetch_notes_succeeded_secondary,
      theme,
      functions,
      getFunctionDesc,
      function_desc_loading,
      toggleOutputAccordion,
      read_only,
      is_case,
      print_ref,
      currentSolve,
      current_case
    } = this.props;
    const show_comments = !!get(currentSolve, "_links.add_comment");
    const sample_case = !!get(current_case, "info.sample_case");
    const show_notes = !!get(currentSolve, "_links.add_note") && !sample_case;

    return (
      <div className="tabs-container">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={key => this.handleSelect(key)}
        >
          <Tab
            eventKey={0}
            title={
              <span>
                {" "}
                <ResultsIcon className="icon icon--result" />{" "}
                <span> Results</span>
              </span>
            }
          >
            {is_primary_step_set && results_primary && (
              <ResultFlyout
                secondary={secondary}
                results={secondary ? results_secondary : results_primary}
                theme={theme}
                functions={functions}
                getFunctionDesc={getFunctionDesc}
                function_desc_loading={function_desc_loading}
                toggleOutputAccordion={toggleOutputAccordion}
                print_ref={print_ref}
              />
            )}
          </Tab>
          <Tab
            eventKey={1}
            title={
              <span>
                {" "}
                <CodeIcon className="icon icon--code" /> <span> Code</span>
              </span>
            }
          >
            {is_primary_step_set && (
              <UserCode
                results={secondary ? results_secondary : results_primary}
                secondary={secondary}
                code_primary={code_primary}
                code_secondary={code_secondary}
                fetchUserCode={fetchUserCode}
                fetchUserLearnR={fetchUserLearnR}
                fetchUserLearnPython={fetchUserLearnPython}
              />
            )}
          </Tab>
          {show_notes && (
            <Tab
              eventKey={2}
              title={
                <span>
                  {" "}
                  <NotesIcon className="icon icon--note" /> <span> Notes</span>
                </span>
              }
            >
              {is_primary_step_set && (
                <Notes
                  results={secondary ? results_secondary : results_primary}
                  secondary={secondary}
                  notes={secondary ? notes_secondary : notes_primary}
                  getStepNote={getStepNote}
                  fetch_notes_succeeded={
                    secondary
                      ? fetch_notes_succeeded_secondary
                      : fetch_notes_succeeded_primary
                  }
                  read_only={read_only}
                />
              )}
            </Tab>
          )}
          {is_case && show_comments && !sample_case && (
            <Tab
              eventKey={3}
              title={
                <span>
                  {" "}
                  <CommentIcon className="icon" /> <span> Comments </span>
                </span>
              }
            >
              <Comments
                results={secondary ? results_secondary : results_primary}
                {...this.props}
              />
            </Tab>
          )}
        </Tabs>
      </div>
    );
  }
}

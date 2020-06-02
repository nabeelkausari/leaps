import { connect } from "react-redux";
import { getUserNotes } from "../../../notes/redux/actions";
import { pinStep } from "../../../dashboard/redux/actions";
import {
  fetchUserCode,
  fetchUserLearnPython,
  fetchUserLearnR,
  getResultsError,
  getStepNote,
  handleOutputFlyoutTabSelect,
  hideFlyout,
  setFlyoutFullScreen,
  toggleOutputAccordion,
  getFunctionDesc,
  postComment,
  getComments,
  postReply,
  deleteDiscussion,
  deleteReply
} from "../../../../solve/containers/steps/steps.actions";

function mapStateToProps(state, ownProps) {
  const {
    cases: { fetch_function_desc_requested, current_case },
    solve: {
      dashboard: { pinned_outputs, pin_output_loading, dashboard_items },
      functions,
      steps: {
        flyout: { primary, secondary },
        new_comment_post_succeeded,
        new_reply_post_succeeded,
        comment_delete_requested,
        comment_delete_succeeded,
        comment_delete_failed,
        reply_delete_requested,
        reply_delete_succeeded,
        reply_delete_failed
      },
      details
    },
    collaborators: { list }
  } = state;

  return {
    is_primary_flyout_open: primary.is_open,
    is_secondary_flyout_open: secondary.is_open,
    is_primary_step_set: primary.is_step_set,
    is_secondary_step_set: secondary.is_step_set,

    is_primary_flyout_full_screen: primary.is_full_screen,

    results_primary: primary.step,
    results_secondary: secondary.step,

    code_primary: primary.code,
    code_secondary: secondary.code,

    notes_primary: primary.notes,
    notes_secondary: secondary.notes,

    fetch_notes_succeeded_primary: primary.notes.fetch_notes_succeeded,
    fetch_notes_succeeded_secondary: secondary.notes.fetch_notes_succeeded,

    primary_flyout_tab_index: primary.current_view,
    secondary_flyout_tab_index: secondary.current_view,
    theme: state.profile.theme,
    pinned_outputs,
    pin_output_loading,
    functions: functions,
    fetch_function_desc_requested,
    collaborators_list: list,
    new_comment_post_succeeded,
    new_reply_post_succeeded,
    dashboard_items,
    comment_delete_requested,
    comment_delete_succeeded,
    comment_delete_failed,
    reply_delete_requested,
    reply_delete_succeeded,
    reply_delete_failed,
    current_case,
    currentSolve: details
  };
}

export default connect(mapStateToProps, {
  getResultsError,
  hideFlyout,
  getUserNotes,
  fetchUserCode,
  fetchUserLearnR,
  fetchUserLearnPython,
  pinStep,
  getStepNote,
  handleOutputFlyoutTabSelect,
  setFlyoutFullScreen,
  getFunctionDesc,
  toggleOutputAccordion,
  postComment,
  getComments,
  postReply,
  deleteDiscussion,
  deleteReply
});

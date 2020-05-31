import get from "lodash/get";

import { history } from "../../../../index";
import { fetchLink, fetchLinkAs } from "../../../../common/api/helpers";
import * as types from "./types";
import {
  CASE_LINK,
  getUserId,
  setSessionStorage,
  setSolveLink,
  setSolveType,
  SOLVE_LINK,
  SOLVE_TYPE
} from "../../../../common/utils/storage";
import { dialogs } from "../../../modules/toPublish/Dialog";

import { notify } from "../../../../common/utils/notification";
import Papa from "papaparse";
import { getMaterialLink } from "../../../../common/api/material";
import { CONFIGURED } from "../../../../common/utils/userPermissionConstants";
import { CASE } from "../../../../common/utils/constants";
import { rollback } from "../../solve/solve/containers/steps/steps.actions";

const getCaseDetailLink = id => {
  const user_id = getUserId();
  return {
    method: "GET",
    href: `/user/${user_id}/case/${id}`,
    accept: "application/json"
  };
};

const getUnAuthCaseDetailLink = id => {
  return {
    method: "GET",
    href: `/case/${id}`,
    accept: "application/json"
  };
};

export const getCaseDetail = (case_detail_link, scenario_id, new_scenario) => (
  dispatch,
  getState
) => {
  dispatch({ type: types.FETCH_CASE_DETAILS_REQUESTED });
  fetchLinkAs(case_detail_link)
    .then(case_detail_response => {
      dispatch({
        type: types.FETCH_CASE_DETAILS_SUCCEEDED,
        payload: case_detail_response
      });

      let scenario;
      if (scenario_id) {
        scenario = case_detail_response.scenarios.find(
          s => s.id.toString() === scenario_id
        );
      } else if (new_scenario) {
        scenario = [
          ...case_detail_response.scenarios.filter(s => !s.reference_scenario)
        ].pop();
      } else {
        scenario = get(case_detail_response, "scenarios[0]");
      }

      setSessionStorage(
        SOLVE_LINK,
        get(scenario, "_links.get_scenario_details")
      );
      setSessionStorage(CASE_LINK, case_detail_link);
      setSessionStorage(SOLVE_TYPE, CASE);

      if (!scenario_id) {
        history.push(
          `/cases/${case_detail_response.id}/${scenario.id}/dataset`
        );
      }
    })
    .catch(error => {
      dispatch({ type: types.FETCH_CASE_DETAILS_FAILED, payload: error });
      notify.error("Error", error.message);
    });
};

// OLD_TO_BE_REPLACED

/**
 * Fetch cases details.
 * @param {object} case_detail_link, Case self link.
 * @param {number} first_item, selection of scenario based on this key (first or last) .
 */

export const getCaseDetails = (case_detail_link, first_item = true) => (
  dispatch,
  getState
) => {
  dispatch({ type: types.FETCH_CASE_DETAILS_REQUESTED });
  fetchLinkAs(case_detail_link)
    .then(case_detail_response => {
      dispatch({
        type: types.FETCH_CASE_DETAILS_SUCCEEDED,
        payload: case_detail_response
      });
      dispatch({ type: types.FETCH_SCENARIO_DETAILS_REQUESTED });
      const get_scenario_details_link =
        case_detail_response.scenarios[0]._links.get_scenario_details;
      const index = first_item ? 0 : case_detail_response.scenarios.length - 1;
      setSolveLink(get_scenario_details_link);
      setSolveType(CASE);
      dispatch(
        getScenarioDetails(
          get_scenario_details_link,
          case_detail_response.scenarios[index].id
        )
      );
    })
    .catch(error => {
      dispatch({ type: types.FETCH_CASE_DETAILS_FAILED, payload: error });
      notify.error("Error", error.message);
    });
};

export const getCaseById = case_id => (dispatch, getState) => {
  const {
    auth: { is_logged_in }
  } = getState();
  dispatch({ type: types.FETCH_CASE_DETAILS_REQUESTED });
  let link = is_logged_in
    ? getCaseDetailLink(case_id)
    : getUnAuthCaseDetailLink(case_id);

  fetchLinkAs(link)
    .then(payload => {
      dispatch({
        type: types.FETCH_CASE_DETAILS_SUCCEEDED,
        payload: payload
      });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_CASE_DETAILS_FAILED, payload: error });
      notify.error("Error", error.message);
    });
};

export const getScenarioDetails = (scenario_link, id) => (
  dispatch,
  getState
) => {
  const {
    cases: {
      current_case: { info }
    }
  } = getState();
  if (!scenario_link) return;
  dispatch({ type: types.FETCH_SCENARIO_DETAILS_REQUESTED });
  fetchLinkAs(scenario_link)
    .then(payload => {
      dispatch({ type: types.FETCH_SCENARIO_DETAILS_SUCCEEDED, payload });
      const view = info.permission === CONFIGURED ? "dashboard" : "dataset";
      history.push(`/cases/${info.id}/${id}/${view}`);
    })
    .catch(payload => {
      dispatch({ type: types.FETCH_SCENARIO_DETAILS_FAILED, payload });
      notify.error("Error while fetching scenario", payload.message);
    });
};

export const getScenarioDetailsInternal = scenario_id => (
  dispatch,
  getState
) => {
  const {
    cases: {
      current_case: { info }
    }
  } = getState();
  const scenario = info.scenarios.find(s => s.id === scenario_id);
  const scenario_link = get(scenario, "_links.get_scenario_details");
  if (!scenario_link) return;
  dispatch({ type: types.FETCH_SCENARIO_DETAILS_REQUESTED });
  fetchLinkAs(scenario_link)
    .then(payload => {
      dispatch({ type: types.FETCH_SCENARIO_DETAILS_SUCCEEDED, payload });
    })
    .catch(payload => {
      dispatch({ type: types.FETCH_SCENARIO_DETAILS_FAILED, payload });
      notify.error("Error while fetching scenario", payload.message);
    });
};

export const getScenarioDetailsAndUpdateDataset = scenario_id => (
  dispatch,
  getState
) => {
  const {
    cases: {
      current_case: { info }
    }
  } = getState();
  const scenario = info.scenarios.find(s => s.id === scenario_id);
  const scenario_link = get(scenario, "_links.get_scenario_details");
  if (!scenario_link) return;
  fetchLinkAs(scenario_link)
    .then(payload => {
      dispatch({ type: types.UPDATE_SCENARIO_DATASETS, payload });
    })
    .catch(payload => {
      notify.error("Error while fetching scenario", payload.message);
    });
};

export const getCaseAndScenario = (case_id, scenario_id) => (
  dispatch,
  getState
) => {
  dispatch({ type: types.FETCH_CASE_DETAILS_REQUESTED });
  fetchLinkAs(getCaseDetailLink(case_id))
    .then(case_detail_response => {
      dispatch({
        type: types.FETCH_CASE_DETAILS_SUCCEEDED,
        payload: case_detail_response
      });
      let scenario_detail;
      if (scenario_id === "reference") {
        scenario_detail = case_detail_response.scenarios
          .filter(item => item.reference_scenario === true)
          .shift();
      } else {
        scenario_detail = case_detail_response.scenarios
          .filter(item => String(scenario_id) === String(item.id))
          .shift();
      }
      if (!scenario_detail) {
        history.push("/cases");
      }
      return fetchLinkAs(scenario_detail._links.get_scenario_details);
    })
    .then(scenario_details_response => {
      dispatch({
        type: types.FETCH_SCENARIO_DETAILS_SUCCEEDED,
        payload: scenario_details_response
      });
      // dispatch(getScenarioDetails());
      //     dispatch(getSteps())
      //     dispatch(getDatasets())
    });
};

export const getCaseCollaborators = () => (dispatch, getState) => {
  const {
    cases: {
      current_case: { info }
    }
  } = getState();
  const link = get(info, "_links.get_existing_collaborators");
  if (!link) return;
  dispatch({ type: types.FETCH_CASE_COLLABORATORS_REQUESTED });
  fetchLinkAs(link)
    .then(payload => {
      dispatch({ type: types.FETCH_CASE_COLLABORATORS_SUCCEEDED, payload });
    })
    .catch(payload => {
      dispatch({ type: types.FETCH_CASE_COLLABORATORS_FAILED, payload });
    });
};

export const getCases = () => (dispatch, getState) => {
  const {
    profile: {
      info: { _links }
    }
  } = getState();
  const get_cases_link = {
    ..._links.get_user_cases,
    type: "application/json"
  };
  dispatch({ type: types.FETCH_CASES_REQUESTED });
  return fetchLinkAs(get_cases_link)
    .then(payload => dispatch({ type: types.FETCH_CASES_SUCCEEDED, payload }))
    .catch(error => dispatch({ type: types.FETCH_CASES_FAILED, error }));
};

export const getSampleCases = () => (dispatch, getState) => {
  const sample_cases_link = {
    href: "/case/all",
    type: "application/json"
  };
  dispatch({ type: types.FETCH_SAMPLE_CASES_REQUESTED });
  fetchLinkAs(sample_cases_link)
    .then(payload => {
      dispatch({ type: types.FETCH_SAMPLE_CASES_SUCCEEDED, payload });
    })
    .catch(error => {
      dispatch({ type: types.FETCH_SAMPLE_CASES_FAILED, error });
    });
};

export const getAllCases = () => (dispatch, getState) => {
  const {
    profile: {
      info: { _links }
    }
  } = getState();
  const get_all_cases_link = {
    ..._links.get_shared_cases,
    type: "application/json"
  };
  dispatch({ type: types.FETCH_ALL_CASES_REQUESTED });
  return fetchLinkAs(get_all_cases_link)
    .then(payload =>
      dispatch({ type: types.FETCH_ALL_CASES_SUCCEEDED, payload })
    )
    .catch(error => dispatch({ type: types.FETCH_ALL_CASES_FAILED, error }));
};

export const deleteCase = link => (dispatch, getState) => {
  dispatch({ type: types.DELETE_CASE_REQUESTED });
  fetchLink(link)
    .then(res => {
      dispatch({ type: types.DELETE_CASE_SUCCEEDED });
      dispatch(getCases());
      notify.success("Success", "Case deleted successfully");
    })
    .catch(error => dispatch({ type: types.DELETE_CASE_FAILED }));
};

export const getCaseMaterial = link => (dispatch, getState) => {
  dispatch({ type: types.FETCH_CASE_MATERIAL_REQUESTED });
  fetchLinkAs(link)
    .then(payload =>
      dispatch({ type: types.FETCH_CASE_MATERIAL_SUCCEEDED, payload })
    )
    .catch(error => dispatch({ type: types.FETCH_CASE_MATERIAL_FAILED }));
};

export const editCaseOverview = (link, overview, from_case_details) => (
  dispatch,
  getState
) => {
  const param = {
    overview
  };
  fetchLinkAs(link, param)
    .then(response => {
      dispatch({
        type: types.EDIT_CASE_OVERVIEW_SUCCEEDED,
        payload: { ...response, link }
      });
      if (from_case_details) {
        dispatch({ type: types.UPDATE_CASE_OVERVIEW, payload: response });
      }
      notify.success("Success", "Case overview saved successfully");
    })
    .catch(error => console.log(error));
};

export const editCaseDescription = (link, content) => (dispatch, getState) => {
  dispatch({ type: types.EDIT_CASE_REQUESTED });
  const param = {
    text: content
  };
  const edit_link = {
    ...link,
    accept: "application/vnd.Analyttica.TreasureHunt.Material+json"
  };
  fetchLinkAs(edit_link, param)
    .then(payload => {
      dispatch({ type: types.EDIT_CASE_SUCCEEDED, payload });
      notify.success("Success", "Case description saved successfully");
    })
    .catch(error => dispatch({ type: types.EDIT_CASE_FAILED }));
};

export const getCaseCategories = () => (dispatch, getState) => {
  const end_point = {
    href: "/case/categories",
    method: "GET"
  };
  dispatch({ type: types.FETCH_CASE_CATEGORIES_REQUESTED });
  return fetchLinkAs(end_point)
    .then(payload =>
      dispatch({ type: types.FETCH_CASE_CATEGORIES_SUCCEEDED, payload })
    )
    .catch(error =>
      dispatch({ type: types.FETCH_CASE_CATEGORIES_FAILED, error })
    );
};

export const cloneCase = clone_case_ref => (dispatch, getState) => {
  const {
    cases: { clone_case_name }
  } = getState();
  if (clone_case_name === "") return notify.error("Case name cannot be empty");
  const param = { name: clone_case_name };
  dispatch({ type: types.CLONE_CASE_REQUESTED });
  return fetchLinkAs(clone_case_ref, param)
    .then(payload => {
      dispatch({ type: types.CLONE_CASE_SUCCEEDED, payload });
      notify.success("Success", "Successfully cloned the case");
      dispatch(
        dialogs.show({
          title: "Successfully Cloned",
          subtitle: "Do you want to open the cloned case?",
          yesButton: {
            text: "Yes",
            onClick: () => {
              dispatch(getCaseDetail(payload._links.get_case_details));
              return true;
            }
          },
          noButton: {
            text: "No"
          },
          items_centered: true
        })
      );
    })
    .catch(error => {
      dispatch({ type: types.CLONE_CASE_FAILED, error });
      notify.error("Something went wrong while cloning a case", error.message);
    });
};

export const createBusinessProblem = params => (dispatch, getState) => {
  const {
    profile: {
      info: {
        _links: { create_problem }
      }
    }
  } = getState();

  dispatch({ type: types.CREATE_PROBLEM_REQUESTED });
  return fetchLinkAs(create_problem, params)
    .then(payload => {
      dispatch({ type: types.CREATE_PROBLEM_SUCCEEDED, payload });
      history.push("/create/our_recommendations");
    })
    .catch(error => dispatch({ type: types.CREATE_PROBLEM_FAILED, error }));
};

// export const setCurrentFlyoutTab = (key) => (dispatch) => {
//     dispatch({type : types.SET_CURRENT_FLYOUT_TAB, payload : key})
// }

export const getRecommendations = () => (dispatch, getState) => {
  const {
    cases: {
      create: {
        problem: {
          _links: { get_case_recommendations }
        }
      }
    }
  } = getState();

  dispatch({ type: types.GET_CASE_RECOMMENDATIONS_REQUESTED });
  return fetchLinkAs(get_case_recommendations)
    .then(payload =>
      dispatch({ type: types.GET_CASE_RECOMMENDATIONS_SUCCEEDED, payload })
    )
    .catch(error =>
      dispatch({ type: types.GET_CASE_RECOMMENDATIONS_FAILED, error })
    );
};

export const createCaseAtoms = ({
  name,
  description,
  category,
  overview,
  problem_statement,
  issue,
  outcome
}) => (dispatch, getState) => {
  const {
    profile: {
      info: {
        _links: { create_problem }
      }
    }
  } = getState();

  let prob_params = {
    description: problem_statement,
    issue,
    outcome
  };

  let case_params = {
    name,
    description,
    category,
    overview
  };

  fetchLinkAs(create_problem, prob_params)
    .then(problem_res => {
      dispatch({ type: types.CREATE_CASE_REQUESTED });
      return fetchLinkAs(
        get(problem_res, "_links.create_case"),
        case_params
      ).then(payload => {
        dispatch({ type: types.CREATE_CASE_SUCCEEDED, payload });
        notify.success("Done", "Case created successfully");
        dispatch(getCaseDetail(payload._links.get_case_details));
      });
    })
    .catch(error => {
      dispatch({ type: types.CREATE_CASE_FAILED, error });
      notify.error("Error", error.message);
    });
};

export const createCase = payload => (dispatch, getState) => {
  const {
    cases: {
      create: {
        problem: {
          _links: { create_case }
        }
      },
      recommendations: { selections }
    }
  } = getState();
  let params = {
    ...payload,
    referenceCaseIds: selections
  };
  dispatch({ type: types.CREATE_CASE_REQUESTED });
  return fetchLinkAs(create_case, params)
    .then(payload => {
      dispatch({ type: types.CREATE_CASE_SUCCEEDED, payload });
      notify.success("Done", "Case created successfully");
      dispatch(getCaseDetail(payload._links.get_case_details));
    })
    .catch(error => {
      dispatch({ type: types.CREATE_CASE_FAILED, error });
      notify.error("Error", error.message);
    });
};

export const selectRecommendation = ids => (dispatch, getState) => {
  dispatch({ type: types.SELECT_RECOMMENDATIONS, payload: ids });
};

const getTableInfos = rows => {
  if (rows[0][0].trim().indexOf("Name:") !== 0) return [{ rows }];
  const table_rows = rows.reduce((tables, row) => {
    if (row[0].trim().indexOf("Name:") === 0) {
      tables.push({ name: row[0].trim(), rows: [] });
      return tables;
    } else {
      const last_table = tables[tables.length - 1];
      last_table.rows.push(row);
      return tables;
    }
  }, []);
  return table_rows;
};

const getHeaders = headers =>
  headers[0] === "" ? [...headers] : ["", ...headers];

export const fetchStepDetailsCsv = csv => dispatch => {
  dispatch({ type: types.FETCH_STEP_DATASET_CSV_REQUESTED });

  Papa.parse(csv || "", {
    delimiter: ";",
    download: true,
    complete: results => {
      const table_infos = getTableInfos(results.data);
      const tables = table_infos.map(table_info => {
        const raw_rows = table_info.rows;
        const headers = getHeaders(raw_rows.shift()).map(header => header);
        const rows = raw_rows
          // .map((row, i) => getRow(row, i))
          .filter(row => row.length === headers.length)
          .filter(
            row => !row.every(datum => datum === undefined || datum === "")
          );
        if (rows.length !== raw_rows.length)
          console.log(
            "Some rows don't have the required number of columns, or didn\t have data, and have been ignored."
          );
        return {
          name: table_info.name,
          headers,
          rows
        };
      });

      let payload = { data: tables, csv };
      dispatch({ type: types.FETCH_STEP_DATASET_CSV_SUCCEEDED, payload });
    }
  });
};

export const extractAndDeploy = params => (dispatch, getState) => {
  const {
    solve: { details }
  } = getState();
  const link = details._links.solution_deploy;
  if (!link) return;
  dispatch({ type: types.EXTRACT_AND_DEPLOY_REQUESTED });
  fetchLinkAs(link, params)
    .then(response => {
      notify.success("Solution Deployment In-Progress");
      dispatch({ type: types.EXTRACT_AND_DEPLOY_SUCCEEDED });
    })
    .catch(error => {
      dispatch({ type: types.EXTRACT_AND_DEPLOY_FAILED, payload: error });
      notify.error("Something went wrong", error.message);
    });
};

export const resetExtractAndDeploy = () => (dispatch, getState) => {
  dispatch({ type: types.RESET_EXTRACT_AND_DEPLOY });
};

export const addDuplicatedScenario = payload => (dispatch, getState) => {
  dispatch({ type: types.ADD_DUPLICATED_SCENARIO, payload });
};
export const setCloneCaseName = name => dispatch => {
  dispatch({ type: types.SET_CLONE_CASE_NAME, payload: name });
};
export const resetCase = () => dispatch => {
  dispatch({ type: types.RESET_CASE });
};

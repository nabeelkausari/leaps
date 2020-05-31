import * as types from "./types";
import findIndex from "lodash/findIndex";

const initialState = {
  case_details_loading: null,
  fetch_case_details_succeeded: null,

  fetch_scenario_details_loading: null,
  fetch_scenario_details_succeeded: null,
  fetch_scenario_details_error: null,

  add_duplicate_scenario_succeeded: null,

  current_case: {
    reference: "",
    info: {},
    current_scenario: {},
    case_collaborators: {
      list: [],
      case_collaborators_loading: null,
      case_collaborators_succeeded: null,
      case_collaborators_error: null
    }
  },
  output_csv_results: {},

  list: {
    items: [],
    by_uri: {},
    fetch_cases_requested: null,
    fetch_cases_succeeded: null,
    fetch_cases_error: null
  },
  all_cases: {
    items: [],
    by_uri: {},
    fetch_all_cases_requested: null,
    fetch_all_cases_succeeded: null,
    fetch_all_cases_error: null
  },
  sample_cases: {
    items: [],
    by_uri: {},
    fetch_sample_cases_requested: null,
    fetch_sample_cases_succeeded: null,
    fetch_sample_cases_error: null
  },
  categories: {
    list: [],
    fetch_case_categories_requested: null,
    fetch_case_categories_succeeded: null,
    fetch_case_categories_error: null
  },
  create: {
    problem: {},
    create_problem_requested: null,
    create_problem_succeeded: null,
    create_problem_error: null
  },
  edit: {
    edit_case_loading: null,
    edit_case_successful: null,
    edit_case_error: null
  },
  recommendations: {
    list: [],
    by_uri: {},
    selections: [],
    fetch_case_recommendations_requested: null,
    fetch_case_recommendations_succeeded: null,
    fetch_case_recommendations_error: null
  },

  pinned_outputs: {},
  is_create_case_loading: null,
  is_create_case_successful: null,
  is_create_case_error: null,
  extract_and_deploy_requested: null,
  extract_and_deploy_succeeded: null,
  extract_and_deploy_failed: null,

  clone_case_name: "",
  cloning_case: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_CASE_DETAILS_REQUESTED:
      return {
        ...state,
        case_details_loading: true,
        fetch_case_details_succeeded: null
      };
    case types.FETCH_CASE_DETAILS_SUCCEEDED:
      return {
        ...state,
        case_details_loading: false,
        fetch_case_details_succeeded: true,
        current_case: {
          ...state.current_case,
          info: payload
        }
      };
    case types.FETCH_CASE_DETAILS_FAILED:
      return {
        ...state,
        case_details_loading: false,
        fetch_case_details_succeeded: false
      };

    case types.FETCH_SCENARIO_DETAILS_REQUESTED:
      return {
        ...state,
        fetch_scenario_details_loading: true,
        fetch_scenario_details_succeeded: null,
        fetch_scenario_details_error: null
      };
    case types.FETCH_SCENARIO_DETAILS_SUCCEEDED:
      return {
        ...state,
        fetch_scenario_details_loading: false,
        fetch_scenario_details_succeeded: true,
        fetch_scenario_details_error: false,
        current_case: {
          ...state.current_case,
          current_scenario: payload
        }
      };

    case types.FETCH_SCENARIO_DETAILS_FAILED:
      return {
        ...state,
        fetch_scenario_details_loading: false,
        fetch_scenario_details_succeeded: false,
        fetch_scenario_details_error: payload
      };

    case types.FETCH_CASE_REQUESTED:
      return {
        ...state,
        case_loading: true,
        fetch_case_error: null,
        fetch_case_succeeded: null
      };
    case types.FETCH_CASE_SUCCEEDED:
      return {
        ...state,
        case_loading: false,
        fetch_case_succeeded: true,
        info: payload
      };

    case types.FETCH_CASE_FAILED:
      return {
        ...state,
        case_loading: false,
        fetch_case_succeeded: false,
        fetch_case_error: payload
      };
    case types.FETCH_CASE_COLLABORATORS_REQUESTED:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          case_collaborators: {
            ...state.current_case.case_collaborators,
            case_collaborators_loading: true,
            case_collaborators_succeeded: null,
            case_collaborators_error: null
          }
        }
      };
    case types.FETCH_CASE_COLLABORATORS_SUCCEEDED:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          case_collaborators: {
            ...state.current_case.case_collaborators,
            list: [...payload],
            case_collaborators_loading: false,
            case_collaborators_succeeded: true,
            case_collaborators_error: false
          }
        }
      };

    case types.FETCH_CASE_COLLABORATORS_FAILED:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          case_collaborators: {
            ...state.current_case.case_collaborators,
            case_collaborators_loading: false,
            case_collaborators_succeeded: false,
            case_collaborators_error: payload
          }
        }
      };

    case types.EDIT_CASE_OVERVIEW_SUCCEEDED:
      const case_index = findIndex(state.list.items, function(item) {
        if (item._links.edit_case_overview)
          return payload.link.href === item._links.edit_case_overview.href;
      });
      return {
        ...state,
        list: {
          ...state.list,
          items: [
            ...state.list.items.slice(0, case_index),
            {
              ...state.list.items[case_index],
              overview: payload.overview
            },
            ...state.list.items.slice(case_index + 1)
          ]
        }
      };

    case types.UPDATE_CASE_OVERVIEW:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          info: {
            ...state.current_case.info,
            overview: payload.overview
          }
        }
      };

    case types.FETCH_CASE_MATERIAL_REQUESTED:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          material: payload,
          material_loading: true
        }
      };
    case types.FETCH_CASE_MATERIAL_SUCCEEDED:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          material: payload,
          material_loading: false
        }
      };
    case types.FETCH_CASE_MATERIAL_FAILED:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          material: payload,
          material_loading: false
        }
      };

    case types.EDIT_CASE_REQUESTED:
      return {
        ...state,
        edit: {
          ...state.edit,
          edit_case_loading: true,
          edit_case_successful: false,
          edit_case_error: false
        }
      };
    case types.EDIT_CASE_SUCCEEDED:
      const index = findIndex(state.list.items, function(item) {
        if (item._links.edit_case_material.href)
          return (
            payload._links.self.href === item._links.edit_case_material.href
          );
      });
      return {
        ...state,
        list: {
          ...state.list,
          items: [
            ...state.list.items.slice(0, index),
            {
              ...state.list.items[index],
              description: payload.text
            },
            ...state.list.items.slice(index + 1)
          ]
        },
        edit: {
          ...state.edit,
          edit_case_loading: false,
          edit_case_successful: true,
          edit_case_error: false
        }
      };
    case types.EDIT_CASE_FAILED:
      return {
        ...state,
        edit: {
          ...state.edit,
          edit_case_loading: false,
          edit_case_successful: false,
          edit_case_error: true
        }
      };

    case types.FETCH_CASES_REQUESTED:
      return {
        ...state,
        list: {
          ...state.list,
          fetch_cases_requested: true
        }
      };
    case types.FETCH_CASES_SUCCEEDED:
      return {
        ...state,
        list: {
          ...state.list,
          items: payload,
          // by_uri: byUri(payload),
          fetch_cases_requested: false,
          fetch_cases_succeeded: true
        }
      };

    case types.FETCH_CASES_FAILED:
      return {
        ...state,
        list: {
          ...state.list,
          fetch_cases_requested: false,
          fetch_cases_error: payload
        }
      };

    case types.FETCH_ALL_CASES_REQUESTED:
      return {
        ...state,
        all_cases: {
          ...state.all_cases,
          fetch_all_cases_requested: true
        }
      };
    case types.FETCH_ALL_CASES_SUCCEEDED:
      return {
        ...state,
        all_cases: {
          ...state.all_cases,
          items: payload,
          // by_uri: byUri(payload),
          fetch_all_cases_requested: false,
          fetch_all_cases_succeeded: true
        }
      };

    case types.FETCH_ALL_CASES_FAILED:
      return {
        ...state,
        all_cases: {
          ...state.all_cases,
          fetch_all_cases_requested: false,
          fetch_all_cases_error: payload
        }
      };

    case types.FETCH_SAMPLE_CASES_REQUESTED:
      return {
        ...state,
        sample_cases: {
          ...state.sample_cases,
          fetch_sample_cases_requested: true
        }
      };
    case types.FETCH_SAMPLE_CASES_SUCCEEDED:
      return {
        ...state,
        sample_cases: {
          ...state.sample_cases,
          items: payload,
          // by_uri: byUri(payload),
          fetch_sample_cases_requested: false,
          fetch_sample_cases_succeeded: true
        }
      };

    case types.FETCH_SAMPLE_CASES_FAILED:
      return {
        ...state,
        sample_cases: {
          ...state.sample_cases,
          fetch_sample_cases_requested: false,
          fetch_sample_cases_succeeded: false,
          fetch_sample_cases_error: payload
        }
      };

    // cases types.PIN_OUTPUT_STEP:
    //   return { ...state, ...payload };

    case types.CREATE_CASE_REQUESTED: {
      return {
        ...state,
        is_create_case_loading: true,
        is_create_case_successful: null,
        is_create_case_error: null
      };
    }

    case types.CREATE_CASE_SUCCEEDED: {
      return {
        ...state,
        is_create_case_loading: false,
        is_create_case_successful: true,
        is_create_case_error: false
      };
    }

    case types.CREATE_CASE_FAILED: {
      return {
        ...state,
        is_create_case_loading: false,
        is_create_case_successful: false,
        is_create_case_error: true
      };
    }

    case types.FETCH_CASE_CATEGORIES_REQUESTED: {
      return {
        ...state,
        categories: {
          ...state.categories,
          fetch_case_categories_requested: true
        }
      };
    }

    case types.FETCH_CASE_CATEGORIES_SUCCEEDED: {
      return {
        ...state,
        categories: {
          ...state.categories,
          fetch_case_categories_requested: false,
          fetch_case_categories_succeeded: true,
          list: payload
        }
      };
    }

    case types.FETCH_CASE_CATEGORIES_FAILED: {
      return {
        ...state,
        categories: {
          ...state.categories,
          fetch_case_categories_requested: false,
          fetch_case_categories_error: payload
        }
      };
    }

    case types.CREATE_PROBLEM_REQUESTED: {
      return {
        ...state,
        create: {
          ...state.create,
          create_problem_requested: true
        }
      };
    }

    case types.CREATE_PROBLEM_SUCCEEDED: {
      return {
        ...state,
        create: {
          ...state.create,
          problem: payload,
          create_problem_requested: false,
          create_problem_succeeded: true
        }
      };
    }

    case types.CREATE_PROBLEM_FAILED: {
      return {
        ...state,
        create: {
          ...state.create,
          create_problem_requested: false,
          create_problem_succeeded: false,
          create_problem_error: payload
        }
      };
    }

    case types.GET_CASE_RECOMMENDATIONS_REQUESTED: {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          fetch_case_recommendations_requested: true
        }
      };
    }

    case types.GET_CASE_RECOMMENDATIONS_SUCCEEDED: {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          list: payload,
          fetch_case_recommendations_requested: false,
          fetch_case_recommendations_succeeded: true
        }
      };
    }

    case types.GET_CASE_RECOMMENDATIONS_FAILED: {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          fetch_case_recommendations_requested: false,
          fetch_case_recommendations_succeeded: false,
          fetch_case_recommendations_error: payload
        }
      };
    }

    case types.SELECT_RECOMMENDATIONS: {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          selections: payload
        }
      };
    }

    case types.FETCH_STEP_DATASET_CSV_REQUESTED: {
      return {
        ...state
      };
    }

    case types.FETCH_STEP_DATASET_CSV_SUCCEEDED: {
      return {
        ...state,
        output_csv_results: {
          ...state.output_csv_results,
          [payload.csv]: payload.data
        }
      };
    }

    case types.EXTRACT_AND_DEPLOY_REQUESTED:
      return {
        ...state,
        extract_and_deploy_requested: true,
        extract_and_deploy_succeeded: null,
        extract_and_deploy_failed: null
      };

    case types.EXTRACT_AND_DEPLOY_SUCCEEDED:
      return {
        ...state,
        extract_and_deploy_requested: false,
        extract_and_deploy_succeeded: true,
        extract_and_deploy_failed: false
      };

    case types.EXTRACT_AND_DEPLOY_FAILED:
      return {
        ...state,
        extract_and_deploy_requested: false,
        extract_and_deploy_succeeded: false,
        extract_and_deploy_failed: payload
      };

    case types.RESET_EXTRACT_AND_DEPLOY:
      return {
        ...state,
        extract_and_deploy_requested: null,
        extract_and_deploy_succeeded: null,
        extract_and_deploy_failed: null
      };

    case types.ADD_DUPLICATED_SCENARIO:
      return {
        ...state,
        add_duplicate_scenario_succeeded: true,
        current_case: {
          ...state.current_case,
          info: {
            ...state.current_case.info,
            scenarios: [...state.current_case.info.scenarios, payload]
          }
        }
      };

    case types.UPDATE_SCENARIO_DATASETS:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          current_scenario: {
            ...state.current_case.current_scenario,
            data_sets: [...payload.data_sets]
          }
        }
      };

    case types.CLONE_CASE_REQUESTED:
      return {
        ...state,
        cloning_case: true
      };

    case types.CLONE_CASE_SUCCEEDED:
      return {
        ...state,
        list: {
          items: [...state.list.items, payload]
        },
        cloning_case: false
      };

    case types.CLONE_CASE_FAILED:
      return {
        ...state,
        cloning_case: false
      };

    case types.SET_CLONE_CASE_NAME:
      return {
        ...state,
        clone_case_name: payload
      };

    case types.RESET_CASE:
      return {
        ...state,
        current_case: {
          ...state.current_case,
          info: {}
        }
      };

    default:
      return state;
  }
};

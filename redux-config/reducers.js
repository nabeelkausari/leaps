import { combineReducers } from "redux";

import authReducer from "../modules/auth/redux/reducer";
// import caseReducer from "../../app/modules/cases/redux/reducer";
// import quizReducer from "../../app/modules/courses/modules/quiz/redux/reducer";
import coursesReducer from "../modules/courses/redux/reducer";
// import scenarioReducer from "../../app/modules/solve/modules/header/createScenario/redux/reducer";
// import collaboratorsReducer from "../../app/modules/collaborators/redux/reducer";
//
// import profileReducer from "../../app/modules/profile/redux/reducer";
// import llaReducer from "../../precision/modules/solutions-old/reducer";
// import solutionsReducer from "../../app/modules/solutions/redux/solutions/reducer";
// import solutionCreatorReducer from "../../app/modules/solutions/redux/creator/reducer";
// import solveReducer from "../../app/modules/solve/solve/containers/solve.reducer";
// import materialReducer from "../../app/modules/material/redux/reducer";
// import notificationReducer from "../../app/modules/notification/redux/reducer";
import homeReducer from "../modules/home/redux/reducer";
// import hackathonReducer from "../../app/modules/hackathons/redux/reducer";
//
import dialogReducer from "../modules/toPublish/Dialog/redux/reducer";

const appReducer = combineReducers({
  auth: authReducer,
  // cases: caseReducer,
  courses: coursesReducer,
  // solve: solveReducer,
  // quiz: quizReducer,
  // profile: profileReducer,
  // largeLoan: llaReducer,
  // material: materialReducer,
  // collaborators: collaboratorsReducer,
  // solutions: solutionsReducer,
  // solution_creator: solutionCreatorReducer,
  // scenarios: scenarioReducer,
  dialogs: dialogReducer,
  // notification: notificationReducer,
  home: homeReducer,
  // hackathon: hackathonReducer
});

export default (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

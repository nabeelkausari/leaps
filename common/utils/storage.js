export const USER_ID = "USER_ID";
export const USER_PROFILE_LINK_KEY = "USER_PROFILE_LINK_KEY";
export const THEME_KEY = "THEME";
export const SOLVE_LINK = "SOLVE_LINK";
export const CASE_LINK = "CASE_LINK";
export const HACKATHON_LINK = "HACKATHON_LINK";
export const SOLVE_TYPE = "SOLVE_TYPE";
export const COURSE_REF = "COURSE_REF";
export const GLOBAL_NOTIFICATION = "GLOBAL_NOTIFICATION";
export const GLOBAL_NOTIFICATION_CLOSED = "GLOBAL_NOTIFICATION_CLOSED";
export const IS_CONSOLE_ACTIVE = "IS_CONSOLE_ACTIVE";
export const REGISTER_PARAMS = "REGISTER_PARAMS";

export const LS = typeof window !== "undefined" ? localStorage : {
  setItem(key, value) {
  },
  getItem(key) {
  },
  removeItem(key) {
  },
  clear() {
  }
};

export const SS = typeof window !== "undefined" ? sessionStorage : {
  setItem(key, value) {
  },
  getItem(key) {
  },
  removeItem(key) {
  },
  clear() {
  }
};

export const setUserId = user_id => {
  LS.setItem(USER_ID, user_id.toString());
};

export const setUserProfileLink = link => {
  LS.setItem(USER_PROFILE_LINK_KEY, JSON.stringify(link));
};

export const setUserGlobalNotification = notification => {
  if (notification) {
    LS.setItem(GLOBAL_NOTIFICATION, JSON.stringify(notification));
  }
};

export const setUserGlobalNotificationClosed = () => {
  LS.setItem(GLOBAL_NOTIFICATION_CLOSED, "true");
};

export const getUserGlobalNotificationClosed = () => {
  return LS.getItem(GLOBAL_NOTIFICATION_CLOSED) === "true";
};

export const getUserId = () => {
  return LS.getItem(USER_ID);
};

export const getUserProfileLink = () => {
  const userProfileLink = LS.getItem(USER_PROFILE_LINK_KEY);
  return JSON.parse(userProfileLink);
};

export const getUserGlobalNotification = () => {
  const global_notification = LS.getItem(GLOBAL_NOTIFICATION);
  return JSON.parse(global_notification);
};

export const getTheme = () => {
  let theme = LS.getItem(THEME_KEY);
  if (!theme) {
    setTheme("dark");
    theme = getTheme();
  }
  return theme;
};

export const setTheme = theme => {
  return LS.setItem(THEME_KEY, theme);
};

export const setSolveLink = link => {
  return SS.setItem(SOLVE_LINK, JSON.stringify(link));
};

export const getSolveLink = () => {
  return JSON.parse(SS.getItem(SOLVE_LINK));
};

export const removeLoacalStorage = key => {
  LS.removeItem(key);
};

export const setLocalStorage = (key, value) => {
  let updatedValue = value;
  if (typeof updatedValue === "object") {
    updatedValue = JSON.stringify(value);
  }
  return LS.setItem(key, updatedValue);
};

export const getLocalStorage = (key, should_parse) => {
  const value = LS.getItem(key);
  return should_parse ? JSON.parse(value) : value;
};

export const setSessionStorage = (key, value) => {
  let updatedValue = value;
  if (typeof updatedValue === "object") {
    updatedValue = JSON.stringify(value);
  }
  return SS.setItem(key, updatedValue);
};

export const getSessionStorage = (key, should_parse) => {
  const value = SS.getItem(key);
  return should_parse ? JSON.parse(value) : value;
};

export const removeLocalStorage = key => {
  LS.removeItem(key);
};

export const setCaseLink = link => {
  return SS.setItem(CASE_LINK, JSON.stringify(link));
};

export const getCaseLink = () => {
  return JSON.parse(SS.getItem(CASE_LINK));
};

export const setCourseRef = course_ref => {
  return SS.setItem(COURSE_REF, course_ref);
};

export const removeCourseRef = () => {
  return SS.removeItem(COURSE_REF);
};

export const getCourseRef = () => {
  return JSON.parse(SS.getItem(COURSE_REF));
};

export const setSolveType = type => {
  return SS.setItem(SOLVE_TYPE, type);
};

export const getSolveType = () => {
  return SS.getItem(SOLVE_TYPE);
};
export const removeSolveType = () => {
  return SS.removeItem(SOLVE_TYPE);
};

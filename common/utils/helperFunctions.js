import moment from "moment";
import monentTz from "moment-timezone";
import { groupBy, map } from "ramda";
import get from "lodash/get";
import { UserRole } from "../api/users";
import { lowerCase } from "lodash";

export const chunkArray = (array, chunk_size) => {
  return [].concat.apply(
    [],
    array.map((elem, i) => {
      return i % chunk_size ? [] : [array.slice(i, i + chunk_size)];
    })
  );
};

export const getInitials = name => {
  if (!name) return;
  let name_array = name.trim().split(" ");
  if (name_array.length > 1) {
    return name_array[0][0] + name_array[name_array.length - 1][0];
  } else {
    return name_array[0][0];
  }
};

export const removeUnderscores = text => {
  if (!text) return;
  return text.replace("_", " ");
};

export const formatDate = (date, format) => {
  let timestamp = moment(date);
  return timestamp.format(format);
};

export const getMaskedFeature = () => {
  if (!process.env.REACT_APP_MASKED_FEATURES) return "";
  return process.env.REACT_APP_MASKED_FEATURES.split("/");
};

export const isCreator = profile => {
  return !!get(profile, "_links.create_course");
};
export const isCourseReviewer = profile => {
  return profile.roles.indexOf("COURSE_REVIEWER") > 0;
};

export const getFilteredCourses = (list, is_creator = false) => {
  if (is_creator) {
    return list
      .filter(course => get(course, "_links.editCourse") !== undefined)
      .filter(
        course =>
          !!get(course, "category") &&
          get(course, "category")
            .toUpperCase()
            .indexOf("COURSE") >= 0
      );
  }
  return (
    list
      .filter(
        course =>
          !!course.marketplace_category &&
          course.marketplace_category.toUpperCase() === "COURSE"
      )
      .filter(course =>
        course.isVisibilityPublic !== undefined
          ? course.isVisibilityPublic
          : true
      )
      .filter(
        course =>
          !!course._links.start ||
          !!course._links.resume ||
          !!course._links.redo
      ) || []
  );
};

export const isSimulab = () =>
  process.env.REACT_APP_TENANT === "ATOMS" ||
  process.env.REACT_APP_TENANT === "SIMULAB";

export const isFirstSource = () =>
  process.env.REACT_APP_TENANT === "FIRSTSOURCE";

export const isLeaps = () => process.env.REACT_APP_TENANT === "LEAPS";

export const searchStartsWith = (arr, query) => {
  return arr.some(item => {
    if (lowerCase(item).indexOf(lowerCase(query)) === 0) return true;
  });
};

export const getGmtTime = () => {
  return monentTz().tz("Etc/GMT");
};
export const convertToGmt = date => {
  return monentTz.tz(date, "Etc/GMT");
};

import get from "lodash/get";
const COURSE = "COURSE";
const UPCOMING_COURSE = "UPCOMING_COURSE";

export const IsAvailableCourse = course => {
  return (
    course.category &&
    course.free_course &&
    course.category.toUpperCase() === COURSE
  );
};

export const IsComingSoonCourse = course => {
  return (
    course.category &&
    course.free_course &&
    course.category.toUpperCase() === UPCOMING_COURSE
  );
};

export const IsActiveCourse = course => {
  return (
    course.category &&
    course.free_course &&
    course.category.toUpperCase() === COURSE &&
    (get(course, "_links.start") ||
      get(course, "_links.resume") ||
      get(course, "_links.redo"))
  );
};

export const IsInActiveCourse = course => {
  return (
    course.category &&
    course.free_course &&
    course.category.toUpperCase() === COURSE &&
    !!get(course, "_links.enroll")
  );
};

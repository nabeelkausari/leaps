import { notify } from "./notification";

const validateSpecialCharacters = value => {
  return !/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~\s]/.test(value);
};

export const validateCourseCode = code => {
  if (code.length >= 40) {
    notify.error(
      "Validation error",
      "Code length should be less than 40 chars"
    );
  } else if (!validateSpecialCharacters(code)) {
    notify.error(
      "Validation error",
      "Code cannot contain special characters or space"
    );
  } else {
    return true;
  }
  return false;
};

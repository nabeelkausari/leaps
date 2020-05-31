import {
  SHOW_DIALOG,
  HIDE_DIALOG,
  CHANGE_CALLBACK,
  REMOVE_COMPONENT
} from "./types";

export const show = options => ({
  type: SHOW_DIALOG,
  payload: { ...options }
});

export const hide = () => ({
  type: HIDE_DIALOG
});

export const changeCallback = options => ({
  type: CHANGE_CALLBACK,
  payload: { ...options }
});

// export const removeComponent = () => ({ type: REMOVE_COMPONENT });

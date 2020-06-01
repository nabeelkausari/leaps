export const setGlobalFont = () => {
  let html_element = document.getElementsByTagName("html")[0];
  html_element.style.fontSize = "2.5vw";
  html_element.style.overflow = "hidden";
};

export const unsetGlobalFont = () => {
  let html_element = document.getElementsByTagName("html")[0];
  html_element.style.fontSize = null;
  html_element.style.overflow = null;
};

export const disableIncompatibleView = () => {
  document
    .getElementsByClassName("incompatible-view")[0]
    .setAttribute("class", "incompatible-view disabled");
};

export const enableIncompatibleView = () => {
  document
    .getElementsByClassName("incompatible-view")[0]
    .setAttribute("class", "incompatible-view");
};

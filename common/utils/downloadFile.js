import { notify } from "./notification";

export const downloadFile = file_path => {
  let url = decodeURIComponent(file_path);
  let link = document.createElement("a");
  link.download = url;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  notify.success("Success", "Successfully downloaded");
};

export const downloadFileFromServer = (url, fileName) => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function() {
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(this.response);
    let tag = document.createElement("a");
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
};

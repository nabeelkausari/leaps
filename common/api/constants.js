export const httpMethods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  patch: "PATCH"
};
export const DEFAULT_REQUEST_INIT = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  method: httpMethods.get
};
export const BASE_URI = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/";
export const API_GATEWAY_URI = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
export const APP_URL = process.env.REACT_APP_APP_URL;

export const Dashboard_default_sizes = {
  STEP: {
    h: 30,
    w: 30
  },
  CASE: {
    "sub-heading": {
      h: 6,
      w: 20
    },
    heading: {
      h: 7,
      w: 20
    },
    paragraph: {
      h: 7,
      w: 20
    },
    editor: {
      h: 10,
      w: 20
    }
  }
};

// export const API_GATEWAY_URI = "http://192.168.51.181:8081";

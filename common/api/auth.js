import { TOKEN } from "./media-types";
import { LS } from "../utils/storage"

let authHeader = undefined;
const key = "__auth";
export const authorizer = {
  setHeader: authorizationHeader => {
    authHeader = authorizationHeader;
    if (authHeader === undefined) LS.removeItem(key);
    else LS.setItem(key, authorizationHeader);
  },
  getHeader: () => {
    authHeader = authHeader || LS.getItem(key);
    return authHeader;
  }
};

export const getGoogleLoginLink = authorization_code => ({
  href: `/social/google?authorization_code=${authorization_code}`,
  method: "POST",
  accept: TOKEN,
  type: "application/json"
});

export const getLinkedInLoginLink = authorization_code => ({
  href: `/social/linkedin?authorization_code=${authorization_code}`,
  method: "POST",
  accept: TOKEN,
  type: "application/json"
});

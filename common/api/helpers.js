import {
  httpMethods,
  DEFAULT_REQUEST_INIT,
  API_GATEWAY_URI
} from "./constants";
import { throwError } from "./error";
import * as Promise from "bluebird";
import { authorizer } from "./auth";
// Primitive APIs
export const handle = (promise, isError, parseException) =>
  promise
    .catch(reason =>
      throwError(
        {
          error_code: "UNKNOWN_NETWORK_ERROR",
          message:
            "Oops, we are having trouble with this specific request. This could be due to network issues. Kindly try again or refresh the page to continue working. If you're seeing several of these messages, there might be something wrong with your network connectivity."
        },
        10
      )
    )
    .then(result =>
      isError(result)
        ? Promise.resolve(parseException(result)).then(exception =>
            throwError(exception)
          )
        : Promise.resolve(result)
    );
export const handleErrors = promise =>
  handle(
    promise,
    response => !response.ok,
    response => {
      switch (response.status) {
        case 503:
          return Promise.resolve({
            error_code: "NETWORK_TIMEOUT",
            message: "The request timed out. Please try again later."
          });
        case 401:
          localStorage.clear();
          window.location.href = "/auth/login";
          break;
        case 403:
          return response.url === "/tokens"
            ? Promise.resolve(
                response.json().catch(reason => ({
                  error_code: "INVALID_LOGIN",
                  message: "The api failed to return any response."
                }))
              )
            : Promise.resolve({
                error_code: "INVALID_LOGIN",
                message:
                  "Login information is corrupted. Please log out and login again as a temporary fix. We are working towards you never having to see this again."
              });
        case 423:
          return Promise.resolve(
            response.json().catch(reason => ({
              error_code: "RESOURCE_LOCKED",
              message: "The resource you are trying to access is locked"
            }))
          );
        default:
          return Promise.resolve(
            response.json().catch(reason => ({
              error_code: "NO_RESPONSE",
              message: "The api failed to return any response."
            }))
          );
      }
    }
  );
//timer:any;
export const timeout = (ms, promise, message) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timeout " + message));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
};
export const getJson = promise =>
  promise.then(response => response.json().then(json => json));
// High level APIs
const fetchHandled = (url, overrides) =>
  handleErrors(
    Promise.resolve(fetch(url, { ...DEFAULT_REQUEST_INIT, ...overrides }))
  );
export { fetchHandled as fetch };
export const fetchJson = (url, overrides) =>
  getJson(fetchHandled(url, overrides));
const makeUri = (rootUri, suffix) => rootUri + suffix + "/";
const makeCoreClient = (collectionName, rootUri) => {
  const baseUri = makeUri(rootUri, collectionName);
  const getIdUri = id => makeUri(baseUri, id);
  return {
    baseUri,
    getIdUri,
    get: query => fetchJson(baseUri + (query || ""), DEFAULT_REQUEST_INIT),
    getById: (id, query) => fetchJson(getIdUri(id) + (query || "")),
    create: entity =>
      fetchJson(baseUri, {
        method: httpMethods.post,
        body: JSON.stringify(entity)
      }),
    update: (id, entity) =>
      fetchJson(getIdUri(id), {
        method: httpMethods.put,
        body: JSON.stringify(entity)
      }),
    remove: id =>
      fetchHandled(getIdUri(id), {
        ...DEFAULT_REQUEST_INIT,
        method: httpMethods.delete
      })
  };
};
const makeEntityClient = (collectionName, rootUri) => {
  const core = makeCoreClient(collectionName, rootUri);
  return {
    ...core,
    patch: (id, partial) =>
      fetchJson(core.getIdUri(id), {
        method: httpMethods.patch,
        body: JSON.stringify(partial)
      })
  };
};
export const makeApiClient = (collectionName, rootUri) => {
  const client = makeEntityClient(collectionName, rootUri);
  return {
    ...client,
    getSubClient: (id, relationName) => {
      const subClient = makeCoreClient(relationName, client.getIdUri(id));
      return {
        ...subClient,
        removeAll: () =>
          fetchHandled(subClient.baseUri, { method: httpMethods.delete })
      };
    }
  };
};
const getRequestInit = (link, entity, headers) => {
  const method = link.method || httpMethods.get;
  headers = headers || new Headers();
  if (link.type) headers.set("Content-Type", link.type);
  if (link.accept) headers.set("Accept", link.accept);
  const authorization = authorizer.getHeader();
  if (!!authorization && !headers.has("Authorization"))
    headers.set("Authorization", authorization);
  const body = entity === undefined ? undefined : JSON.stringify(entity);
  return { method, headers, body };
};
const getRequestUri = link =>
  !!link && link.href.indexOf("/") === 0
    ? `${API_GATEWAY_URI}${link.href}`
    : !!link && link.href;
export const fetchLinkAs = (link, entity, headers) =>
  fetchJson(getRequestUri(link), getRequestInit(link, entity, headers));
export const fetchLinkDirectlyAs = (link, entity, headers) =>
  fetchJson(link.href, getRequestInit(link, entity, headers));
export const fetchLink = (link, entity, headers) =>
  fetchHandled(getRequestUri(link), getRequestInit(link, entity, headers));
export const fetchLinkDirectly = (link, entity, headers) =>
  fetchHandled(link.href, getRequestInit(link, entity, headers));

export const handleOnEnter = (e, handleUpdate) => {
  if (e.key === "Enter") {
    handleUpdate();
  }
};

export const getColumnSelectionText = (listLength, selectedListLength) => {
  const allSelected = listLength === selectedListLength;
  return selectedListLength === 0
    ? `Select all ${listLength} columns`
    : allSelected
    ? "Clear all selection"
    : `Clear ${selectedListLength} column selection`;
};

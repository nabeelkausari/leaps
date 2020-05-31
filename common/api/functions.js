import { fetchLinkAs } from "./helpers";
import {
  FUNCTION_CATEGORY_COLLECTION,
  FUNCTION_COLLECTION,
  FUNCTION_SUGGESTIONS
} from "./media-types";
const links = {
  categories: {
    href: "/function/categories",
    accept: FUNCTION_CATEGORY_COLLECTION,
    method: "GET"
  },
  functions: {
    href: "/functions",
    accept: FUNCTION_COLLECTION,
    method: "GET"
  }
};
const getSuggestionsLink = query => ({
  href: `/functions/suggestions?query=${query}`,
  accept: FUNCTION_SUGGESTIONS,
  method: "GET"
});
const getFunctions = () => fetchLinkAs(links.functions);
const getCategories = () => fetchLinkAs(links.categories);
const getParameters = (func, selections, data_sets, solve_link) =>
  fetchLinkAs(func._links.parameters, { selections, data_sets, solve_link });
const getSuggestions = query => fetchLinkAs(getSuggestionsLink(query));
export const functions = {
  categories: getCategories,
  get: getFunctions,
  getParameters: getParameters,
  getSuggestions: getSuggestions
};

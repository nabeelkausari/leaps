import { groupBy, map } from "ramda";
import get from "lodash/get";

export const byUri = items =>
  map(
    items => items.shift(),
    groupBy(item => item._links.self.href, items)
  );

export const byId = (items, id_key) =>
  map(
    items => items.shift(),
    groupBy(item => get(item, id_key), items)
  );

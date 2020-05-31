import { fetchLinkAs } from "./helpers";
import { MATERIAL } from "./media-types";
const saveContent = (material, new_material) =>
  fetchLinkAs(material._links.update, new_material);
const cache = {};
const getMaterial = hasMaterial => fetchLinkAs(hasMaterial._links.material);
export const getMaterialLink = reference => ({
  href: reference,
  accept: MATERIAL,
  method: "GET"
});
const get = hasMaterial => {
  const reference = hasMaterial._links.material.href;
  if (!!cache[reference]) return cache[reference];
  return (cache[reference] = getMaterial(hasMaterial)
    .then(material => {
      cache[reference] = undefined;
      return material;
    })
    .catch(reason => {
      cache[reference] = undefined;
      throw reason;
    }));
};
export const materials = {
  get: get,
  update: saveContent
};

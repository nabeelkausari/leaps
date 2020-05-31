export const pad = (number, width) => {
  const value = number + "";
  return value.length >= width
    ? value
    : new Array(width - value.length + 1).join("0") + value;
};

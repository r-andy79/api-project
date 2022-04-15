export const buildQuery = (obj = {}) => {
  let searchParams = new URLSearchParams(obj);
  return searchParams.toString();
}
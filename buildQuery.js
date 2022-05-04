export const buildQuery = (obj = {}) => {
  let searchParams = new URLSearchParams(obj);
  console.log(searchParams.toString());
  console.log({obj});
  return searchParams.toString();
}
export const buildQuery = (obj = {}) => {
  let searchParams = new URLSearchParams(obj);
  console.log({searchParams});
  console.log({obj});
  return searchParams.toString();
}
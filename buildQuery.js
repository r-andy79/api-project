const buildQuery = (obj = {}) => {
  let searchParams = new URLSearchParams(obj);
  return searchParams.toString();
}

module.exports = buildQuery;
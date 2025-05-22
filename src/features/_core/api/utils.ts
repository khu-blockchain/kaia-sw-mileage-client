import qs from "qs";

export const makeQuery = (queryObj: object) =>
  qs.stringify(queryObj, { addQueryPrefix: true });

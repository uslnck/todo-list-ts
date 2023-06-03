import formatDistanceToNow from "date-fns/formatDistanceToNow";

const formatDistanceOptions = {
  addSuffix: true,
  includeSeconds: true,
};

const fnsDate = (created: number | undefined = undefined) => {
  return formatDistanceToNow(created || Date.now(), formatDistanceOptions);
};

export default fnsDate;

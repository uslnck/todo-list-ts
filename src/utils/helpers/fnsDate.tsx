import formatDistanceToNow from "date-fns/formatDistanceToNow";

const formatDistanceOptions = {
  addSuffix: true,
  includeSeconds: true,
};

const fnsDate = (created: Date | undefined = undefined) => {
  return formatDistanceToNow(created || new Date(), formatDistanceOptions);
};

export default fnsDate;

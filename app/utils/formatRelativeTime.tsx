const formatRelativeTime = (date: Date) => {
  const now = new Date();

  const diffInDays = Math.floor(
    (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    return "Posted Today";
  } else if (diffInDays === 1) {
    return "Posted Yesterday";
  } else if (diffInDays < 7) {
    return `Posted ${diffInDays} Days Ago`;
  } else if (diffInDays < 31) {
    return `Posted ${Math.floor(diffInDays / 7)} Weeks Ago`;
  } else if (diffInDays < 365) {
    return `Posted ${Math.floor(diffInDays / 30)} Months Ago`;
  } else {
    return `Posted ${Math.floor(diffInDays / 365)} Years Ago`;
  }
};

export default formatRelativeTime;

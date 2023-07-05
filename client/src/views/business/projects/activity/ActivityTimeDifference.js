function activityTimeDifference(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 60) {
    return 'Just now';
  } else if (diff < 60 * 60) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}m`;
  } else if (diff < 60 * 60 * 24) {
    const hours = Math.floor(diff / (60 * 60));
    return `${hours}h`;
  } else if (diff < 60 * 60 * 24 * 30) {
    const days = Math.floor(diff / (60 * 60 * 24));
    return `${days}d`;
  } else if (diff < 60 * 60 * 24 * 365) {
    const months = Math.floor(diff / (60 * 60 * 24 * 30));
    return `${months}mo`;
  } else {
    const years = Math.floor(diff / (60 * 60 * 24 * 365));
    return `${years}y`;
  }
}

export default activityTimeDifference;

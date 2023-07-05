const getMonday = (d) => {
  const dt = new Date(d);
  const day = dt.getDay();
  const diff = dt.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(dt.setDate(diff));
  monday.setHours(0);
  monday.setMinutes(0);
  monday.setSeconds(0);
  return monday;
};

const getFirstDayThisMonth = (d) => {
  const dt = new Date(d);
  const firstDay = new Date(dt.setDate(1));
  return firstDay;
};

const getPastDay = (d, dayInterval) => {
  const dt = new Date(d);
  const diff = dt.getDate() - dayInterval;
  return new Date(dt.setDate(diff));
};

const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();
  return date1 <= date2;
};

export const belongsToIngerval = (activeSidebar, dt) => {
  const updateDt = new Date(dt);
  const today = new Date();
  let compDay;
  switch (activeSidebar) {
    case '1':
      compDay = getMonday(today);
      break;
    case '2':
      compDay = getFirstDayThisMonth(today);
      break;
    case '3':
      compDay = getPastDay(today, 30);
      break;
    case '4':
      compDay = getPastDay(today, 60);
      break;
    case '5':
      compDay = getPastDay(today, 90);
      break;
    default:
      compDay = updateDt;
      break;
  }
  return compareDates(compDay, updateDt);
};

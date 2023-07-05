var moment = require("moment");

function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate).toLocaleDateString());
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
}

module.exports = dateRange;

const moment = require("moment");

exports.calculatePassedDays = (date) => {
  let days = moment().diff(date, "days");
  return days;
};

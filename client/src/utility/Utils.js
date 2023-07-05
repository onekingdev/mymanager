//====================================================================
// **** What's in this file?
//====================================================================
// ** Checks if an object is empty (returns boolean)
// ** Returns K format from a number
// ** Converts HTML to string
// ** Checks if the passed date is today
// ** Format and return date in Humanize format
// ** Returns short month of passed date
// ** Return if user is logged in
// ** React Select Theme Colors
// ** Convert Full Name to ShortName
// ** Break Long string to muliple line
// ** Make Long string short with ... at the end (truncate)

//====================================================================
import moment from 'moment';

export const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => obj && Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num);

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, '');

// ** Checks if the passed date is today
export const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

// ** Checks if the passed date is yesterday
export const isYesterday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() - 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

export const isDateInThisWeek = (date) => {
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  // get first date of week
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  // if date is equal or within the first and last dates of the week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};

export const isDobInThisWeek = (date) => {
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();
  const todayYear = todayObj.getFullYear();
  // get first date of week
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  date.setFullYear(todayYear);
  // if date is equal or within the first and last dates of the week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};

export const isDateInThisMonth = (date) => {
  const todayObj = new Date();
  const todayMonth = todayObj.getMonth();

  // get last date of week
  const dob = new Date(date);
  const dobMonth = dob.getMonth();

  return todayMonth === dobMonth;
};

export const isDateInNextMonth = (date) => {
  const todayObj = new Date();
  const todayMonth = todayObj.getMonth();

  const dob = new Date(date);
  const dobMonth = dob.getMonth();

  return todayMonth + 1 === dobMonth;
};

export const getMonthFromString = (mon) => {
  var d = Date.parse(mon + '1, 2012');
  if (!isNaN(d)) {
    return new Date(d).getMonth();
  }
  return -1;
};

export const isDateInCurMonth = (date, curMon) => {
  // get last date of week
  const dob = new Date(date);
  const dobMonth = dob.getMonth();
  return getMonthFromString(toCapitalize(curMon)) === dobMonth;
};

export const isDateInYearMonth = (date, year, month) => {
  const cur = new Date(date);
  const curMonth = cur.getMonth();
  const curYear = cur.getFullYear();
  return curMonth == getMonthFromString(toCapitalize(month)) && curYear == year;
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: 'short', day: 'numeric', year: 'numeric' }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: 'numeric', day: 'numeric' };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' };
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

export const dayOfWeekAsString = (dayIndex) => {
  return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex] || '';
};

export const monthAsString = (monthIndex) => {
  return (
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
      monthIndex
    ] || ''
  );
};

export const formatTime = (date) => {
  let formatting = { minute: 'numeric', hour: 'numeric' };
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(date));
};

export const formatAmPmTime = (time) => {
  let hourAndMin = time.split(':');
  let hours = parseInt(hourAndMin[0]);
  let mins = parseInt(hourAndMin[1]);
  var AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  let finalTime = addZero(hours) + ':' + addZero(mins) + ' ' + AmOrPm;
  return finalTime;
};

export const diff_weeks = (dt2, dt1) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7;
  return Math.abs(Math.round(diff));
};

export const formatMinToHourShort = (value) => {
  const date = new Date(value);
  let formatting = { minute: 'numeric', hour: 'numeric' };
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

export const formatFullDate = (date) => {
  if (!date) return '';
  date = new Date(date);
  return (
    dayOfWeekAsString(date.getDay()) +
    ', ' +
    monthAsString(date.getMonth()) +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear() +
    ' ' +
    formatTime(date)
  );
};
/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData');
export const getUserData = () => JSON.parse(localStorage.getItem('userData'));

export const getOnboardingStatus = () => JSON.parse(localStorage.getItem('onboarding'));
/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === 'admin') return '/';
  if (userRole === 'client') return '/access-control';
  return '/login';
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
});

// ** Convert Full Name to ShortName
export const formatToShortName = (fullName) => {
  if (fullName?.indexOf(' ') > -1) {
    const nameOrArr = fullName.split(' ');
    const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
    const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
    const firstLetter = firstPart[0].toUpperCase();
    const lastLetter = lastPart[0] ? lastPart[0].toUpperCase() : '';
    return firstLetter + ' ' + lastLetter;
  } else {
    return fullName?.toLocaleUpperCase().charAt(0);
  }
};

// ** Break Long string to muliple line
export const textFold = (input, lineSize) => {
  const output = [];
  let outputCharCount = 0;
  let outputCharsInCurrentLine = 0;
  for (var i = 0; i < input.length; i++) {
    const inputChar = input[i];
    output[outputCharCount++] = inputChar;
    if (inputChar === '\n') {
      outputCharsInCurrentLine = 0;
    } else if (outputCharsInCurrentLine > lineSize - 2) {
      output[outputCharCount++] = '\n';
      outputCharsInCurrentLine = 0;
    } else {
      outputCharsInCurrentLine++;
    }
  }
  return output.join('');
};

// ** Make Long string short with ... at the end (truncate)
export const truncate = (str, l) => {
  let output = [];
  if (str.length > l) {
    output = str.substring(0, l - 1) + '...';
    return output;
  } else {
    return str;
  }
};

// Format File Size

export const humanFileSize = (bytes, si = true, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + ' ' + units[u];
};

export const addZero = (time) => {
  if (time < 10) {
    time = '0' + time;
  }
  return time;
};

export const getWorkingHours = (start, end) => {
  let startHourAndMin = start.split(':'),
    startHours = parseInt(startHourAndMin[0]),
    startMins = parseInt(startHourAndMin[1]),
    endHourAndMin = end.split(':'),
    endHours = parseInt(endHourAndMin[0]),
    endMins = parseInt(endHourAndMin[1]);
  let workinghours = Math.abs(endHours - startHours) + Math.abs(endMins - startMins) > 30 ? 1 : 0;
  return workinghours;
};

export const validateMembership = (membership) => {
  let error = {};
  if (membership.membership_name === '') {
    error = { ...error, membership_name: 'empty' };
  }
  if (membership.total_price === 0 || membership.total_price === '') {
    error = { ...error, total_price: 'empty' };
  }
  if (membership.down_payment === 0 || membership.down_payment === '') {
    error = { ...error, down_payment: 'empty' };
  }
  if (membership.register_fees === 0 || membership.register_fees === '') {
    error = { ...error, register_fees: 'empty' };
  }
  if (membership.payment_type != 'PIF') {
    if (membership.payment_time === 0 || membership.payment_time === '') {
      error = { ...error, payment_time: 'empty' };
    }
    if (membership.payment_type === 'Monthly') {
      const start_month = membership.start_payment_Date.getMonth();
      const end_month = membership.expiry_date.getMonth();
      if (end_month - start_month < membership.payment_time) {
        error = { ...error, payment_time: 'invalid' };
      }
    }
    if (membership.payment_type === 'Weekly') {
      const start_date = membership.start_payment_Date;
      const end_date = membership.expiry_date;
      if (diff_weeks(end_date, start_date) < membership.payment_time) {
        error = { ...error, payment_time: 'invalid' };
      }
    }
  }
  return error;
};

export const convertToPlain = (html) => {
  // Create a new div element
  var tempDivElement = document.createElement('div');

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || '';
};

export const celToFaConverter = (valNum) => {
  valNum = parseFloat(valNum);
  return (valNum * 1.8 + 32).toFixed(0);
};

//set permissions for ability
export const setPermissions = (permissions) => {
  let newAbility = [{ action: 'read', subject: 'base' }];
  for (const permission of permissions) {
    if (permission.read === true) {
      newAbility.push({
        action: 'read',
        subject: permission.defaultId
      });
      if (permission.write === true) {
        newAbility.push({
          action: 'write',
          subject: permission.defaultId
        });
      }
      if (permission.update === true) {
        newAbility.push({
          action: 'update',
          subject: permission.defaultId
        });
      }
      if (permission.delete === true) {
        newAbility.push({
          action: 'delete',
          subject: permission.defaultId
        });
      }
    }
  }
  return newAbility;
};

export const setTemplateData = (permissions) => {
  let elements = [];
  for (const permission of permissions) {
    elements.push({
      resource: permission.defaultId,
      title: permission.elementTitle
    });
  }
  return elements;
};

export const toCapitalize = (subject) => {
  if (subject && subject.length > 0) {
    return subject.charAt(0).toUpperCase() + subject.substring(1);
  } else return;
};

export const calculateAge = (dob) => {
  // birthday is a date
  let birthday = new Date(dob);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const calculateRemainingDays = (dob) => {
  var birthday = new Date(dob);
  var today = new Date();

  //Set current year or the next year if you already had birthday this year
  birthday.setFullYear(today.getFullYear());
  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  //Calculate difference between days
  return Math.floor((birthday - today) / (1000 * 60 * 60 * 24));
};

export const calculatePassedDays = (date) => {
  let days = moment().diff(date, 'days');
  return days;
};

export const isIntervalInCurMonth = (start, end, year, month) => {
  const startDay = new Date(start);
  const endDay = new Date(end);
  if (
    (startDay.getMonth == month && startDay.getFullYear == year) ||
    (endDay.getMonth == month && endDay.getFullYear == year)
  ) {
    return true;
  } else return false;
};

export const renderCategoryName = (contactTypes, typeIdArr) => {
  let matchedType = contactTypes.find((item) => typeIdArr.includes(item._id));
  return matchedType?.name ? matchedType?.name : '';
};

export const formatDateTime = (x) => {
  const date = new Date(x);
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  return date.toLocaleDateString() + ' ' + time;
};

export const sortDays = (daysArray) => {
  const sortedArray = daysArray.sort((a, b) => weekDays.indexOf(a) - weekDays.indexOf(b));
  return sortedArray;
};

import moment from 'moment';

const states = [
  'light-success',
  'light-danger',
  'light-warning',
  'light-info',
  'light-primary',
  'light-secondary'
];

export const getAvatarColor = (id) => {
  let tmpValue = 0;
  Array.from(id).forEach((x, index) => {
    tmpValue += x.codePointAt(0) * (index + 1);
  });
  const stateNum = tmpValue % 6,
    color = states[stateNum];
  return color;
};

export const initialTimeScheduleTemplate = {
  classStartTime: moment().format('HH:mm'),
  classEndTime: moment().format('HH:mm'),
  range: 0,
  index: 1,
  classDays: []
};

export const rangeOptions = [
  { value: 0, label: '0' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  // { value: 20, label: '20' },
  // { value: 25, label: '25' },
  { value: 30, label: '30' },
  // { value: 35, label: '35' },
  // { value: 40, label: '40' },
  { value: 45, label: '45' },
  // { value: 50, label: '50' },
  // { value: 55, label: '55' },
  { value: 60, label: '60' },
  // { value: 65, label: '65' },
  // { value: 70, label: '70' },
  // { value: 75, label: '75' },
  // { value: 80, label: '80' },
  // { value: 85, label: '85' },
  { value: 90, label: '90' }
];

export const formatDate = (date) => {
  var hh = parseInt(date.split(':')[0]) || 0;
  var m = parseInt(date.split(':')[1]) || 0;
  var dd = 'AM';
  var h = hh;
  if (h >= 12) {
    h = hh - 12;
    dd = 'PM';
  }
  if (h == 0) {
    h = 12;
  }
  m = m < 10 ? '0' + m : m;

  // s = s < 10 ? '0' + s : s;

  /* if you want 2 digit hours:
  h = h<10?"0"+h:h; */

  var pattern = new RegExp('0?' + hh + ':' + m);

  var replacement = h + ':' + m;
  /* if you want to add seconds
  replacement += ":"+s;  */
  replacement += ' ' + dd;

  return date.replace(pattern, replacement);
};

export const colorData = [
  { color: 'primary' },
  { color: 'secondary' },
  { color: 'success' },
  { color: 'danger' },
  { color: 'warning' },
  { color: 'info' },
  { color: 'light-primary' },
  { color: 'light-secondary' },
  { color: 'light-success' },
  { color: 'light-danger' },
  { color: 'light-warning' },
  { color: 'light-info' }
];

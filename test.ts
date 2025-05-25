import moment from 'moment-timezone';

const startDate = '2025-01-01T04:00:00.000Z';
const ServerTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const startTime = moment(startDate).utc();
const hour = startTime.hour();
const minute = startTime.minute();
const second = startTime.second();
const date = startTime.date();
const month = startTime.month(); // 0-11
const year = startTime.year();

console.log({
  hour,
  minute,
  second,
  date,
  month,
  year,
  startTime,
  ServerTZ,
});

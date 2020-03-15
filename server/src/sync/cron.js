const CronJob = require('cron').CronJob;
const SaveInDB = require('./SaveInDB.js');

const save = new SaveInDB();

// Range cron:
// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)

const schedule = new CronJob('* */15 * * * *', () => {
  const l = save.schedule();
  if (!l) console.warn('Error schedule');
});

const teacher = new CronJob('* 0 23 */1 * *', () => {
  const l = save.teacher();
  if (!l) console.warn('Error teacher');
});

const chess = new CronJob('* 0 23 */7 * *', () => {
  const l = save.chess();
  if (!l) console.warn('Error chess');
});

const warning = new CronJob('* */30 * * * *', () => {
  const l = save.warning();
  if (!l) console.warn('Error teacher');
});

console.log('Cron start');
schedule.start();
teacher.start();
chess.start();
warning.start();

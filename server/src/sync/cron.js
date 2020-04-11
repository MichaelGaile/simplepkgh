const { CronJob } = require('cron');
const SaveInDB = require('./SaveInDB.js');
const { db } = require('../../config.js');

const save = new SaveInDB({ db });

// Range cron:
// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)

const schedule = new CronJob('* */15 * * * *', () => {
  save.schedule();
});

const teacher = new CronJob('* 0 23 */1 * *', () => {
  save.teacher();
});

const chess = new CronJob('* 0 23 */7 * *', () => {
  save.chess();
});

const warning = new CronJob('* */30 * * * *', () => {
  save.warning();
});

console.log('Cron start');
schedule.start();
teacher.start();
chess.start();
warning.start();

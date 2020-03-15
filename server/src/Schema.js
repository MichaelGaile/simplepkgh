const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleLesson = new Schema({
  numSubject: String,
  numTeacher: String,
  denSubject: String,
  denTeacher: String,
});

const scheduleTable = new Schema({
  dayWeek: String,
  lesson: [scheduleLesson],
});

const scheduleReplaceLesson = new Schema({
  numSubject: String,
  numTeacher: String,
  denSubject: String,
  denTeacher: String,
});

const schedule = new Schema({
  isDenominator: Boolean,
  timestamp: Date,
  error: [String],
  schedule: {
    id: String,
    name: String,
    specialty: String,
    table: [scheduleTable],
    replace: {
      timestamp: Date,
      lesson: [scheduleReplaceLesson],
    },
  },
});

const teacherDownload = new Schema({
  text: String,
  link: String,
});

const teacher = new Schema({
  id: String,
  text: String,
  time: Date,
  author: {
    text: String,
    link: String,
  },
  tag: {
    text: String,
    link: String,
  },
  download: [teacherDownload],
});

const call = new Schema({
  id: String,
  timestamp: Date,
  data: Schema.Types.Mixed,
});

const warning = new Schema({
  id: String,
  timestamp: Date,
  data: Schema.Types.Mixed,
});

const chess = new Schema({
  id: String,
  timestamp: Date,
  data: Schema.Types.Mixed,
});

module.exports = {
  schedule,
  teacher,
  call,
  warning,
  chess,
};

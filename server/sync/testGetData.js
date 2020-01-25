const mongodb = require('mongoose'),
  fs           = require('fs'),
  { Schema }   = require('mongoose');

const dbKey = fs.readFileSync('dbKey.key', 'utf8');
mongodb.connect(dbKey, { useNewUrlParser: true, useUnifiedTopology: true });

const schemaShedule = new Schema({
      name: { type: String },
      className: { type: String },
      table: [
        {
          dayWeek: { type: String },
          lesson: [
            {
              numSubject: { type: String },
              numTeachet: { type: String },

              denSubject: { type: String },
              denTeachet: { type: String },
            }
          ]
        }
      ]
    }, 'schedule');

const Schedule = mongodb.model('schedule', schemaShedule);
Schedule.find({}, (err, data) => console.log(err, data));

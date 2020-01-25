const MongoClient = require('mongodb').MongoClient,
  parseSchedule   = require('./parseSchedule.js'),
  fs              = require('fs');

var url = 'http://pkgh.edu.ru/obuchenie/shedule-of-classes.html';

parseSchedule(url).then((sch) => {
  // Save in mongodb
  // Get uri from mongodb
  const dbKey = fs.readFileSync('../dbKey.key', 'utf8');
  // Some connect
  const clientDB = new MongoClient(dbKey, { useNewUrlParser: true, useUnifiedTopology: true});
  clientDB.connect((err) => {
    if(err) console.error(err);
    const query = sch.map((el) => {
      return {
        updateOne: {
          filter: { id: el.id },
          update: { $set: el },
          upsert: true,
        }
      }
    });
    clientDB.db('simplepkgh').collection('schedule').bulkWrite(query, (err) => {
      if(err) console.log(err);
      clientDB.close();
    });
  });
});

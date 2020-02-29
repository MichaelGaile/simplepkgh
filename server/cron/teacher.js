const dPkgh = require('get-data-pkgh');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

const keyPath = path.join(__dirname, 'dbKey.key');
const key = fs.readFileSync(keyPath, 'utf-8');
const clientDB = new MongoClient(key, { useNewUrlParser: true, useUnifiedTopology: true});
const pkgh = new dPkgh();
pkgh.getTeacher().then((data) => {
  clientDB.connect((err) => {
    if (err) console.error(err);
    const query = Object.keys(data).map((hash) => {
      return {
        updateOne: {
          filter: { id: hash },
          update: { $set: data[hash] },
          upsert: true,
        }
      }
    });
    clientDB.db('simplepkgh').collection('teacher').bulkWrite(query, (err) => {
      if(err) console.error(err);
      clientDB.close();
    });
  });
});

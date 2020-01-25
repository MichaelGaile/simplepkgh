const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const uri = fs.readFileSync('dbKey.key', 'utf8');
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const data =
    {
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
    };
client.connect((err) => {
  if(err) console.error(err);
  client.db('simplepkgh').collection('schedule').insertOne(data).then(() => {
    client.close();
  });
});

const express = require('express'),
  MongoClient = require('mongodb').MongoClient,
  fs          = require('fs');

const router = express.Router();

router.get('/schedule', (req, res) => {
  try {
    const dbKey = fs.readFileSync('./server/dbKey.key', 'utf8');
    const clientDB = new MongoClient(dbKey, { useNewUrlParser: true, useUnifiedTopology: true });
    clientDB.connect((err) => {
      if(err) throw err;
      clientDB.db('simplepkgh').collection('schedule').find({}, {_id: 0, name: 1, id: 1}).toArray((err, data) => {
        console.log(data[0]);
        res.send(data[0]);
        clientDB.close();
      });
    });
  } catch(e) {
    console.error(e);
  }
});
router.get('/schedule/:id', (req, res) => {
  //res.send()
});

module.exports = router;

const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();

const { db } = require('../config.js');

router.get('/schedule', (req, res) => {
  MongoClient.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    client.db('simplepkgh').collection('schedule').find({}, {
      projection: {
        _id: 0,
        table: 0,
        replace: 0,
      },
    }).toArray((e, data) => {
      if (e) throw e;
      res.send(data);
    });
  });
});
router.get('/schedule/:id', (req, res) => {
  MongoClient.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    client.db('simplepkgh').collection('schedule').findOne({ id: req.params.id }, {
      projection: {
        _id: 0,
      },
    }, (e, data) => {
      if (e) throw e;
      res.send(data);
    });
  });
});

module.exports = router;

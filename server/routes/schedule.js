const express = require('express'),
  mongoClient = require('mongodb').MongoClient;

const app = express();

app.get('/schedule', (req, res) => {
});
app.get('/schedule:id', (req, res) => {
  const schedule = new Schema({

  })
  res.send()
});

module.exports = app;

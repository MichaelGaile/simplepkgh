const { MongoClient } = require('mongodb');

const DataPkgh = require('get-data-pkgh');

class SaveInDB {
  constructor(userOpts = {}) {
    const opts = (() => {
      const defaultOpts = {
        key: null,
        pkgh: new DataPkgh(),
      };
      return Object.assign(defaultOpts, userOpts);
    })();
    this.pkgh = opts.pkgh;
    this.key = opts.key;
  }

  async schedule() {
    const query = await this.pkgh.getSchedule()
      .then((r) => r.toArray()).then((data) => data.map((item) => ({
        updateOne: {
          filter: { id: item.id },
          update: { $set: item },
          upsert: true,
        },
      })));
    MongoClient.connect(this.key, { useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;
      client.db('simplepkgh').collection('schedule').bulkWrite(query, (e) => { if (e) throw e; });
    });
  }

  async teacher() {
    const query = await this.pkgh.getTeacher()
      .then((r) => r.toArray()).then((data) => data.map((item) => ({
        updateOne: {
          filter: { id: item.id },
          update: { $set: item },
          upsert: true,
        },
      })));
    MongoClient.connect(this.key, { useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;
      client.db('simplepkgh').collection('teacher').bulkWrite(query, (e) => { if (e) throw e; });
    });
  }

  async call() {
    const query = {
      updateOne: {
        filter: { id: 1 },
        update: { $set: await this.pkgh.getCall() },
        upsert: true,
      },
    };
    MongoClient.connect(this.key, { useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;
      client.db('simplepkgh').collection('call').bulkWrite(query, (e) => { if (e) throw e; });
    });
  }

  async warning() {
    const query = {
      updateOne: {
        filter: { id: 1 },
        update: { $set: await this.pkgh.getWarning() },
        upsert: true,
      },
    };
    MongoClient.connect(this.key, { useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;
      client.db('simplepkgh').collection('warning').bulkWrite(query, (e) => { if (e) throw e; });
    });
  }

  async chess() {
    const query = {
      updateOne: {
        filter: { id: 1 },
        update: { $set: await this.pkgh.getChess() },
        upsert: true,
      },
    };
    MongoClient.connect(this.key, { useUnifiedTopology: true }, (err, client) => {
      if (err) throw err;
      client.db('simplepkgh').collection('chess').bulkWrite(query, (e) => { if (e) throw e; });
    });
  }
}

module.exports = SaveInDB;

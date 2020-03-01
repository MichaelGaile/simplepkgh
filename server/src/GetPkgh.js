const DataPkgh = require('get-data-pkgh');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

class GetPkgh {
  constructor(cache = true, timeCache = 900000) {
    const keyPath = path.join(__dirname, 'dbKey.key');
    const pkgh = new DataPkgh(cache, timeCache);
    this._pkgh = pkgh;
    this._data = {
      key: fs.readFileSync(keyPath, 'utf-8'),
      db: 'simplepkgh',
    };
  }

  set data(val) {
    this._data = val;
  }

  get data() {
    return this._data;
  }

  set pkgh(val) {
    this._pkgh = val;
  }

  get pkgh() {
    return this._pkgh;
  }

  async getSchedule() {
    try {
      const clientDB = new MongoClient(this.data.key, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      clientDB.connect((err) => {
        if (err) throw err;
        return clientDB.db(this.data.db).collection('schedule').find();
      });
    } catch (err) {
      if (err) console.error(err);
    }
    return this.pkgh.getSchedule();
  }

  async getScheduleGroup(hash) {
    try {
      const clientDB = new MongoClient(this.data.key, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      clientDB.connect((err) => {
        if (err) console.error(err);
        return clientDB.db(this.data.db).collection('schedule').findOne({ id: hash });
      });
    } catch (err) {
      if (err) console.error(err);
    }
    console.log('no db');
    return this.pkgh.getSchedule();
  }

  async getTeacher() {
    try {
      const clientDB = new MongoClient(this.data.key, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      clientDB.connect((err) => {
        if (err) throw err;
        return clientDB.db(this.data.db).collection('teacher').find();
      });
    } catch (err) {
      console.error(err);
    }
    console.log('no db');
    return this.pkgh.getTeacher();
  }

  async getTeacherPost(hash) {
    try {
      const clientDB = new MongoClient(this.data.key, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      clientDB.connect((err) => {
        if (err) throw err;
        return clientDB.db(this.data.db).collection('teacher').findOne({ id: hash });
      });
    } catch (err) {
      console.error(err);
    }
    return this.pkgh.getSchedule();
  }
}

module.exports = GetPkgh;

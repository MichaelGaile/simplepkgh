//const MongoClient = require('mongodb').MongoClient;
// Write this code in mongoose
// Test code like Object Promise
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const DataPkgh = require('get-data-pkgh');

class GetPkgh {
  constructor(opts = {
    cache: true,
    timeCache: 900000,
  }) {
    const keyPath = path.join(__dirname, 'dbKey.key');
    const pkgh = new DataPkgh(opts);
    this._pkgh = pkgh;
    this._data = {
      key: fs.readFileSync(keyPath, 'utf-8'),
      db: 'simplepkgh',
    };
    this.now = null;
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

  set now(data) {
    this._now = data;
  }

  get now() {
    const data = this._now;
    this._now = null;
    return data;
  }

  getSchedule() {
    try {
      const clientDB = await mongoose.connect(this.data.key, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      return clientDB.connect((err) => {
        if (err) throw err;
        const cursor = clientDB.db(this.data.db).collection('schedule').find();
        return (async () => {
          const out = {};
          for await (const data of cursor) {
            out[data.id] = data;
          }
          return out;
        })().then((r) => {
          clientDB.close();
          this.now = r;
          return this;
        });
      });
    } catch (err) {
      console.error(err);
      console.warn('Warning GetPkgh: no connect db');
      this.now = this.pkgh.getSchedule().then((r) => r.toArray());
      return this;
    }
  }

  async getScheduleGroup(hash) {
    try {
      const clientDB = new MongoClient(this.data.key, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      clientDB.connect((err) => {
        if (err) throw err;
        const cursor = clientDB.db(this.data.db).collection('schedule').findOne({id: hash});
        (async () => {
          const out = {};
          for await (const data of cursor) {
            out[data.id] = data;
          }
          return out;
        })().then((r) => {
          clientDB.close();
          this.now = r;
          return this;
        });
      });
    } catch (err) {
      console.error(err);
      console.warn('Warning GetPkgh: no connect db');
      this.now = this.pkgh.getScheduleGroup(hash);
      return this;
    }
  }

  // Sort enum = array, specialty, id
  //async getScheduleListGroup(sort = 'id', callback) {
    //try {
      //const clientDB = new MongoClient(this.data.key, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
      //});
      //clientDB.connect((err) => {
        //if (err) throw err;
        //const cursor = clientDB.db(this.data.db).collection('schedule').find({}, { id: 1, name: 1, specialty: 1, table: 0 });
        //(async () => {
          //const out = [];
          //for await (const data of cursor) {
            //out.push(data);
          //}
          //return out;
        //})().then((r) => {
          //const data = sort === 'array' ? r : (() => {
            //const out = {};
            //switch (sort) {
              //case 'specialty':
                //// FIXME
                //// This is not very productive
                //// God have mercy on me if you are

                //// Unique specialty on data
                //r.map((el) => el.specialty)
                  //.filter((el, i, self) => self.indexOf(el) === i)
                  //.forEach((spec) => {
                    //out[spec] = [];
                    //r.forEach((el) => {
                      //out[spec].push(el);
                    //});
                  //});
                //break;
              //case 'id':
                //r.forEach((el) => {
                  //out[el.id] = el;
                //});
                //break;
              //default:
                //break;
            //}
            //return out;
          //})();
          //return callback(data);
        //});
      //});
    //} catch (err) {
      //console.error(err);
      //console.warn('Warning GetPkgh: no connect db');

      //const data = await this.pkgh.getScheduleListGroup(sort);
      //return callback(data);
    //}
  //}

  async getTeacher(limit = [0, 1]) {
    try {
      const clientDB = new MongoClient(this.data.key, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      clientDB.connect((err) => {
        if (err) throw err;
        const cursor = clientDB.db(this.data.db).collection('teacher').find().skip(limit[0])
          .limit(limit[1]);

        (async () => {
          const out = {};
          for await (const data of cursor) {
            out[data.id] = data;
          }
          return out;
        })().then((r) => {
          clientDB.close();
          this.now = r;
          return this;
        });
      });
    } catch (err) {
      console.error(err);
      console.warn('Warning GetPkgh: no connect db');
      (async () => {
        const teacher = await this.pkgh.getTeacher();
        const out = [];
        const keys = Object.keys(teacher);
        const len = keys.length;
        const l = limit > len ? len : limit[1];
        const s = skip < 0 ? 0 : limit[0];
        for (let i = s; i < l; i++) out.push(teacher[keys[i]]);
        return out;
      })().then((r) => {
        this.now = r;
        return this;
      });
    }
  }

  async getTeacherPost(hash, callback) {
    try {
      const clientDB = new MongoClient(this.data.key, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      clientDB.connect((err) => {
        if (err) throw err;
        clientDB.db(this.data.db).collection('teacher').findOne({ id: hash }).then((r) => {
          clientDB.close();
          return callback(r);
        });
      });
    } catch (err) {
      console.error(err);
      console.warn('Warning GetPkgh: no connect db');

      this.pkgh.getSchedulePost(hash).then((r) => {
        return callback(r);
      });
    }
  }

  async toArray() {
    const data = await this.now;
    if (data instanceof Array) return data;
    return Object.keys(data).map((key) => data[key]);
  }

  async firstIndex(index) {
    let data = await this.now;
    const out = {};
    if (!(data instanceof Array)) data = Object.keys(data).map((key) => data[key]);
    data.forEach((item) => {
      out[item[index]] = item;
    });
    return out;
  }

  async groupIndex(index) {
    let data = await this.now;
    if (!(data instanceof Array)) data = Object.keys(data).map((key) => data[key]);

    const out = {};
    data.map((item) => item[index])
      .filter((item, i, self) => self.indexOf(item) === i)
      .forEach((spec) => {
        out[spec] = [];
        data.forEach((item) => {
          out[spec].push(item);
        });
      });
    return out;
  }
}

module.exports = GetPkgh;

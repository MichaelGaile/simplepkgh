const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const DataPkgh = require('get-data-pkgh');
const schema = require('../Schema.js');

class SaveInDB {
  constructor(opts = {}) {
    const nowOpts = (() => {
      const defaultOpts = { pkgh: null, key: null };
      return Object.assign(defaultOpts, opts);
    })();

    this.key = opts.key;
    this.pkgh = nowOpts.pkgh ? nowOpts.pkgh : new DataPkgh();

    this.connect = mongoose.createConnection(this.key, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async schedule() {
    const modelSchedule = this.connect.model('schedule', schema.schedule);
    const modelOneSchedule = this.connect.model('oneSchedule', schema.oneSchedule);
    const schedule = await this.pkgh.getSchedule().then((r) => r.getSingle(r.toArray));
    const { data } = schedule;
    const single = schedule['@single'];

    modelOneSchedule.findOneAndUpdate({}, main, { new: false, upsert: true }, (err) => {
      if (err) throw err;
    });

    data.forEach((item) => {
      modelSchedule.findOneAndUpdate({ id: item.id }, item, { new: false, upsert: true }, (err) => {
        if (err) throw err;
      });
    });
    return true;
  }

  async teacher() {
    const Teacher = this.connect.model('teacher', schema.teacher);
    this.pkgh.getTeacher().then((r) => r.toArray()).then((data) => {
      data.forEach((post) => {
        const model = new Teacher(post);
        model.findOneAndUpdate({ id: post.id }, post, { new: true, upsert: true });
      });
    });
    return true;
  }

  async chess() {
    const Chess = this.connect.model('chess', schema.chess);
    this.pkgh.getChess().then((data) => {
      const model = new Chess({ timestamp: Date.now(), data });
      // FIXME unique This data
      model.findOneAndUpdate({ id: data.id }, data, { new: true, upsert: true });
    });
    return true;
  }

  async call() {
    const Call = this.connect.model('call', schema.call);
    this.pkgh.getCall().then((data) => {
      const model = new Call({ timestamp: Date.now(), data });
      // FIXME unique This data
      model.findOneAndUpdate({ id: data.id }, data, { new: true, upsert: true });
    });
    return true;
  }

  warning() {
    const Warning = this.connect.model('warning', schema.warning);
    this.pkgh.getWarning().then((data) => {
      const model = new Warning({ timestamp: Date.now(), data });
      model.findOneAndUpdate({ id: data.id }, data, { new: true, upsert: true });
    });
  }
}

module.exports = SaveInDB;

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dPkgh = require('get-data-pkgh');
const schema = require('../Schema.js');

class SaveInDB {
  constructor(opts = {
    pkgh: null,
    key: null,
    schema: null,
  }) {
    const keyPath = path.join(__dirname, '../dbKey.key');
    this.key = opts.key ? opts.key : fs.readFileSync(keyPath, 'utf-8');
    this.pkgh = opts.pkgh ? opts.pkgh : new dPkgh();
    this.schema = opts.schema ? opts.schema : schema;

    this.connect = mongoose.createConnection(this.key, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  schedule() {
    const Schedule = this.connect.model('schedule', schema.schedule);
    this.pkgh.getSchedule().then((r) => r.toArray()).then((data) => {
      data.forEach((group) => {
        const model = new Schedule(group);
        model.findOneAndUpdate({ id: group.id }, group, { new: true, upsert: true });
      });
    });
    return true;
  }

  teacher() {
    const Teacher = this.connect.model('teacher', schema.teacher);
    this.pkgh.getTeacher().then((r) => r.toArray()).then((data) => {
      data.forEach((post) => {
        const model = new Teacher(post);
        model.findOneAndUpdate({ id: post.id }, post, { new: true, upsert: true });
      });
    });
    return true;
  }

  chess() {
    const Chess = this.connect.model('chess', schema.chess);
    this.pkgh.getChess().then((data) => {
      const model = new Chess({ timestamp: Date.now(), data });
      // FIXME unique This data
      model.findOneAndUpdate({ id: data.id }, data, { new: true, upsert: true });
    });
    return true;
  }

  call() {
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

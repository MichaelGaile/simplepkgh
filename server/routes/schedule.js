const express = require('express');
const getPkgh = require('../src/GetPkgh.js');

const router = express.Router();

const pkgh = new getPkgh();

router.get('/schedule', (req, res) => {
  pkgh.getScheduleListGroup().then((r) => {
    return res.send(r);
  });
});
router.get('/schedule/:id', (req, res) => {
  pkgh.getScheduleGroup(req.params.id).then((r) => {
    pkgh.getSchedule().then((r) => {
      return res.send(r);
    });
  });
});

module.exports = router;

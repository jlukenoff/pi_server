const express = require('express');
const { Gpio } = require('onoff');

const router = express.Router();

router.post('/', (req, res) => {
  const { timeOn } = req.body;
  const relay = new Gpio(4, 'high');
  console.log(`current relay voltage: ${relay.readSync()}`);
  relay.writeSync(0);
  setTimeout(() => {
    relay.writeSync(1);
    relay.unexport();
    res.json({ status: 'SUCCESS', message: `Pump was on for ${timeOn}` });
  }, timeOn);
});

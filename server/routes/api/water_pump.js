const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.post('/', (req, res) => {
  let { timeOn } = req.body;
  const { ouncesToWater } = req.body;

  console.log('timeOn, ouncesToWater:', timeOn, ouncesToWater);

  if (!timeOn && ouncesToWater) {
    timeOn = ouncesToWater * 3300;
  }

  console.log(`Time to remain on: ${timeOn}`);
  const requestBody = JSON.stringify({ timeOn });
  console.log(`requestBody: ${requestBody}`);
  return fetch('http://10.0.0.180:3000/api/pump', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody,
  })
    .then(c => c.json())
    .then(d => res.json(d))
    .catch(e => console.error(`Error communicating with GPIO API: ${e}`));
});

module.exports = router;

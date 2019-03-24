const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.post('/', (req, res) => {
  const { timeOn } = req.body;
  console.log(timeOn);
  return fetch('http://10.0.0.180:3000/api/pump', {
    method: 'POST',
    body: JSON.stringify({ timeOn }),
  })
    .then(c => c.json())
    .then(d => res.json(d))
    .catch(e => console.error(`Error communicating with GPIO API: ${e}`));
});

module.exports = router;

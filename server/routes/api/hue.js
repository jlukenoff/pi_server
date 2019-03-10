const express = require('express');

const router = express.Router();

const { getAllLights } = require('./hue_controls');

router.get('/', (req, res) =>
  getAllLights()
    .then(lightList => res.json(lightList))
    .catch(e => console.error(`Error fetching or parsing light data: ${e}`))
);

module.exports = router;

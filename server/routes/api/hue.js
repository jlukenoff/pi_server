const express = require('express');

const router = express.Router();

const { getAllLights } = require('./hue_controls');

router.get('/', async (req, res) => {
  try {
    const response = await getAllLights();
    const formattedResponse = Object.entries(response).map(p => p[1]).reduce((output, obj) => {
      output[obj.name] = obj;
      return output;
    }, {});
    return res.json(formattedResponse);
  } catch (e) {
    console.error(`Error parsing light response: ${e}`);
    return res.status(403).send(e);
  }
});

module.exports = router;

const express = require('express');

const router = express.Router();

const { getAllLights, toggleLight, adjustLight } = require('./hue_controls');

router.get('/', async (req, res) => {
  try {
    return res.json(await getAllLights());
  } catch (e) {
    console.error(`Error parsing light response: ${e}`);
    return res.status(403).send(e);
  }
});

router.post('/:action', async (req, res) => {
  const { action } = req.params;
  const { id, name, on, bri } = req.body;

  if (action.match(/toggle/i)) {
    try {
      console.log('toggling');
      await toggleLight(id, on);
      return res.json(await getAllLights());
    } catch (e) {
      return res.json({ message: `Error toggling light: ${name}` });
    }
  } else if (action.match(/adjust/i)) {
    try {
      await adjustLight(id, bri);
      return res.json(await getAllLights());
    } catch (e) {
      return res.json({ message: `Error toggling light: ${name}` });
    }
  }

  return res.statusCode(404);
});

module.exports = router;

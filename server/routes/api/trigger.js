const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');
// modules for interacting w/the HUE bridge api
const { getAllLights, adjustLight, toggleLight } = require('./hue_controls');
const { authToken } = require('./credentials.json');
const textParser = require('body-parser').text();

// router.use(textParser);

const atob = require('atob');

// POST - used to toggle or adjust lights from a calendar event
router.post('/', async (req, res) => {
  console.log(req.body);
  const { deviceType, commandString } = req.body;

  // if typeLights
  if (deviceType.match(/lights/i)) {
    const lights = await getAllLights();

    const lightsByName = Object.entries(lights).reduce((output, lightTuple) => {
      const lightID = lightTuple[0];
      const lightObj = lightTuple[1];
      lightObj.id = lightID;
      output[lightObj.name.toLowerCase()] = lightObj;
      return output;
    }, {});

    console.log('commandString:', commandString);
    const [lightName, on, time, brightness] = commandString.slice('\n');

    console.log('lightName:', lightName);
    const lightObj = lightsByName[lightName.toLowerCase()];
    const {
      state: { on: previousOn, bri: previousBri },
    } = lightObj;

    try {
      const responses = Promise.all([
        await toggleLight(lightObj.id, !!on.match(/on/i)),
        await adjustLight(lightObj.id, +brightness),
      ]);
      if (time) {
        const [timeInt, timeUnit] = time.split(' ');

        let timeTillReversion = 0;

        if (timeUnit.match(/hour/i)) {
          timeTillReversion = +timeInt * 60 * 60 * 1000;
        } else if (timeUnit.match(/minute/i)) {
          timeTillReversion = +timeInt * 60 * 1000;
        }
        setTimeout(async () => {
          try {
            return await Promise.all([
              await toggleLight(lightObj.id, previousOn),
              await adjustLight(lightObj.id, +previousBri),
            ]);
          } catch (err) {
            return console.error(
              `Error reverting light state for ${lightName}: ${err}`
            );
          }
        }, timeTillReversion);
      }
      return responses;
    } catch (err) {
      return console.error(`Error toggling lights`);
    }
  }
});
module.exports = router;

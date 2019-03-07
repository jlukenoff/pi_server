const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// modules for interacting w/the HUE bridge api
const { getAllLights, adjustLight, toggleLight } = require('./hue_controls');
const { authToken } = require('./credentials.json');

const atob = require('atob');

// POST - used to toggle or adjust lights from a calendar event
router.post('/', (req, res) => {
  const {
    summary: service,
    description: csvArgs,
    begins_at: beginsAt,
    created_by: createdBy,
    created_at: createdAt,
  } = req.body;

  const token = req.header('Authorization');
  const unamePass = atob(token.split(' ')[1]);
  console.log(unamePass);
  if (unamePass !== authToken) {
    return res.sendStatus(401);
  }

  if (service === 'LIGHT') {
    csvArgs
      .split('\n')
      .slice(1)
      .forEach(row => {
        console.log('called service functions');
        const [lightID, bri, on] = row.split('|');
        if (bri) {
          return adjustLight(lightID, bri, function(err, hueResponse) {
            if (err) {
              return console.error(
                `Error adjusting light ${lightID} to brightness ${bri}: ${err}`
              );
            }
            console.log(
              `Successfully adjusted light id ${lightID} to brightness ${bri} (0-254 range).\nHUE response: ${JSON.stringify(
                hueResponse,
                null,
                2
              )}`
            );
            return res.send('SUCCESS');
          });
        } else {
          return toggleLight(lightID, on, function(err, hueResponse) {
            if (err) {
              console.error(
                `Error toggling light ${lightID} to state on = ${on}: ${err}`
              );
            }
            console.log(
              `Successfully toggling light id ${lightID} to state = ${on} (0-254 range).\nHUE response: ${JSON.stringify(
                hueResponse,
                null,
                2
              )}`
            );

            console.log('----------');

            return res.send('SUCCESS');
          });
        }
      });
  }

  // write to logs
  /*  fs.appendFile(
    '../../data/events.csv',
    `${[
      service,
      csvArgs,
      createdBy,
      createdAt,
      beginsAt,
      new Date().toISOString(),
    ].join(',')}\n`,
    function(err) {
      if (err) return console.error(`Error writing to log: ${err}`);
      console.log(
        `successfully processed payload: ${JSON.stringify(req.body, null, 2)}`
      );
      console.log('SUCCESS: wrote to logs');
      res.send(
        `SUCCESS: received payload - ${JSON.stringify(req.body, null, 2)}`
      );
    }
  ); */
});
module.exports = router;

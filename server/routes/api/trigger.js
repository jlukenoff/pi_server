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
router.post('/', (req, res) => {
  console.log(req.body);
  const {} = req.body;

  // The above is a hack used to remove escape characters from the automate.io service payload

  const token = req.header('Authorization');
  const unamePass = atob(token.split(' ')[1]);
  console.log(unamePass);
  if (unamePass !== authToken) {
    return res.sendStatus(401);
  }

  if (service === 'LIGHT') {
    console.log(csvArgs);
    Promise.all(
      csvArgs
        .split('\n')
        .slice(1)
        .map(row => {
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
              return hueResponse;
            });
          } else {
            return toggleLight(lightID, on, function(err, hueResponse) {
              if (err) {
                return console.error(
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
              return hueResponse;
            });
          }
        })
    )
      .then(d => res.json(Array.from(d)))
      .catch(e =>
        console.error(
          `Error updating lights (/server/routes/api/trigger:73): ${e}`
        )
      );
  } else {
    return res.sendStatus(422);
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

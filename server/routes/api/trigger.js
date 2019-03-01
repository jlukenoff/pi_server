const express = require('express');
const router = express.Router();
const fs = require('fs');
// modules for interacting w/the HUE bridge api
const hueControls = require('./hue_controls');
const { authToken } = require('./credentials.json');
const atob = require('atob');

router.post('/', (req, res) => {
  // extract values from body
  const {
    summary,
    description,
    begins_at: beginsAt,
    created_by: createdBy,
    created_at: createdAt,
  } = req.body;

  // parse auth
  const token = req.header('Authorization');
  const unamePass = atob(token.split(' ')[1]);
  console.log(unamePass);

  // verify auth
  if (unamePass !== authToken) {
    res.sendStatus(401);
  }

  if (process.env.NODE_ENV === 'production') {
    // write to logs
    fs.appendFile(
      path.join('/home/pi', 'Desktop', 'events.csv'),
      `${[
        summary,
        description,
        createdBy,
        createdAt,
        beginsAt,
        new Date().toISOString(),
      ].join('|')}\n`,
      err => {
        if (err) console.error(`Error writing to log: ${err}`);
        // TODO:
        // parse arguments received in API call
        // make calls to IoT
        res.send('SUCCESS: wrote to logs');
      }
    );
  } else {
    res.send(
      `SUCCESS: received payload - ${JSON.stringify(req.body, null, 2)}`
    );
  }
});

module.exports = router;

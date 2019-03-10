const fetch = require('node-fetch');
const { HUE_USERNAME } = require('../credentials.json');

const getAllLights = done => {
  return fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights`)
    .then(chunk => chunk.json())
    .then(data => done(null, data))
    .catch(err => done(err));
};

const adjustLight = (lightID, bri, done) => {
  if (typeof bri !== 'number') {
    bri = Number(bri);
  }
  return fetch(
    `http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightID}/state`,
    {
      method: 'PUT',
      body: JSON.stringify({ bri }),
    }
  )
    .then(chunk => chunk.json())
    .then(data => done(null, data))
    .catch(err => done(err));
};

const toggleLight = (lightID, on, done) => {
  if (typeof on !== 'boolean') {
    on = 'true' === on;
  }
  return fetch(
    `http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightID}/state`,
    {
      method: 'PUT',
      body: JSON.stringify({ on }),
    }
  )
    .then(chunk => chunk.json())
    .then(data => done(null, data))
    .catch(err => done(err));
};

module.exports = { getAllLights, adjustLight, toggleLight };

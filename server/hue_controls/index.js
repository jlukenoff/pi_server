const fetch = require('node-fetch');
const { HUE_USERNAME } = require('../../credentials.json');

const getAllLights = next => {
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights`)
    .then(chunk => chunk.json())
    .then(data => next(null, data))
    .catch(err => next(err));
};

const adjustLight = (lightID, bri, next) => {
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightID}/state`, {
    method: 'PUT',
    body: JSON.stringify({ bri }),
  })
    .then(chunk => chunk.json())
    .then(data => next(null, data))
    .catch(err => next(err));
};

const toggleLight = (lightID, on, next) => {
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightID}/state`, {
    method: 'PUT',
    body: JSON.stringify({ on }),
  })
    .then(chunk => chunk.json())
    .then(data => next(null, data))
    .catch(err => next(err));
};

module.exports = { getAllLights, adjustLight, toggleLight };

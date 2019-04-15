const fetch = require('node-fetch');
const { HUE_USERNAME } = require('../credentials.json');

const getAllLights = () =>
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights`)
    .then(chunk => chunk.json())
    .then(res =>
      Object.entries(res)
        .map(p => ({ id: p[0], ...p[1] }))
        .reduce((output, obj) => {
          output[obj.name] = obj;
          return output;
        }, {})
    )
    .catch(err => console.error(`Error fetching HUE light data: ${err}`));

const adjustLight = (lightID, bri) => {
  bri = typeof bri === 'number' ? bri : Number(bri);
  return fetch(
    `http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightID}/state`,
    {
      method: 'PUT',
      body: JSON.stringify({ bri }),
    }
  ).then(chunk => chunk.json());
};

const toggleLight = (lightID, on) => {
  console.log('on:', on);
  if (typeof on !== 'boolean') {
    on = on === 'true';
  }
  return fetch(
    `http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightID}/state`,
    {
      method: 'PUT',
      body: JSON.stringify({ on }),
    }
  )
    .then(chunk => chunk.json())
    .then(res =>
      console.log('JSON.stringify(res, null, 2):', JSON.stringify(res, null, 2))
    );
};

module.exports = { getAllLights, adjustLight, toggleLight };

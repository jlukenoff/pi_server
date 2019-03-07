const { getAllLights, toggleLight, adjustLight } = require('./index');

getAllLights((err, data) => {
  if (err) console.error(err);
  console.log('getAllLights', data);
});

toggleLight('3', true, (err, data) => {
  if (err) console.error(err);
  console.log('toggleLight', data);
});

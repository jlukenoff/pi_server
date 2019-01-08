const express = require('express');
const path = require('path');
const fs = require('fs');
const jsonParser = require('body-parser').json();

const app = express();

// Config
app.use(express.static(path.resolve(__dirname, '../html')));

app.get('/', (req, res) => {
  res.end('request received');
});

app.post('/api/trigger', jsonParser, (req, res) => {
  const {
    summary,
    description,
    created_by: createdBy,
    created_at: createdAt,
  } = req.body;
  const { Authorization } = req.headers;
  console.log('summary:', summary);
  console.log('description:', description);
  console.log('createdBy:', createdBy);
  console.log('createdAt:', createdAt);
  console.log('Authorization:', Authorization);
  console.log('------End of Data------');
  fs.appendFile(
    path.join('.', 'data/events.csv'),
    `${[summary, description, createdBy, createdAt].join('|')}\n`,
    err => {
      if (err) console.error(`Error writing to file: ${err}`);
      res.send('SUCCESS');
    }
  );
});
const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };

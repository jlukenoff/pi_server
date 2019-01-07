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

app.post('/api/target', jsonParser, (req, res) => {
  const {
    summary,
    description,
    created_by: createdBy,
    created_at: createdAt,
  } = req.body;
  console.log(summary);
  console.log(description);
  console.log(createdBy);
  console.log(createdAt);
_____________________________
  fs.appendFile(
    './data/events.csv',
    `${[summary, description, createdBy, createdAt].join('|')}\n`,
    err => {
      console.error(`Error writing to file: ${err}`);
    }
  );
});
const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };

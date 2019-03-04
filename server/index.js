const express = require('express');
const path = require('path');
const fs = require('fs');
const jsonParser = require('body-parser').json();

const app = express();

// Config
app.use(express.static(path.resolve(__dirname, '../html')));
app.use(jsonParser);

// Routes
app.use(require('./routes'));

// This route has been moved to ./routes/api/trigger
/* app.post('/api/trigger', (req, res) => {
  const {
    summary,
    description,
    begins_at: beginsAt,
    created_by: createdBy,
    created_at: createdAt,
  } = req.body;
  const token = req.header('Authorization');
  if (atob(token) !== authToken) {
    res.status(401);
  }
  console.log(token);
  if (process.env.NODE_ENV === 'production') {
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
        if (err) console.error(`Error writing to file: ${err}`);
        res.send('SUCCESS');
      }
    );
  } else {
    res.send('SUCCESS');
  }
}); */
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${port}`);
  }
});

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };

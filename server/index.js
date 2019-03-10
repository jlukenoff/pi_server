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

app.use('/*', (req, res) => res.redirect('/'));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${port}`);
  }
});

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };

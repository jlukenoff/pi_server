const express = require('express');
const path = require('path');
const fs = require('fs');
const jsonParser = require('body-parser').json();

const app = express();

const STATIC_DIR = path.resolve(__dirname, '../public');

// Config
app.use(express.static(STATIC_DIR));
app.use(jsonParser);

// configure front end routes
app.use((req, res, next) => {
  const feRoutes = ['/water', '/lights'];
  if (feRoutes.indexOf(req.url) > -1) {
    return res.sendFile(`${STATIC_DIR}/index.html`);
  }
  next(null);
});

// Routes
app.use(require('./routes'));

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${port}`);
  }
});

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };

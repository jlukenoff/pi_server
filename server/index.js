const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  res.end('request received');
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };

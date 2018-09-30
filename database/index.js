const { connect, connection } = require('mongoose');
// const Model = require('./Models.js');

connect('mongodb://localhost/db');

const db = connection;

module.exports = { db, connection };

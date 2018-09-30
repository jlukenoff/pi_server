const { Schema, model } = require('mongoose');

const schema = new Schema({
  _id: Number,
  name: String,
});

module.exports = model('model', schema);

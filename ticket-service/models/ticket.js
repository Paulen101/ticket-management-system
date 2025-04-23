const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: String,
  description: String,
  status: { type: String, default: 'open' }
}, { timestamps: true });

module.exports = model('Ticket', schema);

const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
  ticketId: { type: Schema.Types.ObjectId, required: true, ref: 'Ticket' },
  message:  { type: String, required: true }
}, { timestamps: true });

module.exports = model('Notification', notificationSchema);
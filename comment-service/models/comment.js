const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  ticketId:    { type: Schema.Types.ObjectId, required: true, ref: 'Ticket' },
  commentText: { type: String, required: true }
}, { timestamps: true });

module.exports = model('Comment', commentSchema);
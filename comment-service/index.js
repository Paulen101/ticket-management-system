const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./dbconnect');
const Comment = require('./models/comment');
require('dotenv').config(); // Import dotenv to load environment variables

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB using the MONGODB_URI from environment variables
connectToDb('comment-service');

// Routes for comment CRUD operations
app.post('/comments', async (req, res) => {
  try {
    const c = new Comment(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

app.get('/comments', async (_, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.get('/comments/:id', async (req, res) => {
  try {
    const c = await Comment.findById(req.params.id);
    if (!c) return res.status(404).send("Comment not found");
    res.json(c);
  } catch (err) {
    console.error('Error fetching comment:', err);
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
});

app.put('/comments/:id', async (req, res) => {
  try {
    const c = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
  } catch (err) {
    console.error('Error updating comment:', err);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.send({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Start server
app.listen(8002, () => console.log('💬 Comment Service running on port 8002'));

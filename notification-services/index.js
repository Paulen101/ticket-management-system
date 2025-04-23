const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./dbconnect');
const Notification = require('./models/notification');
require('dotenv').config(); // Import dotenv to load environment variables

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB using the MONGODB_URI from environment variables
connectToDb('notification-service');

// Routes for notification CRUD operations
app.post('/notifications', async (req, res) => {
  try {
    const n = new Notification(req.body);
    await n.save();
    res.status(201).json(n);
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

app.get('/notifications', async (_, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.get('/notifications/:id', async (req, res) => {
  try {
    const n = await Notification.findById(req.params.id);
    if (!n) return res.status(404).send("Notification not found");
    res.json(n);
  } catch (err) {
    console.error('Error fetching notification:', err);
    res.status(500).json({ error: 'Failed to fetch notification' });
  }
});

app.put('/notifications/:id', async (req, res) => {
  try {
    const n = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(n);
  } catch (err) {
    console.error('Error updating notification:', err);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

app.delete('/notifications/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

// Start server
app.listen(8003, () => console.log('📢 Notification Service running on port 8003'));

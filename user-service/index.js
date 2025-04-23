const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./dbconnect');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB using the MONGODB_URI from environment variables
connectToDb('user-service');

// Routes for user CRUD operations
app.post('/users', async (req, res) => {
  try {
    const u = new User(req.body);
    await u.save();
    res.status(201).json(u);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/users', async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const u = await User.findById(req.params.id);
    if (!u) return res.status(404).send("User not found");
    res.json(u);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const u = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(u);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start server
app.listen(8001, () => console.log('👤 User Service running on port 8001'));

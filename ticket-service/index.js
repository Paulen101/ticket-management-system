const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./dbconnect');
const Ticket = require('./models/ticket');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB using the MONGODB_URI from environment variables
connectToDb('ticket-service');

// Routes for ticket CRUD operations
app.post('/tickets', async (req, res) => {
  try {
    const t = new Ticket(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

app.get('/tickets', async (_, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

app.get('/tickets/:id', async (req, res) => {
  try {
    const t = await Ticket.findById(req.params.id);
    if (!t) return res.status(404).send("Ticket not found");
    res.json(t);
  } catch (err) {
    console.error('Error fetching ticket:', err);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

app.put('/tickets/:id', async (req, res) => {
  try {
    const t = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(t);
  } catch (err) {
    console.error('Error updating ticket:', err);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

app.delete('/tickets/:id', async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.send({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting ticket:', err);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

// Start server
app.listen(8000, () => console.log('🎟 Ticket Service running on port 8000'));
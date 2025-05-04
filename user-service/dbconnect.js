const mongoose = require('mongoose');
const MONGODB_URI='urmongodb'

const connectToDb = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined.');
    }
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

module.exports = connectToDb;

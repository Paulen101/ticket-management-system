const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing

// Define the user schema
const userSchema = new Schema({
  name:  { 
    type: String, required: true 
  },
  email: { 
    type: String, required: true, unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();  
});
module.exports = model('User', userSchema);

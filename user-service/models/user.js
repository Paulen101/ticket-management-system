const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing

// Define the user schema
const userSchema = new Schema({
  name:  { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    // Hash the password with bcrypt, 10 salt rounds
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();  
});

// Export the User model
module.exports = model('User', userSchema);

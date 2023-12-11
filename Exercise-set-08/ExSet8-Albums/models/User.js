const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'A username must be provided'] },
  name: {
    type: String,
    maxlength: [40, 'Name cannot be longer than 40 characters']
  },
  passwordHash: String,
  email: {type: String, required: [true, "An email must be provided"]}
})

const User = mongoose.model('User', userSchema);

module.exports = User
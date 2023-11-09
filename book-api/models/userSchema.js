const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // By default, users are not admins
  },
});

const User = mongoose.model("User", userSchema);

const UserIdCounterSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const UserIdCounter = mongoose.model("UserIdCounter", UserIdCounterSchema);

module.exports = { User, UserIdCounter };

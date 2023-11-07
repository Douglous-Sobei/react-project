const mongoose = require("mongoose");

// Define the schema for books
const bookSchema = new mongoose.Schema({
  id: Number, // Unique ID for each book
  title: String, // Title of the book
});

// Create a model based on the schema
const Book = mongoose.model("Book", bookSchema);

// Define the schema for IdCounter
const IdCounterSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

// Create a model based on the schema for IdCounter
const IdCounter = mongoose.model("IdCounter", IdCounterSchema);

// Define the schema for users
const userSchema = new mongoose.Schema({
  id: Number, // Unique ID for each user
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema for users
const User = mongoose.model("User", userSchema);

module.exports = { Book, IdCounter, User };

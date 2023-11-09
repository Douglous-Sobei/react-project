const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
});

const Book = mongoose.model("Book", bookSchema);

const IdCounterSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const IdCounter = mongoose.model("IdCounter", IdCounterSchema);

module.exports = { Book, IdCounter };
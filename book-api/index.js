const express = require("express");

const app = express();

app.use(express.json());

const books = [
  { title: "Python Programming", id: 1 },
  { title: "C++ Programming", id: 2 },
  { title: "Javascript Programming", id: 3 },
];

app.get("/", (req, res) => {
  res.send("Welcome to study automation to learn REST API with Node JS");
});

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((v) => v.id === parseInt(req.params.id));
  if (!book) res.status(404).send("Books not found.");
  res.send(book);
});

app.post("/api/books/addBook", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
  };
  books.push(book);
  res.send(book);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find((v) => v.id === parseInt(req.params.id));
  if (!book) res.status(404).send("Books not found.");

  book.title = req.body.title;
  res.send(book);
});

app.delete("/api/books/:id", (req, res) => {
  const book = books.find((v) => v.id === parseInt(req.params.id));
  if (!book) res.status(404).send("Books not found.");
  const index = books.indexOf(book);
  books.splice(index, 1);

  res.send(book);
});

app.listen(8080);

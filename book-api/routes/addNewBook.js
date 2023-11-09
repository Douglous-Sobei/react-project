const express = require("express");
const { Book, IdCounter } = require("../models/bookSchema");

const router = express.Router();

/**
 * @swagger
 * /api/books/addBook:
 *   post:
 *     summary: Add a new book to MongoDB
 *     description: This API is used to insert a new book into the MongoDB database.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *     responses:
 *       "201":
 *         description: Book added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

router.post("/api/books/addBook", async (req, res, next) => {
  try {
    const { title } = req.body;

    // Find the highest book ID to generate the next ID
    const highestBook = await Book.findOne().sort({ id: -1 });
    let nextId = 1;

    if (highestBook) {
      nextId = highestBook.id + 1;
    }

    // Create a new book
    const newBook = new Book({ id: nextId, title });
    const savedBook = await newBook.save();

    // Update the book ID counter
    await IdCounter.findOneAndUpdate(
      { name: "bookId" },
      { value: nextId },
      { new: true, upsert: true }
    );

    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

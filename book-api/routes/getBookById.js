const express = require("express");
const { Book } = require("../models");

const router = express.Router();

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID from MongoDB
 *     description: This API is used to fetch one record of data from MongoDB based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID required
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Book data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#components/schema/Book'
 *       "404":
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/api/books/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ id: parseInt(id) });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

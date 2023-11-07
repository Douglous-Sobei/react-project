const express = require("express");
const { Book } = require("../models");

const router = express.Router();

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book in MongoDB
 *     description: This API is used to update an existing book in the MongoDB database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID required
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/Book'
 *     responses:
 *       "200":
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/Book'
 *       "404":
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put("/api/books/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // Find and update the book
    const updatedBook = await Book.findOneAndUpdate(
      { id: parseInt(id) }, // Use the 'id' field instead of '_id'
      { title },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

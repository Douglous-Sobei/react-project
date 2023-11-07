const express = require("express");
const { Book, IdCounter } = require("../models");

const router = express.Router();

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: This api is used to delete record from mongodb database
 *     description: This api is used to delete data in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book
 *     responses:
 *       "200":
 *         description: Book deleted successfully
 *       "404":
 *         description: Book not found
 */
router.delete("/api/books/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findOneAndDelete({ id: parseInt(id) });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Book.updateMany(
      { id: { $gt: deletedBook.id } },
      { $inc: { id: -1 } }
    );

    await IdCounter.findOneAndUpdate(
      { name: "bookId" },
      { $inc: { value: -1 } },
      { new: true, upsert: true }
    );

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

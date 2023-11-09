const express = require("express");
const { Book } = require("../models/bookSchema");

const router = express.Router();
/**
 * @swagger
 *  components:
 *    schema:
 *      Book:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          id:
 *            type: integer
 *          title:
 *            type: string
 *          
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: To get all books from mongodb
 *     description: This api is used to fetch data from mogodb
 *     responses:
 *       "200":
 *         description: This api is used to fetch data from mogodb
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schema/Book'
 */
router.get("/api/books", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

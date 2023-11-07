const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: This api is used to check if api method is working or not
 *     description: This api is used to check if api method is working or not
 *     responses:
 *       "200":
 *         description: To test Get method
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get("/", (req, res) => {
  res.send("Welcome to the MongoDB API");
});

module.exports = router;

const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in user
 *     description: This API is used to authenticate a user.
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *            example:
 *              username: string
 *              password: string
 *     responses:
 *       "200":
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The success message.
 *                 user:
 *                   $ref: '#components/schema/User'
 *       "401":
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */

router.post("/api/users/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });

    if (user) {
      // Compare the provided password with the stored hash
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const sanitizedUser = user.toObject();
        delete sanitizedUser.password;

        res.status(200).json({
          message: "User logged in successfully",
          user: sanitizedUser,
        });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 */

const express = require("express");
const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");

const router = express.Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     description: This API is used to log in a user.
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginRequest'
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
 *                   $ref: '#/components/schemas/User'
 *       "401":
 *         description: Unauthorized, invalid email or password
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
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // If passwords match, send a success message and the user data (excluding password)
      const sanitizedUser = { ...user.toObject(), password: undefined };
      return res
        .status(200)
        .json({ message: "User logged in successfully", user: sanitizedUser });
    } else {
      // If passwords don't match, return an error
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * components:
 *   schema:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         confirmPassword:
 *           type: string
 *           description: Confirm the password of the user.
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: This API is used to register a new user.
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/User'
 *     responses:
 *       "201":
 *         description: User registered successfully
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
 *       "400":
 *         description: Bad request, missing required fields or passwords do not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       "409":
 *         description: Username already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */

router.post("/api/users/register", async (req, res, next) => {
  try {
    const { id, username, password, confirmPassword } = req.body;

    // Parse the id to ensure it's a number
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId) || !username || !password || !confirmPassword) {
      res.status(400).json({ message: "Invalid data provided" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    // Find the highest user ID to generate the next ID
    const highestUser = await User.findOne().sort({ id: -1 });
    let nextId = parsedId;

    if (highestUser && highestUser.id >= parsedId) {
      nextId = highestUser.id + 1;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      id: nextId,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const sanitizedUser = savedUser.toObject();
    delete sanitizedUser.password;

    res.status(201).json({
      message: "User registered successfully",
      user: sanitizedUser,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;

const express = require("express");
const { User, UserIdCounter } = require("../models/userSchema");
const bcrypt = require("bcrypt");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         isAdmin:
 *           type: boolean
 *           description: Indicates whether the user has admin privileges.
 *
 *     RegisterUserRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *         confirmEmail:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *
 *     RegisterUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating the registration status.
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: This API is used to register a new user in the MongoDB database.
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       "201":
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterUserResponse'
 *       "400":
 *         description: Bad request. Passwords or email addresses do not match.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/api/users/register", async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      confirmEmail,
      isAdmin = false, // Set isAdmin to false by default
    } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword || email !== confirmEmail) {
      return res
        .status(400)
        .json({ message: "Passwords or email addresses do not match" });
    }

    // Check if a user with the provided username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Check if an admin user already exists
    if (isAdmin) {
      const adminUser = await User.findOne({ isAdmin: true });
      if (adminUser) {
        return res.status(400).json({ message: "Admin user already exists" });
      }
    }

    // Find the current value of the user ID counter or create one if it doesn't exist
    let idCounter = await UserIdCounter.findOne({ name: "userCounter" });

    if (!idCounter) {
      idCounter = await new UserIdCounter({
        name: "userCounter",
        value: 1,
      }).save();
    }

    const newUserId = idCounter.value;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      id: newUserId,
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    const savedUser = await newUser.save();

    // Update the user ID counter value
    await UserIdCounter.findOneAndUpdate(
      { name: "userCounter" },
      { $inc: { value: 1 } }
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const { User } = require("../models/userSchema");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdateRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The updated username.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user in MongoDB
 *     description: This API is used to update an existing user in the MongoDB database.
 *     tags: [Users]
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
 *              $ref: '#components/schemas/UserUpdateRequest'
 *     responses:
 *       "200":
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/UserResponse'
 *       "404":
 *         description: User not found
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
router.put("/api/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { id: parseInt(id) }, // Use the 'id' field instead of '_id'
      { username },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

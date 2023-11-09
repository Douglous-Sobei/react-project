const express = require("express");
const { User } = require("../models/userSchema");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteUserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the deleted user.
 *         username:
 *           type: string
 *           description: The username of the deleted user.
 *         email:
 *           type: string
 *           description: The email address of the deleted user.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user from MongoDB
 *     description: This API is used to delete a user from the MongoDB database.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID required
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUserResponse'
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

router.delete("/api/users/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ id: parseInt(id) });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.updateMany(
      { id: { $gt: deletedUser.id } },
      { $inc: { id: -1 } }
    );

    await UserIdCounter.findOneAndUpdate(
      { name: "userCounter" },
      { $inc: { value: -1 } },
      { new: true, upsert: true }
    );

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

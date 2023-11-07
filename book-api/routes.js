const express = require("express");
const welcomeMessageRouter = require("./routes/welcomeMessage");
const getAllBooksRouter = require("./routes/getAllBooks");
const getBookByIdRouter = require("./routes/getBookById");
const addNewBookRouter = require("./routes/addNewBook");
const updateBookRouter = require("./routes/updateBook");
const deleteBookRouter = require("./routes/deleteBook");
const logUsersRouter = require("./routes/logUsers");
const registerUsersRouter = require("./routes/registerUsers");

const router = express.Router();

router.use("/", welcomeMessageRouter);
router.use("/", getAllBooksRouter);
router.use("/", getBookByIdRouter);
router.use("/", addNewBookRouter);
router.use("/", updateBookRouter);
router.use("/", deleteBookRouter);
router.use("/", registerUsersRouter);
router.use("/", logUsersRouter);

module.exports = router;

const express = require("express");

const router = express.Router();

const itemsRouter = require("./router/itemsRouter");
const categoryRouter = require("./router/categoryRouter");

router.use("/items", itemsRouter);
router.use("/category", categoryRouter);

module.exports = router;

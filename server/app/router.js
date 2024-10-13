const express = require("express");

const router = express.Router();

const itemsRouter = require("./router/itemsRouter");
const categoryRouter = require("./router/categoryRouter");
const customerRouter = require("./router/customerRouter");
const productRouter = require("./router/productRouter");

router.use("/items", itemsRouter);
router.use("/category", categoryRouter);
router.use("/customer", customerRouter);
router.use("/product", productRouter);

module.exports = router;

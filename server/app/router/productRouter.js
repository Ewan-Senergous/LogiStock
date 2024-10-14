const express = require("express");

const router = express.Router();

const productActions = require("../controllers/productActions");

router.get("/", productActions.browse);
router.get("/:id", productActions.read);
router.post("/", productActions.add);
router.put("/:id", productActions.edit);
router.delete("/:id", productActions.remove);

module.exports = router;

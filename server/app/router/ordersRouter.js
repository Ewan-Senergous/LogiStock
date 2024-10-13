const express = require("express");

const router = express.Router();

const ordersActions = require("../controllers/ordersActions");

router.get("/", ordersActions.browse);
router.get("/:id", ordersActions.read);
router.post("/", ordersActions.add);
router.put("/:id", ordersActions.edit);
router.delete("/:id", ordersActions.remove);

module.exports = router;

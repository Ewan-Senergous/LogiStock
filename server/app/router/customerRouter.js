const express = require("express");

const router = express.Router();

const customerActions = require("../controllers/customerActions");

router.get("/", customerActions.browse);
router.get("/:id", customerActions.read);
router.post("/", customerActions.add);
router.put("/:id", customerActions.edit);
router.delete("/:id", customerActions.remove);

module.exports = router;

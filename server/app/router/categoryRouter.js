const express = require("express");

const router = express.Router();

const categoryActions = require("../controllers/categoryActions");

router.get("/", categoryActions.browse);
router.get("/:id", categoryActions.read);
router.post("/", categoryActions.add);
router.put("/:id", categoryActions.edit);

module.exports = router;

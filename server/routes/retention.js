const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const { createRange, getRanges, editRange, deleteRange } = require("../controllers/retention");

router.post("/", isAuthenticated, createRange);
router.get("/", isAuthenticated, getRanges);
router.put("/:retentionId", isAuthenticated, editRange);
router.delete("/:retentionId", isAuthenticated, deleteRange);

module.exports = router;

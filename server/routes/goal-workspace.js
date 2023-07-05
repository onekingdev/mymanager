const express = require("express");
const router = express.Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  createGoalWorkspace,
  fetchGoalWorkspace,
  removeGoalWorkspace,
} = require("../controllers/goalWorkspace");

router.post("/", results, isAuthenticated, createGoalWorkspace);
router.get("/", results, isAuthenticated, fetchGoalWorkspace);
router.delete(
  "/:id",
  results,
  isAuthenticated,
  removeGoalWorkspace
);

module.exports = router;
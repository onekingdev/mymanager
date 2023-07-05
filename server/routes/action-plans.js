const express = require("express");
const router = express.Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  createActionPlans,
  acitonPlansUpdate,
  acitonPlansRemove,
} = require("../controllers/actionPlans");

router.post("/add_goal_actionPlan/:goalId", isAuthenticated, createActionPlans);
router.put("/update_actonPlan/:actionId", isAuthenticated, acitonPlansUpdate);
router.delete("/remove_actonPlan/:actionId", isAuthenticated, acitonPlansRemove);

module.exports = router;

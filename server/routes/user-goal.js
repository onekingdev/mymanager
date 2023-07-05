const express = require("express");
const router = express.Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  creategoal,
  allGoals,
  remove,
  updateGoal,
  goalsByParentId,
  getGoal,
} = require("../controllers/userGoal");
const { singleUploadControl } = require("../middleware/upload");

router.post("/add_goalcreategoal/:type", isAuthenticated, singleUploadControl, creategoal);
router.put("/update_goal_subgoal/:goalId", isAuthenticated, singleUploadControl, updateGoal);
router.get("/goals_By_parengoalId/:parentGoalId", isAuthenticated, goalsByParentId);
router.get("/all_goals/:workSpaceId", isAuthenticated, allGoals);
router.delete("/remove_goal/:goalId", isAuthenticated, remove);
router.get("/:goalId", isAuthenticated,getGoal);

module.exports = router;

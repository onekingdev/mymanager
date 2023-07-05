const router = require("express").Router();
const {
  getStages,
  createStage,
  deleteStage,
  updateStage,
  swapOrder,
} = require("../controllers/leadStages");
const isAuthenticated = require("../middleware/auth");

router.get("/", isAuthenticated, getStages);
router.post("/", isAuthenticated, createStage);
router.put("/delete/:id", isAuthenticated, deleteStage);
router.put("/update/:id", isAuthenticated, updateStage);
router.put("/reorder/:firstId/:secondId", isAuthenticated, swapOrder);

module.exports = router;

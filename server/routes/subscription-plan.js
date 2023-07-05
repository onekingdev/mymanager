const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const {
  createPlan,
  getPlan,
  //getPlanByOrg,
  updatePlanById,
  deletePlanById,
  getPlans,
  updateElementTitle,
  getDefaultPermissions,
} = require("../controllers/subscriptionPlan");

router.post("/", isAuthenticated, createPlan);
router.get("/", isAuthenticated, getPlans);
router.get("/default", isAuthenticated, getDefaultPermissions);
router.get("/:id", isAuthenticated, getPlan);
//router.get("/organization/:orgId", isAuthenticated, getPlanByOrg);
router.patch("/:id", isAuthenticated, updatePlanById);
router.delete("/:id", isAuthenticated, deletePlanById);
router.put("/element/:id", isAuthenticated, updateElementTitle);

module.exports = router;

const router = require("express").Router();

const {
  addOrUpdateLocation,
  getUserDetails,
  updateUserDetails,
  userDetailsByUserId,
  getByUserId,
  getUserList,
  assignRoleToUser,
  assignAdminRoleToUser,
  assignPlanToUser,
  getUserPersonalPlan,
  getOrgAdmin,
  deactiveUser,
} = require("../controllers/user");
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

router.get("/", isAuthenticated, getUserDetails);
router.get("/get_users", isAuthenticated, getUserList);
router.get("/:userId", isAuthenticated, getByUserId); // this api for admin only.
router.get("/details", isAuthenticated, userDetailsByUserId);
router.put("/location", isAuthenticated, addOrUpdateLocation);
router.put("/profile/:userId", isAuthenticated, updateUserDetails);
router.get("/get-admin/:id", isAuthenticated, getOrgAdmin);
router.put("/deactive", isAuthenticated, deactiveUser);

router.put(
  "/assign/role/admin",
  [isAuthenticated, checkRolePrivileges(["super-admin"])],
  assignAdminRoleToUser
);

router.put(
  "/assign/role",
  [isAuthenticated, checkRolePrivileges(["super-admin", "admin"])],
  assignRoleToUser
);

router.put(
  "/assign/plan",
  [isAuthenticated, checkRolePrivileges(["super-admin"])],
  assignPlanToUser
);

router.get("/assign/plan", isAuthenticated, getUserPersonalPlan);

module.exports = router;

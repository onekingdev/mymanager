const router = require("express").Router();
const {
  createPermission,
  getPermissionByOrganization,
  updatePermission,
  updatePermissionByOrg,
} = require("../controllers/permission");

const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, createPermission);
router.get("/", isAuthenticated, getPermissionByOrganization);
router.patch("/:id", isAuthenticated, updatePermission);
router.put("/", isAuthenticated, updatePermissionByOrg);

module.exports = router;

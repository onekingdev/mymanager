const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

const {
  createPermission,
  getAllPermissions,
  getPermissionById,
  deleteById,
  updateById,
} = require("../controllers/applicationPermission.js");

router.post("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], createPermission);
router.get("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], getAllPermissions);
router.get("/:id", [isAuthenticated, checkRolePrivileges(["super-admin"])], getPermissionById);
router.delete("/:id", [isAuthenticated, checkRolePrivileges(["super-admin"])], deleteById);
router.put("/:id", [isAuthenticated, checkRolePrivileges(["super-admin"])], updateById);

module.exports = router;

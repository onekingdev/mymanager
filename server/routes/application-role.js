const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

const {
  createRole,
  getAllRoles,
  getRoleById,
  deleteById,
  updateById,
} = require("../controllers/applicationRole");

router.post("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], createRole);
router.get("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], getAllRoles);
router.get("/:id", [isAuthenticated, checkRolePrivileges(["super-admin"])], getRoleById);
router.delete("/:id", [isAuthenticated, checkRolePrivileges(["super-admin"])], deleteById);
router.put("/:id", [isAuthenticated, checkRolePrivileges(["super-admin"])], updateById);

module.exports = router;

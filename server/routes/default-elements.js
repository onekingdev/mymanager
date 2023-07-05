const router = require("express").Router();
const { insertAllDefault, getDefaultElements, insertDefault, updateDefault } = require("../controllers/defaultElements");
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

router.post("/insertAll", [isAuthenticated, checkRolePrivileges(["super-admin"])], insertAllDefault);
router.get("/", isAuthenticated, getDefaultElements);
router.put("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], updateDefault);
router.post("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], insertDefault);

module.exports = router;
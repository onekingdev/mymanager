const router = require("express").Router();
const {
  createOrganization,
  editOrganization,
  addOrganizationLocation,
  deleteOrganizationLocation,
  updateOrganizationLocation,
  getOrganizations,
  getOrganizationById,
  getOrganizationByPath,
  checkOrganizationAvailability,
  sendOrgDetailsEmail,
  sendBulkInvitation
} = require("../controllers/organization");
const isAuthenticated = require("../middleware/auth");
const { checkRolePrivileges } = require("../middleware/auth/roleCheck");

router.post("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], createOrganization);
router.put("/:id", [isAuthenticated, checkRolePrivileges(["super-admin"])], editOrganization);
router.post("/:id/location", isAuthenticated, addOrganizationLocation);
router.delete("/:id/location/:locationId", isAuthenticated, deleteOrganizationLocation);
router.patch("/:id/location/:locationId", isAuthenticated, updateOrganizationLocation);
router.get("/", [isAuthenticated, checkRolePrivileges(["super-admin"])], getOrganizations);
router.get("/:id", [isAuthenticated], getOrganizationById);
router.get("/path/:path", getOrganizationByPath);
router.post("/send-email", sendOrgDetailsEmail);
router.post("/send-bulk", sendBulkInvitation);

router.get(
  "/check/availability",
  [isAuthenticated, checkRolePrivileges(["super-admin"])],
  checkOrganizationAvailability
);

module.exports = router;

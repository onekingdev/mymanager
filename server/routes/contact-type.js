const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  addContactType,
  getContactTypes,
  updateContactTypeById,
  delContactType,
  getContactTypeByOrgId,
  getRolesByIdArr,
} = require("../controllers/contactType");

router.post("/", isAuthenticated, addContactType);
router.get("/getByUserId", isAuthenticated, getContactTypes);
router.post("/getRolesByIdArr", isAuthenticated, getRolesByIdArr);
router.get("/getByOrg/:id", isAuthenticated, getContactTypeByOrgId);
router.put("/:id", isAuthenticated, updateContactTypeById);
router.put("/delete/:id", isAuthenticated, delContactType);

module.exports = router;

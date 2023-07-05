const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  addContactField,
  getContactField,
  getAllContactField,
  deleteContactField,
  updateContactField,
  updateContactFieldOrder,
} = require("../controllers/contactField");

router.post("/", isAuthenticated, addContactField);
router.post("/order", isAuthenticated, updateContactFieldOrder);
router.get("/:contactType", isAuthenticated, getContactField);
router.get("/", isAuthenticated, getAllContactField);
router.delete("/:contactType/:fieldId", isAuthenticated, deleteContactField);
router.put("/:contactType", isAuthenticated, updateContactField);

module.exports = router;

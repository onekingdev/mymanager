const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createForm,
  getForms,
  deleteForm,
  editForm,
  getForm,
  addLeads,
  addFormEntry,
  updateFormEntry,
  getFormEntryByFormId,
  deleteFormEntry,
  getTemplates,
  getFormEntryById,
  searchDomain,
} = require("../controllers/formBuilder");

router.get("/forms/", isAuthenticated, getForms);
router.get("/templates", isAuthenticated, getTemplates);
router.post("/create", isAuthenticated, createForm);
router.get("/preview/:id", getForm);
router.delete("/delete/:id", isAuthenticated, deleteForm);
router.put("/edit/:id", isAuthenticated, editForm);
router.post("/addleads/:id", addLeads);

router.post("/details/:id", addFormEntry);
router.put("/details/:id", updateFormEntry);
router.get("/details/:id", isAuthenticated, getFormEntryByFormId);
router.get("/contact-details/:id", isAuthenticated, getFormEntryById);
router.delete("/details/:id", isAuthenticated, deleteFormEntry);

router.get("/search/domain/:domain",isAuthenticated,searchDomain);


module.exports = router;

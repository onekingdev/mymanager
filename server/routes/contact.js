const router = require("express").Router();
const {
  newContact,
  saveContactFromEvent,
  addAndUpdateContactBulk,
  getAllContacts,
  updateContact,
  updateFieldsContact,
  deleteContact,
  filesUpload,
  deleteUploadedFile,
  importContactsFromArray,
  importContacts,
  addNewFamilyMember,
  getContactById,
} = require("../controllers/contact");
const {
  newContactValidator,
  updateContactValidator,
  getContactValidator,
  deleteContactValidator,
} = require("../validators/contact");
const isAuthenticated = require("../middleware/auth");
const results = require("../validators");
const { upload } = require("../lib/upload");

/**
 * Contact Management
 */
router.post("/add", isAuthenticated, newContactValidator, results, newContact);
router.post("/save-contact", saveContactFromEvent);
router.post("/add-update-bulk", isAuthenticated, addAndUpdateContactBulk);
router.post("/update/:id", isAuthenticated, updateContactValidator, results, updateContact);
router.get("/get", isAuthenticated, results, getAllContacts);
router.get("/getById/:id", getContactById);
router.delete("/delete", isAuthenticated, results, deleteContact);

/**
 * Upload File Management
 */
router.post("/upload-file", isAuthenticated, upload.single("file"), filesUpload);
router.post("/delete-file", isAuthenticated, deleteUploadedFile);

/**
 * Import Contact Files Management
 */
router.post("/import-contact-array", isAuthenticated, importContactsFromArray);
router.post("/import-contacts", isAuthenticated, importContacts);

/**
 * Contact New Fields
 */
router.post("/update-field-value/:id", isAuthenticated, updateFieldsContact);
//router.post("/add-family",isAuthenticated,addNewFamilyMember);

module.exports = router;

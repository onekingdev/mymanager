const router = require("express").Router();

const {
  contactList,
  contactAdd,
  contactById,
  updateContact,
  updateContactRegister,
  uploadAvatar,
  updateSocialLink,
  rankAddOrUpdate,
  deleteRank,
  fileAddAndUpdate,
  deleteFile,
  updateBillingAddress,
  totalMember,
  activeMember,
  internshipMember,
  formerMember,
  deleteContact,
  importContactsFromArray,
  getMemberPositions,
  getAllMembers,
  getForAddEvent,
  getContactsByTags,
  checkMember,
} = require("../controllers/memberContact");
const isAuthenticated = require("../middleware/auth");

// UPload Handler
const { upload } = require("../lib/upload");

router.get("/list", isAuthenticated, contactList);
router.post("/", isAuthenticated, contactAdd);
router.get("/contact/:id", isAuthenticated, contactById);
router.patch("/:id", isAuthenticated, updateContact);

router.post("/contact-update", isAuthenticated, updateContact);
router.post("/contact-register-update", isAuthenticated, updateContactRegister);
router.post("/update-social-links", isAuthenticated, updateSocialLink);

//Get members for add event
router.get("/get-for-addevent", isAuthenticated, getForAddEvent);

// Update Billing address
router.post("/billing-address-update", isAuthenticated, updateBillingAddress);

// ** delete Rank
router.post("/delte-rank", isAuthenticated, deleteRank);
// ** file Delete Action

router.post("/file-delete", isAuthenticated, deleteFile);

router.post("/upload-avatar", isAuthenticated, upload.single("file"), uploadAvatar);

// Rank Add Or Update
router.post("/rank-add-or-update", isAuthenticated, upload.single("file"), rankAddOrUpdate);

// Files Add
router.post("/file-add", isAuthenticated, upload.single("file"), fileAddAndUpdate);

// total counts
router.get("/total-members", isAuthenticated, totalMember);
router.get("/total-members-count", isAuthenticated, totalMember);
router.get("/active-members", isAuthenticated, activeMember);
router.get("/past-due-members", isAuthenticated, internshipMember);
router.get("/former-members", isAuthenticated, formerMember);

router.post("/delete", isAuthenticated, deleteContact);

router.post("/import-contact-array", isAuthenticated, importContactsFromArray);

// get all member positions
router.get("/position", isAuthenticated, getMemberPositions);

// get all members
router.get("/allmembers", isAuthenticated, getAllMembers);

router.get("/contact/bytag", isAuthenticated, getContactsByTags);

// Check member
router.post("/attendance", isAuthenticated, checkMember);

module.exports = router;

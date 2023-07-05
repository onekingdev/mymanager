const router = require("express").Router();

const {
  contactAdd,
  contactById,
  sendRegisterEmail,
  updateContactRegister,
  uploadAvatar,
  updateSocialLink,
  rankAddOrUpdate,
  deleteRank,
  fileAddAndUpdate,
  deleteFile,
  updateBillingAddress,
  totalEmployee,
  activeEmployee,
  internshipEmployee,
  formerEmployee,
  deleteContact,
  importContactsFromArray,
  employeePosition,
  getEmployeePositions,
  getAllEmployees,
  deleteEmployeePosition,
  putEmployeePosition,
  getForAddEvent,
  // WorkHistory
  startWork,
  endWork,
  updateWork,
  getWorkHistoryTimeLine,
  getOverview,
  getScreenshots,
  getAllWorkHistory,
  getScreenshotsByUserId,
  getScreenDetailImg,
  getContactsByTags,
  saveContactToMap,
} = require("../controllers/contact");

const { updateContactShift, contactList } = require("../controllers/contact-employee");
const isAuthenticated = require("../middleware/auth");

// UPload Handler
const { upload } = require("../lib/upload");

router.get("/list", isAuthenticated, contactList);
router.post("/add", isAuthenticated, contactAdd);
router.get("/contact/:id", isAuthenticated, contactById);
router.post("/contact-update", isAuthenticated, updateContactShift);
router.post("/contact-register-update", isAuthenticated, updateContactRegister);
router.post("/contact-register-send", isAuthenticated, sendRegisterEmail);
router.post("/update-social-links", isAuthenticated, updateSocialLink);
router.post("/save-employee-to-map", isAuthenticated, saveContactToMap);
//Get employees for add event
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

router.get("/total-employee", isAuthenticated, totalEmployee);
router.get("/active-employee", isAuthenticated, activeEmployee);
router.get("/internship-employee", isAuthenticated, internshipEmployee);
router.get("/former-employee", isAuthenticated, formerEmployee);

router.post("/delete", isAuthenticated, deleteContact);

router.post("/import-contact-array", isAuthenticated, importContactsFromArray);

// Create New Employee Position
router.post("/position", isAuthenticated, employeePosition);

// get all employee positions
router.get("/position", isAuthenticated, getEmployeePositions);

// get all employees
router.get("/allemployees", isAuthenticated, getAllEmployees);

// delete position
router.delete("/position/:id", isAuthenticated, deleteEmployeePosition);

// update position
router.put("/position/:id", isAuthenticated, putEmployeePosition);

// WorkHistory/getAllWorkhistory
router.get("/workhistory/getallworkhisotry", isAuthenticated, getAllWorkHistory);

// WorkHistory/startWork
router.post("/workhistory/startwork", isAuthenticated, startWork);

// WorkHistory/endwork
router.post("/workhistory/endwork", isAuthenticated, endWork);

// WorkHistory/updatework
router.post("/workhistory/updatework", isAuthenticated, updateWork);

// WorkHistory/getWorkHistoryTimeLine
router.get("/workhistory/:employeeId", isAuthenticated, getWorkHistoryTimeLine);

// WorkHistory/getOverview
router.get("/workhistory/overview/:employeeId", isAuthenticated, getOverview);

// WorkHistory/getScreenshots
router.get("/workhistory/screenshot/:historyId", isAuthenticated, getScreenshots);

// WorkHistory/getScreenshots/ByuserId
router.post("/workhistory/screenshots_userId", isAuthenticated, getScreenshotsByUserId);

//workHistorydetailImage
router.post("/workhistory/get_detail_image", isAuthenticated, getScreenDetailImg);
router.get("/contact/bytag", isAuthenticated, getContactsByTags);
module.exports = router;

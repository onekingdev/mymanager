const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl, singleUploadToServerControl } = require("../middleware/upload");

const {
  createAutomation,
  uploadFile,
  getAutomations,
  changeStatus,
  setVideoWatch,
  deleteAutomation,
//   updateAutomation
} = require("../controllers/automation");



router.post("/", isAuthenticated, createAutomation);
router.post("/fileupload/", isAuthenticated, singleUploadControl, uploadFile);
router.get('/', isAuthenticated, getAutomations);
router.post('/changeStatus/', isAuthenticated, changeStatus);
router.post('/delete', isAuthenticated, deleteAutomation);
// router.post('/updateAutomation', isAuthenticated, updateAutomation);
router.post('/setVideoWatch', setVideoWatch);

module.exports = router;



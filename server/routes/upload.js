
const router = require("express").Router();
const { uploadImage } = require("../controllers/uploadFile");
const isAuthenticated = require("../middleware/auth");
const { singleUploadControl } = require("../middleware/upload");

router.post("/",isAuthenticated,singleUploadControl,uploadImage)

module.exports = router;

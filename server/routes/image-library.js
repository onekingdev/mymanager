const router = require("express").Router();

const { addImageLibrary, getUserImages } = require("../controllers/imageLibrary");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, addImageLibrary);
router.get("/",isAuthenticated,getUserImages);

module.exports = router;
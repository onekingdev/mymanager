const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  CreateVideo,
  GetVideos
} = require("../controllers/video");

router.post("/create",isAuthenticated, CreateVideo);
router.get("/all/:userId", isAuthenticated, GetVideos);

module.exports = router;
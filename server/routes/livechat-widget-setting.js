const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/auth");

const {
  save_livechat_widget_setting,
  set_livechat_widget_setting,
  get_livechat_widget_setting,
  send_livechat_code,
} = require("../controllers/livechat_widget_setting");

router.post("/", isAuthenticated, save_livechat_widget_setting);
router.post("/send-code", isAuthenticated, send_livechat_code);
router.post("/update", set_livechat_widget_setting);
router.get("/:userId", get_livechat_widget_setting);

module.exports = router;

const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  createNotification,
  readNotification,
  allNotifications,
  unreadNotifications,
} = require("../controllers/notification");

router.post("/new/:category/:categoryId",isAuthenticated, createNotification);
router.put("/read",isAuthenticated, readNotification);
router.get("/all", isAuthenticated, allNotifications);
router.get("/unread", isAuthenticated, unreadNotifications);

module.exports = router;

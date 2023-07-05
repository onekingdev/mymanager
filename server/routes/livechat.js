const express = require("express");

const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const {
  getChatHistory,
  getChannelsByAdminId,
  addNewMessage,
  getChatsAndContacts,
  getChannelById,
  deleteChannelById,
} = require("../controllers/livechat");

router.get("/chathistory/:adminId/:machineId", getChatHistory);
router.get("/channels/:adminId", getChannelsByAdminId);
router.get("/channel/:channelId", isAuthenticated, getChannelById);
router.delete("/channel/:channelId/:contactId", isAuthenticated, deleteChannelById);

router.post("/newmessgage/", addNewMessage);
router.get("/chats-and-contacts/:adminId", isAuthenticated, getChatsAndContacts);

module.exports = router;

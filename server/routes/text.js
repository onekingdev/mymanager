const router = require("express").Router();

const { isAuthenticated } = require("../controllers/auth");

const {
  addTextContact,
  sendTextMessage,
  seenContactTextMessages,
  getTextContact,
  getTextMessages,
  searchTextContact,
  listenIncomingSMS,
  getToastMessage,
} = require("../controllers/text");

router.post("/addcontact/:userId", addTextContact);
router.get("/getContact/", getTextContact);
router.post("/send-message/:userId", sendTextMessage);
router.get("/get-messages/:userId/:uid", getTextMessages);
router.get("/get-toast-message/:userId/:uid", getToastMessage);
router.get("/searchContact/:userId", searchTextContact);

router.post("/listen-message/:twilio", listenIncomingSMS);

module.exports = router;

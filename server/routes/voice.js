const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const {
  GetVoiceToken,
  PostVoiceToken,
  Twiml,
  VoiceRecording,
  ShowCallHistory,
  Voice,
  VoiceIncomming,
  VoiceOutgoing,
  SendSMS,
} = require("../controllers/voice");

router.get("/voice/token", isAuthenticated, GetVoiceToken);

router.post("/voice/token", PostVoiceToken);

router.post("/twiml", Twiml);

router.post("/voice_recording", VoiceRecording);

router.get("/showCallHistory/:user_id", ShowCallHistory);

router.post("/voice", Voice);

router.post("/voice/incoming", VoiceIncomming);

router.post("/voice/outgoing", isAuthenticated, VoiceOutgoing);

//router.post("/transcript", VoiceRecording);

//router.post("/sms", SendSMS);

module.exports = router;

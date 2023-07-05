const router = require("express").Router();

const { sendOTP, sendContactOTP } = require("../controllers/temp");
const { sendOTPValidator } = require("../validators/temp");
const results = require("../validators");

router.post("/send-otp", sendOTPValidator, results, sendOTP);
router.post("/send-contact-otp", results, sendContactOTP);

module.exports = router;

const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const { getOnboardingStatus } = require("../controllers/onboarding");

router.get("/status", isAuthenticated, getOnboardingStatus);

module.exports = router;

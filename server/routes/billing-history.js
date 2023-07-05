const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const { getBillingHistory } = require("../controllers/billingHistory");

router.get("/", isAuthenticated, getBillingHistory);

module.exports = router;

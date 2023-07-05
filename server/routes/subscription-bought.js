const router = require("express").Router();
const { addSubscriptionForOrgs, updateSubscriptionForOrgs, getByOrganization } = require("../controllers/subscriptionBought");
const isAuthenticated = require("../middleware/auth");


router.post("/organization", isAuthenticated, addSubscriptionForOrgs);
router.put("/organization/:id", isAuthenticated, updateSubscriptionForOrgs);
router.get("/organization/:id", isAuthenticated, getByOrganization);
module.exports = router;
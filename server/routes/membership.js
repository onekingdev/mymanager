const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const membershipController = require("../controllers/membership");

// membership routes
router.get("/", membershipController.membershipList);
router.get("/details", membershipController.membershipInfo);
router.post("/", isAuthenticated, membershipController.create);
router.put("/:id", isAuthenticated, membershipController.updateMembership);


module.exports = router;

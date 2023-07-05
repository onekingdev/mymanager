const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const checkoutController = require("../controllers/checkout");

// router.post("/membership", results, isAuthenticated, checkoutController.checkoutMembership);

router.post("/update-membership", results, isAuthenticated, checkoutController.updateMembership);

router.post("/buy-membership", results, isAuthenticated, checkoutController.buyMembership);

router.post("/public-membership", results, checkoutController.checkoutPublicMembership);

router.post("/product", results, isAuthenticated, checkoutController.checkoutProduct);

router.post("/buy-product", results, isAuthenticated, checkoutController.buyProduct);

router.post("/public-product", results, checkoutController.checkoutPublicProduct);
module.exports = router;

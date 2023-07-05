const router = require("express").Router();
const {
  createStripeCustomer,
  
  createStripeSubscription,
  createStripeCard,
  createStripeCharge,
  createStripePaymentIntent,
  getStripePaymentIntent,
  updateStripePaymentIntent,
  sendPK,
  createStripeAccount,
  getStripeAcount,
} = require("../controllers/payment");
const isAuthenticated = require("../middleware/auth");

router.post("/stripe/customer", createStripeCustomer);

router.get("/user/:userId/stripe/payment-intent/:id", isAuthenticated, getStripePaymentIntent);
router.put("/user/:userId/stripe/payment-intent/:id", isAuthenticated, updateStripePaymentIntent);

// alternatives to payment-intent API
router.post("/user/:userId/stripe/card", isAuthenticated, createStripeCard);
router.post("/user/:userId/stripe/charge", isAuthenticated, createStripeCharge);

router.get("/stripe/config", sendPK);
router.post("/stripe/payment-intent", createStripePaymentIntent);
router.post("/stripe/subscription", createStripeSubscription);

//stripe connect
router.post("/stripe/create-account",isAuthenticated,createStripeAccount);
router.get("/stripe/get-account",isAuthenticated,getStripeAcount);


module.exports = router;

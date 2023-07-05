const router = require("express").Router();

const {
  stripePayment,
  stripePaymentSubscriptions,
  depositAmount,
  availabeNumber,
  balanceInfo,
  withdrawSMSAmount,
  withdrawMinsAmount,
  withdrawAmountForBuyingNumber,
  purchased_Num,
  getPhoneNums
} = require("../controllers/deposit");

router.post("/stripePayment", stripePayment);
router.post("/stripePaymentSubscriptions", stripePaymentSubscriptions);
router.post("/depositAmount", depositAmount);

router.post("/availablePhoneNumbers", availabeNumber);
router.get("/balance/:user_id", balanceInfo);

router.post("/withdrawSMSAmount", withdrawSMSAmount);
router.post("/withdrawMinsAmount", withdrawMinsAmount);

router.post("/withdrawAmountForBuyingNumber", withdrawAmountForBuyingNumber);
router.put("/purchase_num/:userid", purchased_Num);
router.post("/getPhoneNums", getPhoneNums)
module.exports = router;

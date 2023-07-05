const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");

const {
  newQRCode,
  getAllQRCode,
  getQRCode,
  deleteQRCode,
} = require("../controllers/qrcodeLibrary");

router.get("/get-all/:userid", isAuthenticated, results, getAllQRCode);
router.get("/get/:qrcodeuuid", results, getQRCode);

router.post("/add", isAuthenticated, results, newQRCode);
router.delete("/delete/", isAuthenticated, results, deleteQRCode);

module.exports = router;

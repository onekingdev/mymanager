const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const shop = require("../controllers/shop");

router.post("/", isAuthenticated, shop.createShop);
router.get("/", isAuthenticated, shop.shopByUser);
router.get("/get/:path", shop.shopByPath);
router.put("/:id", isAuthenticated, shop.update);
router.get("/check-shop-path/:path",isAuthenticated, shop.checkShopPath);
router.put("/faq/:id", isAuthenticated, shop.updateFaq);
router.put("/faq/delete/:id", isAuthenticated, shop.deleteFaq);


module.exports = router;

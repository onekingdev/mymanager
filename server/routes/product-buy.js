const { createBuyProduct, getShopSales, updateBuyProduct } = require("../controllers/productBuy");
const isAuthenticated = require("../middleware/auth");

const router = require("express").Router();

router.post('/',createBuyProduct);
router.get('/:shopId',isAuthenticated,getShopSales);
router.put('/:id',isAuthenticated,updateBuyProduct)

module.exports = router;
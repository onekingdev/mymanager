const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const productController = require("../controllers/product");


router.post('/:shopId',isAuthenticated,productController.create)
router.get('/details',productController.productInfo)
router.get('/',productController.productList)
router.put('/:id',isAuthenticated, productController.updateProduct)



module.exports = router;

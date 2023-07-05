const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const productBrandController = require("../controllers/productBrand");


router.get("/:shopId",productBrandController.getBrands)
router.post("/",isAuthenticated,productBrandController.create)
router.put("/delete/:id",isAuthenticated,productBrandController.delete)
router.put("/update/:id",isAuthenticated,productBrandController.update)
module.exports = router;